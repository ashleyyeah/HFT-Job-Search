from app import app
from flask import json

def test_companies():        
    response = app.test_client().get(
        '/companies')

    data = json.loads(response.get_data(as_text=True))

    assert response.status_code == 200
    assert type(data[0]) == dict
    assert list(data[0].keys()) == ['name']

def test_skills():        
    response = app.test_client().get(
        '/skills')

    data = json.loads(response.get_data(as_text=True))

    assert response.status_code == 200
    assert type(data[0]) == dict
    assert list(data[0].keys()) == ['name']

def test_empty_roles():    
    params = {'selectedHFTfirm': ''}

    response = app.test_client().get(
        '/comp_roles?',
        query_string = params)

    data = json.loads(response.get_data(as_text=True))

    keys = list(data[0].keys())

    assert response.status_code == 200
    assert type(data[0]) == dict
    assert 'name' in keys and 'role_id' in keys
    assert len(data) > 0

def test_filled_roles():    
    params = {'selectedHFTfirm': 'CITADEL AMERICAS LLC'}

    response = app.test_client().get(
        '/comp_roles?',
        query_string = params)

    data = json.loads(response.get_data(as_text=True))

    keys = list(data[0].keys())

    assert response.status_code == 200
    assert type(data[0]) == dict
    assert 'name' in keys and 'role_id' in keys
    assert len(data) > 0

def test_wrong_roles():    
    params = {'selectedHFTfirm': 'wrong'}

    response = app.test_client().get(
        '/comp_roles?',
        query_string = params)

    data = json.loads(response.get_data(as_text=True))

    keys = list(data[0].keys())

    assert response.status_code == 200
    assert type(data[0]) == dict
    assert data[0]['name'] == 'No Options'
    assert len(data) == 1

def test_empty_locations():    
    params = {'selectedHFTfirm': '', 
              'selectedHFTJob': ''}

    response = app.test_client().get(
        '/locations?',
        query_string = params)

    data = json.loads(response.get_data(as_text=True))

    keys = list(data[0].keys())

    assert response.status_code == 200
    assert type(data[0]) == dict
    assert 'name' in keys
    assert len(data) > 0
    
def test_empty_locations():    
    params = {'selectedHFTfirm': 'wrong', 
              'selectedHFTJob': 'wrong'}

    response = app.test_client().get(
        '/locations?',
        query_string = params)

    data = json.loads(response.get_data(as_text=True))

    keys = list(data[0].keys())

    assert response.status_code == 200
    assert type(data[0]) == dict
    assert data[0]['name'] == 'No Options'
    assert len(data) == 1

def test_filled_locations():    
    params = {'selectedHFTfirm': 'CITADEL AMERICAS LLC', 
              'selectedHFTJob': 'SOFTWARE'}

    response = app.test_client().get(
        '/comp_roles?',
        query_string = params)

    data = json.loads(response.get_data(as_text=True))

    keys = list(data[0].keys())

    assert response.status_code == 200
    assert type(data[0]) == dict
    assert 'name' in keys
    assert len(data) > 0

def test_comp_role_graph():
    params = {'selectedHFTfirm': 'AKUNA CAPITAL LLC', 
              'selectedHFTJob': 'C++ DEVELOPER'}

    response = app.test_client().get(
        '/compjobanalysis?',
        query_string = params)

    data = json.loads(response.get_data(as_text=True))

    assert response.status_code == 200
    assert type(data[0]) == list
    assert len(data[0]) == 2
    assert len(data) > 0

def test_role_graph():
    params = {'selectedHFTJob': 'SOFTWARE ENGINEER'}

    response = app.test_client().get(
        '/jobanalysis?',
        query_string = params)

    data = json.loads(response.get_data(as_text=True))

    assert response.status_code == 200
    assert type(data[0]) == list
    assert len(data[0]) == 2
    assert len(data) > 0

def test_skill_graph():
    params = {'selectedHFTSkill': 'PYTHON'}

    response = app.test_client().get(
        '/costperskill?',
        query_string = params)

    data = json.loads(response.get_data(as_text=True))

    assert response.status_code == 200
    assert type(data[0]) == list
    assert len(data[0]) == 2
    assert len(data) > 0

def test_skill1_graph():
    params = {'selectedHFTSkill1': 'EXCEL'}

    response = app.test_client().get(
        '/costperskill1?',
        query_string = params)

    data = json.loads(response.get_data(as_text=True))

    assert response.status_code == 200
    assert type(data[0]) == list
    assert len(data[0]) == 2
    assert len(data) > 0

def test_submit_filled():
    params = {'selectedHFTfirm': 'TWO SIGMA INVESTMENTS LP',
              'selectedHFTJob': 'DATA SCIENTIST',
              'selectedHFTLocation': 'NEW YORK, NY',
              'min_salary': '0',
              'max_salary': '250000'}

    response = app.test_client().get(
        '/submit?',
        query_string = params)

    data = json.loads(response.get_data(as_text=True))

    keys = list(data[0].keys())

    assert response.status_code == 200
    assert type(data[0]) == dict
    assert 'company_name' in keys and 'id' in keys and 'year' in keys and 'city' in keys and 'state' in keys and 'role' in keys and 'min_salary' in keys and 'max_salary' in keys and 'skills' in keys
    assert len(data) > 0

def test_submit_error():
    params = {'selectedHFTfirm': 'TWO SIGMA INVESTMENTS LP',
              'selectedHFTJob': 'DATA SCIENTIST',
              'selectedHFTLocation': 'CHICAGO, IL',
              'min_salary': '0',
              'max_salary': '10'}

    response = app.test_client().get(
        '/submit?',
        query_string = params)

    data = json.loads(response.get_data(as_text=True))

    keys = list(data[0].keys())

    assert response.status_code == 200
    assert type(data[0]) == dict
    assert 'company_name' in keys and 'id' in keys and 'year' in keys and 'city' in keys and 'state' in keys and 'role' in keys and 'min_salary' in keys and 'max_salary' in keys and 'skills' in keys
    assert data[0]['company_name'] == 'No results match your search criteria'
    assert len(data) == 1