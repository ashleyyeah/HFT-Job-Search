import csv
from typing import Counter
def reformat():
    counter = 23628
    no = 0
    dict = {}
    company_role_dict = {}
    with open("roles/roles.csv") as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=',')
        for row in csv_reader:
            dict[row[1]] = row[0]
    with open('roles/company_roles.csv') as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=',')
        for row in csv_reader:
            if row[0] != "COMPANY_ROLE_SKILLS_ID":
                company_role_dict[row[0]] = row[2]
    with open("roles/company_role_specs_name.csv") as csv_file:
        csv_reader = csv.reader(csv_file, delimiter =',')
        for row in csv_reader:
            temp = row[6]
            temp = temp.replace('"', '')
            temp = temp.replace('\'', '')
            temp = temp.replace(',', '')
            temp = temp.replace('  ', '')
            temp = temp.upper()
            if row[6] == 'ROLE_NAME':
                to_write = ['COMPANY_ROLES_SPECS_ID', row[0], row[1], row[2], row[3],row[4],row[5]]
                with open('company_role_specs_update.csv', 'w', newline="\n", encoding='UTF8') as f: 
                    writer = csv.writer(f)
                    writer.writerow(to_write)
                    continue
            elif temp not in dict:
                with open('role_gone.csv', 'a', newline="\n", encoding='UTF8') as f: 
                    writer = csv.writer(f)
                    to_write = [row[6], row[0]]
                    writer.writerow(to_write)
                with open('roles/roles_updated.csv', 'a', newline="\n", encoding='UTF8') as f: 
                    writer = csv.writer(f)
                    to_write = [counter, temp]
                    writer.writerow(to_write)
                    print('missing')
                dict[temp] = counter
                counter = counter + 1
            to_write = [no, dict[temp], row[1], row[2], row[3],row[4],row[5]]
            no = no + 1
            with open('company_role_specs_update.csv', 'a', newline="\n", encoding='UTF8') as f: 
                writer = csv.writer(f)
                writer.writerow(to_write)


#reformat()
import csv
def reformat_round2():
    company_role = {}
    not_found = []
    id = 0
    with open('company_role_specs/company_role_specs_updated.csv', 'w', newline="\n", encoding='UTF8') as f: 
        writer = csv.writer(f)
        to_write = ['COMPANY_ROLES_SPECS_ID','COMPANY_ROLES_ID','YEAR','MIN_SALARY','MAX_SALARY','CITY','STATE']
        writer.writerow(to_write)
    with open("roles/company_roles.csv") as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=',')
        for row in csv_reader:
            if  row[2] == 'ROLE_ID':
                continue
            elif row[2] not in company_role :
                company_role[row[2]] = [[row[0],row[1]]]
                #print(type(company_role[row[2]]))
                #print(company_role)
            else:
                temp1 = [row[0],row[1]]
                company_role[row[2]].append(temp1)
    with open("skills/company_role_specs_updated.csv") as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=',')
        for row in csv_reader:
            if row[1] != 'ROLE_ID':
                try:
                    to_find_list = company_role[row[1]]
                except:
                    print(row[0])
                found = False
                for tuple in to_find_list:
                    if tuple[1] == row[7]:
                        with open('company_role_specs/company_role_specs_updated.csv', 'a', newline="\n", encoding='UTF8') as f: 
                            writer = csv.writer(f)
                            to_write = [id,tuple[0],row[2], row[3],row[4],row[5],row[6]]
                            id = id + 1
                            writer.writerow(to_write)
                        found = True
                if(found == 0):
                    print(row[0],row[1],tuple)
                    not_found.append(row[1])
    print(not_found)



                    

            

    

reformat_round2()

