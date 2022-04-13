import urllib
import pandas as pd
from bs4 import BeautifulSoup
import numpy as np
import matplotlib.pyplot as plt
import string as st
import seaborn as sns
import csv
# base code for load_data is from https://henryfeng.medium.com/web-scraping-h1b-salary-db-i-exploring-business-analytics-job-market-for-non-american-junior-829db4f7c6f9
# I then code the
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
    try:    
        r = urllib.request.urlopen(url)
    except:
        print("skipped")
        return 
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
            # for calculating job role frequency
            # with open('jobrolefreqency.csv', 'a', newline="\n", encoding='UTF8') as f: 
            #     writer = csv.writer(f)
            #     for key in dict:
            #         data = [str, key, dict[key]]
            #         writer.writerow(data)

            #for getting a list of company
            with open('company_updated.csv', 'a', newline="\n", encoding='UTF8') as f: 
                writer = csv.writer(f)
                
                city = data_list[3][:len(data_list[3])-3]
                state = data_list[3][len(data_list[3])-2:]
                data = [data_list[0], city, state]
                writer.writerow(data)
            
            df = pd.DataFrame(final, columns = labels)    
            df['submit date'] = pd.to_datetime(df['submit date'])
            df['start date'] = pd.to_datetime(df['start date'])
            df['state'] = df['location'].str.split().str[-1] 
            df['year'] = df['submit date'].dt.year
            df['month'] = df['submit date'].dt.month
            return df
    return None
"""
Overall, the code below gets collect the company names that has job associated with the job listed in job_list.
We then use the list of company acquired (potential HFT, Finanicial Firms) to find other info about that company
as well as acquired a superset of job roles from the companies.
"""
company_set = set()
job_superset = set()

def main():
    job_list = ["QUANT", "TRADER", "ALGORITHMIC TRADER", "PORTFOLIO","INVESTMENT","CAPITAL","ASSET", "BANK"]
    for job in job_list:
        load_data(job)
    print("\n"+str(len(company_set)))
    header = ['Company', 'Job Role', 'Frequency']
    with open('jobrolefreqency.csv', 'w', newline="\n", encoding='UTF8') as f:
        writer = csv.writer(f)
        writer.writerow(header)
    header = ['Company name','City','State']
    with open('company.csv', 'w', newline="\n", encoding='UTF8') as f:
        writer = csv.writer(f)
        writer.writerow(header)
    for company in company_set:
        load_company(company)
    print("finished writing to csv file")

"""
function: load_all_job_from_company
This function is modified from load_company function to collect information
about the job roles available in each company, as well as find the 
salary range for each job role in H1B database.
It is served as a helper function to get_role_for_each_company
"""    
def load_all_job_from_company(str):
   
    word = str.split()
    concat_str = ""
    for i in range(len(word)):
        if (i + 1 != len(word)):
            concat_str+=word[i]+'+'
        else:
            concat_str+=word[i]
 
        url = "https://h1bdata.info/index.php?em="+concat_str+"&job=&city=&year=2021"
    try:    
        r = urllib.request.urlopen(url)
    except:
        print("skipped")
        return 
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
            print(data_list)

            if len(data_list) >= 2:
                print(data_list)
                if data_list[1]+"@"+data_list[3] not in lower_s:
                    lower_s[data_list[1]+"@"+data_list[3]] = data_list[2]
                    upper_s[data_list[1]+"@"+data_list[3]] = data_list[2]
                    job_role.add(data_list[1]+"@"+data_list[3])
                else:
                    if ( data_list[2] < lower_s[data_list[1]+"@"+data_list[3]]):
                        lower_s[data_list[1]+"@"+data_list[3]] = data_list[2]
                    elif (data_list[2] > upper_s[data_list[1]+"@"+data_list[3]]):
                        upper_s[data_list[1]+"@"+data_list[3]] = data_list[2]
    
            #for getting a list of company
            if len(data_list) >3:
                with open('company_updated.csv', 'a', newline="\n", encoding='UTF8') as f: 
                    writer = csv.writer(f)
                    city = data_list[3][:len(data_list[3])-3]
                    state = data_list[3][len(data_list[3])-2:]
                    data = [data_list[0], city, state]
                    writer.writerow(data)
            
        df = pd.DataFrame(final, columns = labels)    
        df['submit date'] = pd.to_datetime(df['submit date'])
        df['start date'] = pd.to_datetime(df['start date'])
        df['state'] = df['location'].str.split().str[-1] 
        df['year'] = df['submit date'].dt.year
        df['month'] = df['submit date'].dt.month
        return df
    return None
lower_s = {}
upper_s = {}
job_role = set()
"""
get_role_for_each_company
This function calls load_all_job_from_company function, which webscrapes 
and collect salary range for each job role at each company.
Input: filepath
Output: company_roles.csv 
Purpose: for filling the job role schema in our database
"""
def get_role_for_each_company(filepath):
    header = ['COMPANY_ID','ROLE','SALARY_LOWER','SALARY_UPPER','CITY','STATE']
    with open('company_roles1.csv', 'w', newline="\n", encoding='UTF8') as f:
        writer = csv.writer(f)
        writer.writerow(header)
    with open(filepath) as csv_file: 
        csv_reader = csv.reader(csv_file, delimiter=',')
        line_count = 0
        for row in csv_reader:
            if line_count == 0:
                line_count +=1
                continue
            print("company",row[1])
            job_role.clear()
            load_all_job_from_company(row[1])
            print(job_role)
            
           
            for job in job_role:
                 with open('company_roles1.csv', 'a', newline="\n", encoding='UTF8') as f:
                    writer = csv.writer(f)
                    try:
                        print(job,lower_s[job])
                        print(job, upper_s[job])
                    except: 
                        print("skipped")
                        continue
                    temp_list = job.split('@')
                    print("temp_list",temp_list)
                    city = temp_list[1][:len(temp_list[1])-3]
                    print(city)
                    state = temp_list[1][len(temp_list[1])-2:]
                    print(state)
                    to_write = [row[0], temp_list[0],lower_s[job],upper_s[job],city,state]
                    writer.writerow(to_write)
                    
        
            print(job_role)
            line_count+=1
            print(line_count)

#get_role_for_each_company('WebScrape\companies.csv') #change the filepath here