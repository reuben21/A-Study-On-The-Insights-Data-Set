import numpy as np

import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np
import pandas as pd
import statsmodels.api as sm
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression #needed for creating a model
from sklearn.metrics import accuracy_score
from sklearn.metrics import classification_report, confusion_matrix
sns.set()

from scipy import stats
stats.chisqprob = lambda chisq, df: stats.chi2.sf(chisq, df)
sns.set()

df = pd.read_csv('Insights.csv')
df.dropna(inplace=True)
df_filtered = df.copy()


def question1():
    df_filtered = df.copy()
    df_filtered = df.copy()
    df_most_performing = df_filtered.groupby('Product').sum()
    df_most_performing['Profit'] = df_most_performing['Value(INR)'] - (
                df_most_performing['Qty'] * df_most_performing['Value(USD)'])
    prod = df_most_performing.index.tolist()
    profit = df_most_performing['Profit'].tolist()
    d1 = {}
    for l1_ in prod:
        for l2_ in profit:
            d1[l1_] = l2_
            profit.remove(l2_)
            break
    sorted_dict = sorted(d1.items(), key=lambda item: item[1], reverse=True)[:10]
    dictionary = dict(sorted_dict)
    fig = plt.figure()
    ax = fig.add_axes([0, 0, 1, 1])
    list_of_keys = []
    list_of_values = []
    for k in dictionary.keys():
        list_of_keys.append(k)
    for v in dictionary.values():
        list_of_values.append(v)
    ax.barh(list_of_keys, list_of_values)
    fig.savefig('question1.png', bbox_inches='tight')
    return dictionary.keys(), dictionary.values()


def question2(test_data_from_user):
    raw_data = pd.read_csv('Insights.csv')
    raw_data.head()
    data = raw_data.copy()
    df_filtered = data[data['Port of Destination'] == "Hamburg"]
    Qty = df_filtered['Qty']
    df_filtered = df_filtered.drop(
        ['Date', 'HS Code', 'Specific Product', 'Port of Destination', 'Port of Origin', 'Country of Destination',
         'Std Qty', 'Std Unit', 'Qty', 'Unit', 'Invoice Value INR'], axis=1)
    df_filtered.insert(len(df_filtered.columns), "Qty", Qty, True)
    currency = df_filtered["Unit Rate Currency"].unique()
    currency = currency.tolist()
    df_filtered['Unit Rate Currency'] = df_filtered['Unit Rate Currency'].map(lambda x: currency.index(x))
    # df_filtered['Qty'] = df_filtered['Qty'].map(lambda x: 0 if x <100 else 1)
    shipment = df_filtered["Shipment Mode"].unique()
    shipment = shipment.tolist()
    df_filtered['Shipment Mode'] = df_filtered['Shipment Mode'].map(lambda x: shipment.index(x))
    prod = df_filtered["Product"].unique()
    prod = prod.tolist()
    df_filtered['Product'] = df_filtered['Product'].map(lambda x: prod.index(x))
    df_filtered['Profit'] = df_filtered['Value(INR)'] - (df_filtered['Qty'] * df_filtered['Value(USD)'])
    df_filtered['Profit_logic'] = df_filtered['Profit'].map(lambda x: 0 if x < 0 else 1)
    df_filtered = df_filtered.drop(['Profit'], axis=1)
    x1_column_name = df_filtered.columns.tolist()[0:len(df_filtered.columns) - 1]
    y = df_filtered['Profit_logic']
    x = df_filtered[x1_column_name]
    # print(y.head())
    # print("X HEAD************")
    # print(x.head())
    # we dont need this in independant data , so dropping
    X_train, X_test, Y_train, Y_test = train_test_split(x, y, test_size=0.2, random_state=20)
    X_train.fillna(X_train.mean(), inplace=True)  # this will replace all NAN values by their mean.
    Y_train.fillna(Y_train.mean(), inplace=True)  # this will replace all NAN values by their mean.
    # print(X_train.shape)
    # print(X_test.shape)
    # print(Y_train.shape)
    # print(Y_test.shape)
    logis = LogisticRegression()
    logis.fit(X_train, Y_train)
    predictions = logis.predict(X_test)
    # print(classification_report(Y_test, predictions))
    #
    # print(accuracy_score(Y_test, predictions))
    # cm = confusion_matrix(Y_test,predictions)
    #
    # fig, ax = plt.subplots(figsize=(8, 8))
    # ax.imshow(cm)
    # ax.grid(False)
    # ax.xaxis.set(ticks=(0, 1), ticklabels=('Predicted 0s', 'Predicted 1s'))
    # ax.yaxis.set(ticks=(0, 1), ticklabels=('Actual 0s', 'Actual 1s'))
    # ax.set_ylim(1.5, -0.5)
    # for i in range(2):
    #     for j in range(2):
    #         ax.text(j, i, cm[i, j], ha='center', va='center', color='red')
    # plt.show()


