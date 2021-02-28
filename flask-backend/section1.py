import numpy as np

import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np
import pandas as pd
import statsmodels.api as sm
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.linear_model import LogisticRegression  # needed for creating a model
from sklearn.linear_model import Ridge
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import PolynomialFeatures

sns.set()

from scipy import stats

stats.chisqprob = lambda chisq, df: stats.chi2.sf(chisq, df)
sns.set()

df = pd.read_csv('Insights.csv')
df.dropna(inplace=True)
df_filtered = df.copy()


def question1():
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


def question2():
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
    return currency, shipment, prod


def question3a():
    data = df_filtered.copy()
    data = df_filtered.drop(
        ['Date', 'HS Code', 'Product', 'Specific Product', 'Port of Origin', 'Country of Destination',
         'Port of Destination', 'Value(USD)', 'Std Qty', 'Std Unit', 'Std Unit Price(USD)', 'Unit',
         'Value In FC', 'Unit Rate Currency', 'Value(INR)', 'Shipment Mode', 'Invoice Value INR'],
        axis=1)
    # data[~data.isin([np.nan, np.inf, -np.inf]).any(1)]
    # data.replace([np.inf, -np.inf], np.nan).dropna(axis=1)
    data.fillna(0, inplace=True)
    X = np.array(df['Qty']).reshape((-1, 1))
    y = np.array(df['Unit Rate In FC']).reshape((-1, 1))
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=0)
    model = LinearRegression()
    model.fit(X, y)
    fig = plt.figure()
    plt.scatter(X, y, alpha=0.5, color='black')
    plt.plot(X, model.predict(X), color='#5ea3a3', linewidth=2)
    plt.title("Qty VS Unit Rate in FC")
    plt.xlabel("Qty")
    plt.ylabel("Unit Rate in FC")
    fig.savefig('question3a.png', bbox_inches='tight')


def question3b():
    data = df_filtered.drop(
        ['Date', 'HS Code', 'Product', 'Specific Product', 'Port of Origin', 'Country of Destination',
         'Port of Destination', 'Value(USD)', 'Std Qty', 'Std Unit', 'Std Unit Price(USD)', 'Unit',
         'Value In FC', 'Unit Rate Currency', 'Value(INR)', 'Shipment Mode', 'Invoice Value INR'],
        axis=1)
    # data[~data.isin([np.nan, np.inf, -np.inf]).any(1)]
    # data.replace([np.inf, -np.inf], np.nan).dropna(axis=1)
    data.fillna(0, inplace=True)
    X_data = np.array(df['Qty']).reshape((-1, 1))
    y_data = np.array(df['Unit Rate In FC']).reshape((-1, 1))
    X_train, X_test, y_train, y_test = train_test_split(X_data, y_data, test_size=0.2, random_state=0)
    R = Ridge(alpha=0.0001)
    R.fit(X_train, y_train)
    alphas = [1e-15, 1e-10, 1e-8, 1e-3, 1e-2, 1, 5, 10, 20, 30, 35, 40, 45, 50, 55, 100]
    cs = ['b', 'g', 'r']
    fig = plt.figure()
    plt.scatter(X_data, y_data, alpha=0.5, color='black')
    plt.plot(X_data, y_data, 'b+', label='Datapoints')
    plt.title("Qty VS Unit Rate in FC")
    plt.xlabel("Qty")
    plt.ylabel("Unit Rate in FC")

    for alpha, c in zip(alphas, cs):
        preds = get_preds_ridge(X_data, y_data, alpha)
        # Plot
        plt.plot(sorted(X_data[:, 0]), preds[np.argsort(X_data[:, 0])], c, label='Alpha: {}'.format(alpha))

    plt.legend()
    fig.savefig('question3b.png', bbox_inches='tight')


def get_preds_ridge(X, Y, alpha):
    model = Pipeline([
        ('poly_feats', PolynomialFeatures(degree=16)),
        ('ridge', Ridge(alpha=alpha))
    ])
    model.fit(X, Y)
    return model.predict(X)
