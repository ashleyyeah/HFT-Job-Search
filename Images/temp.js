import React, { useState } from 'react';
//import Select from '@types/react-select'
import './index.css';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Button, Autocomplete, TextField, Stack, Slider, Box } from '@mui/material';
import { useEffect } from 'react';

function FormatData(data){
    data.map(({ year, average_salary }) => ({
  year: year,
  salary: average_salary
}));
}
function SubmitGraph(){
    console.log('submitgraph')
    const [compjob,setCompjob] = useState('null');
    console.log('LOL')
    useEffect(()=>{
        fetch('/compjobanalysis').then(response=> response.json()).then(data => {setCompjob(FormatData(data)) 
                console.log(data)})
    });

    return(
        <div>
                <ResponsiveContainer width="50%" aspect={1}>
                <LineChart
                    width={500}
                    height={300}
                    data={compjob}
                    margin={{
                        top: 100,
                        right: 70,
                        left: 0,
                        bottom: 100,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis label={{ value: 'Salary for Data Analyst ($)'  , angle: -90, position: 'insideLeft' }} />

                    <Tooltip />
                    <Legend />
                    {/* <Line type="monotone" dataKey={selectedHFTfirm} stroke="#8884d8" activeDot={{ r: 8 }} /> */}
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
const data = [
    {
        year: '2017',
        JPMORGAN: 10000,
        JUMP: 14000,
    },
    {
        year: '2018',
        JPMORGAN: 30000,
        JUMP: 31980,
    },
    {
        year: '2019',
        JPMORGAN: 35000,
        JUMP: 36000,

    },
    {
        year: '2020',
        JPMORGAN: 38800,
        JUMP: 37080,

    },
    {
        year: '2021',
        JPMORGAN: 39900,
        JUMP: 37500,

    }
];

const hftfirms = [{name:'Citadel'}, {name:'jumptrading'}, {name:'jpmorgan'}]
const roles = [{name:'Trader'}, {name:'Python'}, {name:'Developer'}]
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

export const HFTfirmAutocomplete = () => {
    const [selectedHFTfirm, setselectedHFTfirm] = useState(null);
    return (
        <Autocomplete
            id="HFT Firms"
            options={hftfirms}
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

// export default function HFTSalarySlider() {
//     const [value, setValue] = useState([90000,100000]);
//     const handleChange = (event, value) => {
//         setValue(value);
//       };
//     return (
//         <Slider
//         getAriaLabel={() => 'Salary Range'}
//         value={value}
//         onChange={handleChange}
//         valueLabelDisplay="auto"
//         getAriaValueText={'Test'}
//         />
//     )
// }

export const HFTJobAutocomplete = () => {
    const [ selectedHFTfirm, setselectedHFTfirm] = useState(null);
    return (
        <Autocomplete
            id="HFT Firms"
            options={roles}
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

// export const HFTAutocomplete = (setplaceholder, setlabel) => {

//     const [selectedHFTvalue, setselectedHFTvalue] = useState(null);

    
//     return (
//         <Autocomplete
//             id="HFT Firms"
//             options={data}
//             sx = {{width:300}}
//             renderInput={(params) => (<TextField {...params} label = {setlabel}
//             placeholder = {setplaceholder} />)}
//             getOptionLabel={option => option.name}
//             value = {selectedHFTvalue}
//             onChange={(_event, newHFTfirm) => {
//                 setselectedHFTvalue(newHFTfirm);
//             }}
//         />
//     )
// }


export const Game = (props) => {
    return (
        <div className="game">
            <Stack spacing={2}>
                <h1>HFT Job Industry Database</h1>
                <h3> designed by: Brennan Eng, Ashley Yeah, Jeep Kaewla, and Sanjana Pingali</h3>
                <h3>Input Values here:</h3>
                <HFTfirmAutocomplete />
                <HFTJobAutocomplete />
                
                {/* <HFTAutocomplete setlabel = "test" setplaceholder = "testing2"></HFTAutocomplete> */}

                <Button variant='contained' sx= {{width:100}}>Submit</Button>
                <Button variant='contained' sx= {{width:100}} onClick = {SubmitGraph}>Show Graph</Button>

            </Stack>
            <Box sx={{width:300}}>
                {/* <HFTSalarySlider /> */}
                
            </Box>
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
                    <XAxis dataKey="year" />
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