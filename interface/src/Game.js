import React, { useState } from 'react';
//import Select from '@types/react-select'
import './index.css';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Button, Autocomplete, TextField, Stack, Slider, Box } from '@mui/material';

function FormatData(data,selectedHFTfirm){
   return data.map(([ year, average_salary ]) => ({
  year: year,
  salary: average_salary,
  selectedHFTfirm
}));
}

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


const hftfirms = [{name:'Citadel'}, {name:'jumptrading'}, {name:'jpmorgan'}]
const roles = [{name:'Trader'}, {name:'Python'}, {name:'Developer'}]
// let obj = [];
// async function getHFTFirms(){
//     const response = await fetch('http://127.0.0.1:5000/data');
//     const obj = await response.json();
//     addData(obj)
// }
// function addData(object){
//     obj.push(object)
//     console.log(data)
// }
// getHFTFirms()
// fetch('http://127.0.0.1:5000/data')
//     .then(res => res.json())
//     .then(data => obj = data)
//     .then(() => console.log(obj))

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

export const HFTfirmAutocomplete = (props) => {
    return (
        <Autocomplete
            id="HFT Firms"
            options={hftfirms}
            sx={{ width: 300 }}
            renderInput={(params) => (<TextField {...params} label="Choose HFT Firm here"
                placeholder="Arbitrary HFT Firm" />)}
            getOptionLabel={option => option.name}
            value={props.selectedHFTfirm}
            onChange={(_event, newHFTfirm) => {
                props.setselectedHFTfirm(newHFTfirm);
                console.log(newHFTfirm)
            }}
        />
    )
}

function valuetext(value) {
    return `${value}`;
}


export default function HFTSalarySlider() {
    const [value, setValue] = React.useState([70000, 100000]);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <Box sx={{ width: 300 }}>
            <Slider
                getAriaLabel={() => 'Salary Range'}
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                max = {250000}
                min = {0}
            />
        </Box>

    )
}

export const HFTJobAutocomplete = (props) => {
    const [selectedHFTJob, setselectedHFTJob] = useState(null);
    return (
        <Autocomplete
            id="HFT Firms"
            options={roles}
            sx={{ width: 300 }}
            renderInput={(params) => (<TextField {...params} label="Choose HFT Job Position here"
                placeholder="Arbitrary HFT Position" />)}
            getOptionLabel={option => option.name} // need to change option
            value={selectedHFTJob}
            onChange={(_event, newHFTJob) => {
                setselectedHFTJob(newHFTJob);
            }}
        />
    )
}

export const HFTLocationAutcomplete = () => {
    // const [selectedHFTLocation, setselectedHFTLocation] = useState(null);
    return(
        <Autocomplete
        multiple
        sx = {{width:300}}
        id = "locations"
        options={data}
        getOptionLabel={(option) => option.title}
        renderInput={(params) =>(
            <TextField
            {...params}
            label="HFT Location"
            placeholder = "Arbitrary HFT Location"
            />
        )}
        // value={selectedHFTLocation}
        // onChange={(_event, newHFTLocation) => {
        //     setselectedHFTLocation(newHFTLocation);
        // }}
        />
    );
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
//             value = {selectedHFTfirm}
//             onChange={(_event, newHFTfirm) => {
//                 setselectedHFTfirm(newHFTfirm);
//             }}
//         />
//     )
// }

export const Game = (props) => {
    const [compjob,setCompjob] = useState(null);
    const [selectedHFTfirm, setselectedHFTfirm] = useState(null);

    const submitGraph = ()=>{
        fetch('http://localhost:5000/jobanalysis', {selectedHFTfirm}).then(response=> { console.log(response); return response.json()}).then(data => {setCompjob(FormatData(data,selectedHFTfirm)); 
                console.log(data)})
    }

    console.log("cc", compjob)

    return (
        <div className="game">
            <Stack spacing={2}>
                <h1>HFT Job Industry Database</h1>
                <h3> designed by: Brennan Eng, Ashley Yeah, Jeep Kaewala, and Sanjana Pingali</h3>
                <h3>Input Values here:</h3>
                <HFTfirmAutocomplete selectedHFTfirm={selectedHFTfirm} setselectedHFTfirm={setselectedHFTfirm} />
                <HFTJobAutocomplete />

                {/* <HFTAutocomplete setlabel = "test" setplaceholder = "testing2"/> */}
                <h4>Change Salary Range here:</h4>
                <HFTSalarySlider />
                <HFTLocationAutcomplete />
                <Button variant='contained' sx={{ width: 100 }}>Submit</Button>
                <Button variant='contained' sx= {{width:100}} onClick = {submitGraph}>Show Graph</Button>
            </Stack>
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
                    <YAxis label={{ value: 'Salary for Data Analyst ($)', angle: -90, position: 'insideLeft' }} />

                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="salary" stroke="#8884d8" activeDot={{ r: 8 }} name={selectedHFTfirm?.['name']} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};