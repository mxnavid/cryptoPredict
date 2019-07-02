import matplotlib.pylab as plt
import numpy as np
#%matplotlib inline
from sklearn.linear_model import LinearRegression
import pandas as pd

data = pd.read_csv('Bitcoin.csv')

# Drop date variable
data = data.drop(['DATE'], 1)
target = data.values #= y values = prices offset into the future
data = data.drop(['SP500'],1)
# Dimensions of dataset
n = data.shape[0]
p = data.shape[1]
# Make data a np.array
data = data.values



target = target[:,0]


#print(diabetes.target)
from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(data, target, test_size=0.2, random_state=0)
# There are three steps to model something with sklearn
# 1. Set up the model
model = LinearRegression()
# 2. Use fit
model.fit(X_train, y_train)
# 3. Check the score
print(model.score(X_test, y_test)) #this gives the overall score of the model, I think it is a function to explain how well the data sets % wise explains the y
print(model.coef_) #slope coeficients = if we plugged in a value for each of the 500, we could predict the y
print(model.intercept_)
