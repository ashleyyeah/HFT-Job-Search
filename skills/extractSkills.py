import csv

from numpy import empty
def extractSkills():
    role_dict = {}
    not_found = list()
    skill_dict = {}
    skill_found = list()
    id = 0
    with open('skills/company_role_skill.csv','w', newline="\n")  as skill_file:
        writer = csv.writer(skill_file)
        to_write = ["COMPANY_ROLE_SKILLS_ID", "COMPANY_ROLES_ID","SKILL_ID"]
        writer.writerow(to_write)
    #intialize the dict with role (value) and its id (key)
    with open('skills/roles.csv') as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=',')
        for row in csv_reader:
            if row[0] != "ROLE_ID":
                role_dict[row[0].upper()] = row[1]
    with open('skills/skills.csv', newline='') as f:
        csv_reader = csv.reader(f)
        for row in csv_reader:
            skill = row[1]
            print(skill)
            if skill != '' and skill != 'SKILL':
                skill_dict[skill.upper()] = row[0]
        print(skill_dict)
    with open('skills/company_role_specs_updated.csv') as csv_file:
            csv_reader = csv.reader(csv_file, delimiter=',')
            for row in csv_reader:
                if row[0] != "COMPANY_ROLES_SPECS_ID":
                    try:
                        role_name = role_dict[row[1]].upper()
                    except:
                        not_found.append(row[1])
                    for skill in skill_dict:
                        if(role_name.find(skill.upper()) != -1):
                            
                            with open('skills/company_role_skill.csv','a', newline="\n")  as skill_file:
                                writer = csv.writer(skill_file)
                                to_write = [id, row[1],skill_dict[skill]]
                                writer.writerow(to_write)
                                id=id+1
                            if skill not in skill_found:
                                skill_found.append(skill)
                            print('skill:'+ skill, 'role_name:'+role_name)
    print(str(len(skill_found))+' skills found:')
    print(skill_found)
    if len(not_found) == 0:
        print('No Invalid ID')
    else:
        print('Invalid ID:')
        print(not_found)
extractSkills()
                


            
    
