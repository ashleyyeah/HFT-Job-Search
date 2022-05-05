import React, { useState } from 'react';
//import Select from '@types/react-select'
import './index.css';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Button } from '@mui/material'

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

export const Game = (props) => {
    return (
        <div className="game">
            <div width="50%" height="100%">
                <div className="game-board">
                    <h1> HFT Job Database </h1>
                    <h4> created by: Brennan Eng, Ashley Yeah, Jeep Kaewla, Sanjana Pingali </h4>
                    Input HFT firm: <Board />
                    <div></div>
                    Positions available: <Board />
                    <div />
                    <h3> Salary Range </h3>
                    From: <Board />
                    <div></div>
                    To: <Board />
                    <div />
                    Skills: <Board />
                    Location: <Board />
                </div>
                <Button>BING</Button>
            </div>
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