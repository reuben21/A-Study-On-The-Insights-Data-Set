import numpy as np
import pandas as pd

# import matplotlib.pyplot as plt
# import seaborn as sns
# sns.set()

df = pd.read_csv('Insights.csv')
df.dropna(inplace=True)
df_filtered = df.copy()


def question1():
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
    return dictionary.keys(), dictionary.values()
