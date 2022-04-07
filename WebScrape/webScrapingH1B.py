import urllib
import pandas as pd
from bs4 import BeautifulSoup
import numpy as np
import matplotlib.pyplot as plt
import string as st
import seaborn as sns
import csv
# load data is from https://henryfeng.medium.com/web-scraping-h1b-salary-db-i-exploring-business-analytics-job-market-for-non-american-junior-829db4f7c6f9
# and load company is modified from load data to have the desired functionality

"""
load_data
This functions takes in job roles and gets all the companies that have the input job roles.
The list of the companies found are stored in the "company_set" set
"""
def load_data(str):
    word = str.split()
    concat_str = ""
    for i in range(len(word)):
        if (i + 1 != len(word)):
            concat_str+=word[i]+'+'
        else:
            concat_str+=word[i]
    
    r = urllib.request.urlopen('https://h1bdata.info/index.php?em=&job='+concat_str+'+'+'&city=&year=All+Years') 
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
        if(len(data_list)>1):
            company_set.add(data_list[0])           
    
    df = pd.DataFrame(final, columns = labels)    
    df['submit date'] = pd.to_datetime(df['submit date'])
    df['start date'] = pd.to_datetime(df['start date'])
    df['state'] = df['location'].str.split().str[-1] 
    df['year'] = df['submit date'].dt.year
    df['month'] = df['submit date'].dt.month
    return df
"""
load_comp
This functions takes in company name and gets all the information of that firm job title, base salary,
location.
From this information, we obtain we collect the superset of job role of HFT firms.
"""
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
    if(len(data2)>0):
        for h in data2[0].find_all('th'):
            try:
                labels.append(h.get_text().strip().lower())
            except:
                print("skip one")
    
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
                job_superset.add(data_list[1])
                if data_list[1] in dict:
                    dict[data_list[1]] += 1
                else:
                    dict[data_list[1]] = 1
        
            with open('jobrolefreqency.csv', 'a', encoding='UTF8') as f: 
                writer = csv.writer(f)
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
    return None

#example of how to run 
job_list = ["QUANT", "TRADER", "ALGORITHMIC TRADER", "PORTFOLIO"]
company_set = set()
job_superset = set()
for job in job_list:
    load_data(job)
print(company_set)
print("\n"+str(len(company_set)))
header = ['Company', 'Job Role', 'Frequency']
with open('jobrolefreqency.csv', 'a', encoding='UTF8') as f:
    writer = csv.writer(f)
    writer.writerow(header)
for company in company_set:
    if company!= "PANAGORA ASSET MANAGEMENT INC":
        load_company(company)
print("finished writing to csv file")
#print("\n"+str(len(job_superset)))

