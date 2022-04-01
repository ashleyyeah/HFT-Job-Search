import urllib
import pandas as pd
from bs4 import BeautifulSoup
import numpy as np
import matplotlib.pyplot as plt
import string as st
import seaborn as sns
import csv

#inspired by https://henryfeng.medium.com/web-scraping-h1b-salary-db-i-exploring-business-analytics-job-market-for-non-american-junior-829db4f7c6f9
def load_data(word):
    a = word.lower().split()[0]
    b = word.lower().split()[1]
    
    r = urllib.request.urlopen('https://h1bdata.info/index.php?em=&job='+ a +'+'+ b +'&city=&year=All+Years') 
    soup = BeautifulSoup(r, features="html.parser")
    data2 = soup.find_all('tr')    
    labels = []
    for h in data2[0].find_all('th'):
        labels.append(h.get_text().strip().lower())
    
    final = []
    for data in data2[1:]:
        data_list = []
        for d in data.find_all('td'):
            d_str = d.get_text().replace(',','')
            
            if d_str.isnumeric():
                data_list.append(int(d_str))
            else:
                data_list.append(d_str)                      
        final.append(data_list)
    
    df = pd.DataFrame(final, columns = labels)    
    df['submit date'] = pd.to_datetime(df['submit date'])
    df['start date'] = pd.to_datetime(df['start date'])
    df['state'] = df['location'].str.split().str[-1] 
    df['year'] = df['submit date'].dt.year
    df['month'] = df['submit date'].dt.month
    return df

def load_company(str):
    word = str.split()
    concat_str = ""
    for i in range(len(word)):
        if (i + 1 != len(word)):
            concat_str+=word[i]+'+'
        else:
            concat_str+=word[i]

    url = "https://h1bdata.info/index.php?em="+concat_str+"&job=&city=&year=2021"
    r = urllib.request.urlopen(url) 
    soup = BeautifulSoup(r, features="html.parser")
    data2 = soup.find_all('tr')    
    labels = []
    for h in data2[0].find_all('th'):
        labels.append(h.get_text().strip().lower())
    
    dict = {}
    final = []
    for data in data2[1:]:
        data_list = []
        for d in data.find_all('td'):
            d_str = d.get_text().replace(',','')
        
            if d_str.isnumeric():
                data_list.append(int(d_str))
            else:
                data_list.append(d_str)                 
        final.append(data_list)
        
        if len(data_list) >= 2:
            if data_list[1] in dict:
                dict[data_list[1]] += 1
            else:
                dict[data_list[1]] = 1
    header = ['Company', 'Job Role', 'Frequency'] 
    with open('jobrolefreqency.csv', 'a', encoding='UTF8') as f: 
        writer = csv.writer(f)
        writer.writerow(header)
        for key in dict:
            data = [str, key, dict[key]]
            writer.writerow(data)
    df = pd.DataFrame(final, columns = labels)    
    df['submit date'] = pd.to_datetime(df['submit date'])
    df['start date'] = pd.to_datetime(df['start date'])
    df['state'] = df['location'].str.split().str[-1] 
    df['year'] = df['submit date'].dt.year
    df['month'] = df['submit date'].dt.month
    return df

#example of how to run 
data = load_company('Jpmorgan Chase & Co')
#print(data)

