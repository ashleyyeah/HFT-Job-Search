import csv
from fileinput import filename
"""
After obtaining the potential list of finanical firms from webscraing H1B data and after performing fuzzy matching with SEC data, 
I used this script to classify the companies into two category: the one that are likely to be financial firms 
(has financial, investment, asset, bank, etc. in their name) and the one that does not contain these keywords.
I then check the companies with lower confident level
to see if the companies are indeed financial.

To use the function, call the function with the filename(csv) of the file
 that contains the companies you want to classify.
"""
def classifyCompany(filename):
    with open(filename) as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=',')
        line_count = 0
        sum = 0
        for row in csv_reader:
            if line_count == 0:
                line_count+=1
                with open('company_notfound3.csv','w', newline="\n") as f:
                        csv_writer = csv.writer(f)
                        csv_writer.writerow(row)
            else:
                line_count+=1
                if ("BANK" in str(row[0]).upper()) or ("FINANCIAL" in str(row[0]).upper()) or ("INVESTMENT" in  str(row[0]).upper()) or ("ASSET"  in str(row[0]).upper()) or ("INVESTMENT"  in str(row[0]).upper()): 
                    sum +=1
                    with open('company_found3.csv','a', newline="\n") as f1:
                        csv_writer1 = csv.writer(f1)
                        csv_writer1.writerow(row)
                else:
                    with open('company_notfound3.csv','a', newline="\n") as f:
                        csv_writer = csv.writer(f)
                        csv_writer.writerow(row)
        print("detected "+str(sum)+" companies with keywords")

classifyCompany("company.csv") #change the name to file here, note that this script is nested in WebScrape so beware of the relative path