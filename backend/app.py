from flask import Flask, render_template, request, jsonify,json
from flask_mysqldb import MySQL
from flask_cors import CORS, cross_origin
 
app = Flask(__name__)
CORS(app) 
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'vagrant'
app.config['MYSQL_DB'] = 'project'

mysql = MySQL(app)

@app.route('/data', methods=['GET'])
def get_companies():
    cursor = mysql.connection.cursor()
    cursor.execute('''SELECT * FROM companies''')
    data = cursor.fetchall()
    cursor.close()
    return jsonify(data)

'''
'/compjobanalysis' route is for retrieving the information for plotting 
the line graph of salary vs time. We need to get a list of
the average of a certain job role
at a certain company of each year from 2017..2021
avg_salary = [dataAnalyst@Jump2017, dataAnalyst@Jump2018, ..., dataAnalyst@Jump2021] 
'''
@app.route('/compjobanalysis', methods=['GET']) #company_name and role_name are placeholder, to test functionality hardcode a value there
@cross_origin()
def comp_job_analysis():
    #we might have to change this depending on frontend
    # request_data =  json.loads(request.data)
    company_name = request.args['selectedHFTfirm']
    print(company_name)
    role_name = request.args['selectedHFTJob']
    cursor = mysql.connection.cursor()
    to_exec = 'select company_role_specs.year, ((sum(min_salary) + sum(max_salary))/ (count(min_salary) + count(max_salary))) as average_salary \
            from companies \
            join company_roles on companies.company_id = company_roles.company_id \
            join roles on company_roles.role_id = roles.role_id \
            join company_role_specs on company_roles.company_roles_id = company_role_specs.company_roles_id \
            where companies.name LIKE "%' + company_name +'%" and roles.name LIKE "%' + role_name + '%" \
            group by company_role_specs.year \
            order by company_role_specs.year;' 
    cursor = mysql.connection.cursor()
    cursor.execute(to_exec)
    data = cursor.fetchall()
    cursor.close()
    return jsonify(data)

'''
'/jobanalysis' route is for retrieving the information for plotting 
the line graph salary vs year. We need to get a list of
the average of a certain job role
across all companies of each year from 2017..2021
avg_salary = [dataAnalyst2017, dataAnalyst2018, ..., dataAnalyst2021] 
'''
@app.route('/jobanalysis', methods=['GET'])
def job_analysis():
#we might have to change this depending on frontend
    role_name = request.args['selectedHFTJob']
    #role_name = request_data['role_name']
    #print(role_name)
    #cursor = mysql.connection.cursor()
    to_exec = 'select company_role_specs.year, ((sum(min_salary) + sum(max_salary))/ (count(min_salary) + count(max_salary))) as average_salary \
            from companies \
            join company_roles on companies.company_id = company_roles.company_id \
            join roles on company_roles.role_id = roles.role_id \
            join company_role_specs on company_roles.company_roles_id = company_role_specs.company_roles_id \
            where roles.name LIKE "%' + role_name + '%" \
            group by company_role_specs.year \
            order by company_role_specs.year;' 
    cursor = mysql.connection.cursor()
    cursor.execute(to_exec)
    data = cursor.fetchall()
    cursor.close()
    return jsonify(data)
'''
'/costperskill' route is for retrieving the information for plotting 
the line graph salary vs year of each selected skills. We need to get a list of
the average salary of job role requiring a certain skills
across all companies of each year from 2017..2021
avg_salary = [python2017, python2018, ..., python2021] 
'''
@app.route('/costperskill', methods=['GET'])
def cost_per_skill():
#we might have to change this depending on frontend
    #request_data =  json.loads(request.data)
    #skill_name = request_data['skill_name']
    #cursor = mysql.connection.cursor()
    to_exec = 'select skills.name, company_role_specs.year, ((sum(min_salary) + sum(max_salary))/ (count(min_salary) + count(max_salary))) as average_salary \
            from company_role_specs \
            join company_roles on company_roles.company_roles_id = company_role_specs.company_roles_id \
            join company_role_skills on company_roles.company_roles_id = company_role_skills.company_roles_id \
            join skills on skills.skill_id = company_role_skills.skill_id \
            where skills.name like "%FINANCE%" \
            group by skills.name, company_role_specs.year \
            order by skills.name;'
    cursor = mysql.connection.cursor()
    cursor.execute(to_exec)
    data = cursor.fetchall()
    cursor.close()
    return jsonify(data)

if __name__ == "__main__":
    app.run(host='localhost', port=5000)
