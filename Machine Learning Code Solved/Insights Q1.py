#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Tue Jan 26 17:54:16 2021

@author: reubencoutinho
"""

import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.linear_model import LinearRegression, Lasso, Ridge
from sklearn.neighbors import KNeighborsRegressor
from sklearn.neural_network import MLPRegressor
from sklearn.tree import DecisionTreeRegressor
from sklearn.model_selection import train_test_split, GridSearchCV, cross_val_score, cross_val_predict, KFold
from sklearn.preprocessing import StandardScaler, PolynomialFeatures
from sklearn.pipeline import Pipeline


df = pd.read_csv("Insights.csv")
# print(df.columns.values.tolist())

def model(pipeline, parameters, X_train, y_train, X, y):

    grid_obj = GridSearchCV(estimator=pipeline,param_grid=parameters,cv=5)
    grid_obj.fit(X_train, y_train)

    '''Results'''

    results = pd.DataFrame(pd.DataFrame(grid_obj.cv_results_))
    results_sorted = results.sort_values(by=['mean_test_score'], ascending=False)

    print("##### Results")
    # print(results_sorted)

    # print("best_index", grid_obj.best_index_)
    # print("best_score", grid_obj.best_score_)
    # print("best_params", grid_obj.best_params_)

    '''Cross Validation'''

    estimator = grid_obj.best_estimator_
    '''
    if estimator.named_steps['scl'] == True:
        X = (X - X.mean()) / (X.std())
        y = (y - y.mean()) / (y.std())
    '''
    shuffle = KFold(n_splits=10,shuffle=True,random_state=0)
    cv_scores = cross_val_score(estimator,X,y.values.ravel(),cv=shuffle,scoring='r2')
    print("##### CV Results")
    print("mean_score", cv_scores.mean())

    '''Show model coefficients or feature importances'''

    try:
        print("Model coefficients: ", list(zip(list(X), estimator.named_steps['clf'].coef_)))
    except:
        print("Model does not support model coefficients")

    try:
        print("Feature importances: ", list(zip(list(X), estimator.named_steps['clf'].feature_importances_)))
    except:
        print("Model does not support feature importances")

    '''Predict along CV and plot y vs. y_predicted in scatter'''

    y_pred = cross_val_predict(estimator, X, y, cv=shuffle)

    plt.scatter(X,y)
    xmin, xmax = plt.xlim()
    ymin, ymax = plt.ylim()
    plt.plot([xmin, xmax], [ymin, ymax],lw=2, alpha=0.5)
    plt.xlabel("Quantity")
    plt.ylabel("Unit Rate In FC")
    # plt.annotate(' R-squared CV = {}'.format(round(float(cv_scores.mean()), 3)), size=9,
    #          xy=(xmin,ymax), xytext=(10, -15), textcoords='offset points')
    # plt.annotate(grid_obj.best_params_, size=9,
    #              xy=(xmin, ymax), xytext=(10, -35), textcoords='offset points', wrap=True)
    plt.title('quantity VS unit_rate_in_fc')
    plt.show()



def preprocessing(df):
    df=df.replace(np.NaN,-1)

    y = df['Unit Rate In FC']
    X = np.array(df['Qty']).reshape((-1, 1))

    return X, y

X, y = preprocessing(df)

print(y.values.ravel())
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.33, random_state=0)

pipe_ols = Pipeline([('scl', StandardScaler()), ('clf', LinearRegression())])

param_ols = {}

model(pipe_ols, param_ols, X_train, y_train, X, y)




pipe_ridge = Pipeline([('scl', StandardScaler()), ('clf', Ridge())])

param_ridge = {'clf__alpha': [1e-15, 1e-10, 1e-8, 1e-4, 1e-3, 1e-2, 1, 5, 10, 20]}

model(pipe_ridge, param_ridge, X_train, y_train, X, y)

# quantity = df['Qty']
# unit_rate_in_fc = df['Unit Rate In FC']
# # print(df['Qty'])

# #creating a dictionary
# product_dict={}
# product_list = []
# product_profit=[]

# products = pd.unique(df['Port of Destination'])
# print(len(products))



# for i in range(len(df)):
#     try:
#         if(df['Product'][i]==df['Product'][i+1]):
            
#         product_list.append(str(df['Product'][i]))
#         product_profit.append(((float(df['Std Unit Price(USD)(SP)'][i])-float(df['Unit Rate In FC'][i]))*(float(df['Value(INR)'][i])/float(df['Value In FC(Cost)'][i])))*float(df['Qty'][i]))
#     except ZeroDivisionError:
#         product_profit.append(0)
        
# product_profit_percentage=[]
# for i in range(len(df)):
#     try:
#         product_profit_percentage.append((product_profit[i]/float(df['Value(INR)'][i]))*100)
#         # print(i)
#     except ZeroDivisionError:
#         product_profit_percentage.append(0)
#         pass
# for i in range(len(df)):
#     print(product_profit_percentage[i])
    
# print(max(product_profit_percentage))