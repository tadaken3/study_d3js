#codeing:UTF-8

import pandas as pd
import json

df = pd.read_csv('data_.csv')
category_list = df['category'].drop_duplicates()

list = []
for category in category_list:
    separate_df = df[df['category'] == category]
    data_list = []
    for j,d in separate_df.iterrows():
        tmp = {'name' : d['app_name'], 'value' : d['grossing']}
        data_list.append(tmp)
    category_dict = {'name' : category, 'children' : data_list}
    list.append(category_dict)
dict = {'name' : 'root', 'children': list}

f = open("data_.json", "w")    
json.dump(dict, f, ensure_ascii=False)
