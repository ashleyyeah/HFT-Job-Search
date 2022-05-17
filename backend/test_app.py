from app import app
from flask import json

def test_companies():        
    response = app.test_client().get(
        '/companies')

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