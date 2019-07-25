import numpy as np
import pandas as pd
from sklearn import mixture as mix
import seaborn as sns
import matplotlib.pyplot as plt
import talib as ta
from sklearn.preprocessing import StandardScaler
from sklearn.svm import SVC
from crawler import util
import os

pd.set_option('display.expand_frame_repr', False)
df = pd.read_csv("Litecoin_5min_output.csv")
df['Time'] = pd.to_datetime(df["Time"])
df.set_index('Time', inplace=True)
target = df['Open']
#df = df.drop(['Subjectivity'],1)
#df = df.drop(['Polarity'],1)
#df = df.drop(['VolumeCoin'],1)
df = df.drop(['VolumeUSD'],1)
#df = df.drop(['S&P500 Close'],1)
#df = df.drop(['S&P500 Volume'],1)
df = df.drop(['USDEuro'],1)
print(df)


n = 10
t = 0.8
split = int(t * len(df))

df['high'] = df['High'].shift(1)
df['low'] = df['Low'].shift(1)
df['close'] = df['Close'].shift(1)
df['RSI'] = ta.RSI(np.array(df['close']), timeperiod=n)
# relative strength index
df['SMA'] = df['close'].rolling(window=n).mean()
# simple moving average
df['Corr'] = df['SMA'].rolling(window=n).corr(df['close'])
df['SAR'] = ta.SAR(np.array(df['high']), np.array(df['low']), \
                   0.2, 0.2)
#parabolic stop and reverse
df['ADX'] = ta.ADX(np.array(df['high']), np.array(df['low']), \
                   np.array(df['close']), timeperiod=n)
#average directional movement index
df['Corr'][df.Corr > 1] = 1
df['Corr'][df.Corr < -1] = -1
df['Return'] = np.log(df['Open'] / df['Open'].shift(1))
df = df.dropna()
ss = StandardScaler()
the_size = len(df[df.index.duplicated()])
df = df[~df.index.duplicated()]
#get rid of duplicated scales from datasets
unsup = mix.GaussianMixture(n_components=4,
                            covariance_type="spherical",
                            n_init=100,
                            random_state=42)
df = df.drop(['High', 'Low', 'Close'], axis=1)
unsup.fit(np.reshape(ss.fit_transform(df[:split]), (-1, df.shape[1])))
regime = unsup.predict(np.reshape(ss.fit_transform(df[split:]), \
                                  (-1, df.shape[1])))


Regime_split = pd.DataFrame(regime, columns=['Regime'], index=df[split:].index) \
    .join(df[split:], how='inner') \
    .assign(market_cu_return=df[split:] \
            .Return.cumsum()) \
    .reset_index(drop=False) \
    .rename(columns={'index': 'Date'})

order = [0, 1, 2, 3]
fig = sns.FacetGrid(data=Regime_split, hue='Regime', hue_order=order, aspect=10, size=4)
fig.map(plt.scatter, 'Time', 'market_cu_return', s=3).add_legend()
plt.show()

#for i in order:
    #print('Mean for regime %i: ' % i, unsup.means_[i][0])
    #print('Co-Variance for regime %i: ' % i, (unsup.covariances_[i]))

#print(Regime_split.head())

ss1 = StandardScaler()
columns = Regime_split.columns.drop(['Regime', 'Time'])
Regime_split[columns] = ss1.fit_transform(Regime_split[columns])
Regime_split['Signal'] = 0
Regime_split.loc[Regime_split['Return'] > 0, 'Signal'] = 1
Regime_split.loc[Regime_split['Return'] < 0, 'Signal'] = -1
Regime_split['return'] = Regime_split['Return'].shift(1)
Regime_split = Regime_split.dropna()

cls = SVC(C=1.0, cache_size=400, class_weight=None, coef0=0.0,
          decision_function_shape='ovo', degree=3, gamma='auto', kernel='poly',
          max_iter=-1, probability=False, random_state=0, shrinking=True,
          tol=0.001, verbose=True)

split2 = int(.8 * len(Regime_split))

X = Regime_split.drop(['Signal', 'Return', 'market_cu_return', 'Time'], axis=1)
y = Regime_split['Signal']

cls.fit(X[:split2], y[:split2])

p_data = len(X) - split2

df['Pred_Signal'] = 0
df.iloc[-p_data:, df.columns.get_loc('Pred_Signal')] = cls.predict(X[split2:])

df['str_ret'] = df['Pred_Signal'] * df['Return'].shift(-1)

df['strategy_cu_return'] = 0.
df['market_cu_return'] = 0.
df.iloc[-p_data:, df.columns.get_loc('strategy_cu_return')] \
    = np.nancumsum(df['str_ret'][-p_data:])
df.iloc[-p_data:, df.columns.get_loc('market_cu_return')] \
    = np.nancumsum(df['Return'][-p_data:])
Sharpe = (df['strategy_cu_return'][-1] - df['market_cu_return'][-1]) \
         / np.nanstd(df['strategy_cu_return'][-p_data:])

plt.plot(df['strategy_cu_return'][-p_data:], color='g', label='Strategy Returns')
plt.plot(df['market_cu_return'][-p_data:], color='r', label='Market Returns')
plt.figtext(0.14, 0.9, s='Sharpe ratio: %.2f' % Sharpe)
plt.legend(loc='best')
plt.show()

print(cls.score(X,y))
print(cls.predict(X[-1:]))
sign = (cls.predict(X[-1:]))

percent = abs(df['Open'][-1]-df['Open'][-5:-4])/4
future_price= (percent*sign) + df['Open'][-1]


#people look at this, see what kind of data you want to play with here
df.reset_index(level=0, inplace=True)
my_score=cls.score(X,y)
df.insert(1, 'Score', my_score)
df.insert(1, 'Sharpe', Sharpe)

path = os.path.dirname(os.path.abspath(__file__))
util.writeDFtoCSV(df, os.path.join(path, 'Litecoin_model_output.csv'))

outputFileName = '../ui/src/scraped/litecoin/Litecoin_model_output.js'
with open(outputFileName, 'w') as f:
    f.write("module.exports = { model_data : ")
    f.write(df.to_json(orient='records'))
    f.write("}")
print(future_price)
#predicted value
#success rate