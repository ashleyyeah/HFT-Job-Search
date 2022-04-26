from flask import Flask, render_template, request, jsonify
from flask_mysqldb import MySQL
 
app = Flask(__name__)
 
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

if __name__ == "__main__":
    app.run(host='localhost', port=5000)
