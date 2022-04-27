import csv
from typing import Counter
def reformat():
    counter = 23628
    no = 0
    dict = {}
    with open("roles/roles.csv") as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=',')
        for row in csv_reader:
            dict[row[1]] = row[0]
    with open("roles/company_role_specs_name.csv") as csv_file:
        csv_reader = csv.reader(csv_file, delimiter =',')
        for row in csv_reader:
            if row[6] == 'ROLE_NAME':
                to_write = ['COMPANY_ROLES_SPECS_ID', row[0], row[1], row[2], row[3],row[4],row[5]]
                with open('company_role_specs_update.csv', 'w', newline="\n", encoding='UTF8') as f: 
                    writer = csv.writer(f)
                    writer.writerow(to_write)
                    continue
            elif row[6] not in dict:
                with open('role_gone.csv', 'a', newline="\n", encoding='UTF8') as f: 
                    writer = csv.writer(f)
                    to_write = [row[6], row[0]]
                    writer.writerow(to_write)
                with open('roles/roles_updated.csv', 'a', newline="\n", encoding='UTF8') as f: 
                    writer = csv.writer(f)
                    to_write = [counter, row[6]]
                    writer.writerow(to_write)
                dict[row[6]] = counter
                counter = counter + 1
            to_write = [no, dict[row[6]], row[1], row[2], row[3],row[4],row[5]]
            no = no + 1
            with open('company_role_specs_update.csv', 'a', newline="\n", encoding='UTF8') as f: 
                writer = csv.writer(f)
                writer.writerow(to_write)


reformat()