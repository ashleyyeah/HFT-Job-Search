import React, { useState } from 'react';
//import Select from '@types/react-select'
import './index.css';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Button, Autocomplete, TextField, Stack } from '@mui/material';

const data = [
    {
        name: '2017',
        JPMORGAN: 10000,
        JUMP: 14000,
    },
    {
        name: '2018',
        JPMORGAN: 30000,
        JUMP: 31980,
    },
    {
        name: '2019',
        JPMORGAN: 35000,
        JUMP: 36000,

    },
    {
        name: '2020',
        JPMORGAN: 38800,
        JUMP: 37080,

    },
    {
        name: '2021',
        JPMORGAN: 39900,
        JUMP: 37500,

    }
];

// const hftfirms = ['citadel', 'jumptrading', 'jpmorgan'];

export const Board = (props) => {
    const [value, setValue] = useState('');

    const handleChange = (event) => {
        setValue(event.target.value);
    }

    const handleSubmit = (event) => {
        alert('A name was submitted: ' + value);
        event.preventDefault();
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                <input type="text" className="advancedSearchTextBox" value={value} onChange={handleChange} />
            </label>
            <input type="submit" value="Submit" />
        </form>
    );
}

export const HFTAutocomplete = () => {
    const [selectedHFTfirm, setselectedHFTfirm] = useState(null);
    return (
        <Autocomplete
            id="HFT Firms"
            options={data}
            sx = {{width:300}}
            renderInput={(params) => (<TextField {...params} label = "Choose HFT Firm here"
            placeholder = "Arbitrary HFT Firm" />)}
            getOptionLabel={option => option.name}
            value = {selectedHFTfirm}
            onChange={(_event, newHFTfirm) => {
                setselectedHFTfirm(newHFTfirm);
            }}
        />
    )
}

export const HFTJobAutocomplete = () => {
    const [selectedHFTfirm, setselectedHFTfirm] = useState(null);
    return (
        <Autocomplete
            id="HFT Firms"
            options={data}
            sx = {{width:300}}
            renderInput={(params) => (<TextField {...params} label = "Choose HFT Job Position here"
            placeholder = "Arbitrary HFT Position" />)}
            
            getOptionLabel={option => option.name}
            value = {selectedHFTfirm}
            onChange={(_event, newHFTfirm) => {
                setselectedHFTfirm(newHFTfirm);
            }}
        />
    )
}

export const Game = (props) => {
    return (
        <div className="game">
            <Stack spacing={2}>
                <h1>HFT Job Industry Database</h1>
                <h3> designed by: Brennan Eng, Ashley Yeah, Jeep Kaewala, and Sanjana Pingali</h3>
                <h3>Input Values here:</h3>
                <HFTAutocomplete />
                <HFTJobAutocomplete />
                <Button variant='contained' sx= {{width:100}}>Submit</Button>
            </Stack>
            <ResponsiveContainer width="50%" aspect={1}>
                <LineChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                        top: 100,
                        right: 70,
                        left: 0,
                        bottom: 100,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis label={{ value: 'Salary for Data Analyst ($)', angle: -90, position: 'insideLeft' }} />

                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="JPMORGAN" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="JUMP" stroke="#82ca9d" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};
