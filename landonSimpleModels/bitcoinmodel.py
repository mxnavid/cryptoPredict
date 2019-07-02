import matplotlib.pylab as plt
import numpy as np
#%matplotlib inline
from sklearn.linear_model import LinearRegression
import pandas as pd

data = pd.read_csv('Bitcoin.csv')

# Drop date variable
data = data.iloc[1:,:]
data = data.iloc[::-1]
data['Date'] = pd.to_datetime(data["Date"])
data.set_index('Date', inplace=True)
data.tail()
data = data.drop(['Unix Timestamp'],1)
data = data.drop(['Symbol'],1)
target = data['Close']
data = data.iloc[24:]
print("hello")
print(data)

# Dimensions of dataset
n = data.shape[0]
p = data.shape[1]
# Make data a np.array
data2 = data
data = data.values

target = target.values

#target = target[:,0] #go three down to predict 3 hours in future
print("hi")



# i'm lazy and don't know which number begins the index for the last 24 rows...
target = target[:-1]
target = target[:-1]
target = target[:-1]
target = target[:-1]
target = target[:-1]
target = target[:-1]
target = target[:-1]
target = target[:-1]
target = target[:-1]
target = target[:-1]
target = target[:-1]
target = target[:-1]
target = target[:-1]
target = target[:-1]
target = target[:-1]
target = target[:-1]
target = target[:-1]
target = target[:-1]
target = target[:-1]
target = target[:-1]
target = target[:-1]
target = target[:-1]
target = target[:-1]
target = target[:-1]
print(target)


#print(diabetes.target)
from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(data, target, test_size=0.2, random_state=0)
# There are three steps to model something with sklearn
# 1. Set up the model
model = LinearRegression()
# 2. Use fit
model.fit(X_train, y_train)
# 3. Check the score
bob = model.score(X_test, y_test)
print("The model score is: " + str(bob)) #this gives the overall score of the model, I think it is a function to explain how well the data sets % wise explains the y
print(model.coef_) #slope coeficients = if we plugged in a value for each of the 500, we could predict the y
print(model.intercept_)
cdf = pd.DataFrame(model.coef_, data2.columns, columns=['Coefficients'])
print(cdf)