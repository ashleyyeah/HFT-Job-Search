import React, { useState } from "react";
//import Select from '@types/react-select'
import "./index.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Button,
  Autocomplete,
  TextField,
  Stack,
  Slider,
  Box,
} from "@mui/material";

function FormatData(data, selectedHFTfirm) {
  return data.map(([year, average_salary]) => ({
    year: year,
    salary: average_salary,
    selectedHFTfirm,
  }));
}


const data = [
  {
    name: "2017",
    JPMORGAN: 10000,
    JUMP: 14000,
  },
  {
    name: "2018",
    JPMORGAN: 30000,
    JUMP: 31980,
  },
  {
    name: "2019",
    JPMORGAN: 35000,
    JUMP: 36000,
  },
  {
    name: "2020",
    JPMORGAN: 38800,
    JUMP: 37080,
  },
  {
    name: "2021",
    JPMORGAN: 39900,
    JUMP: 37500,
  },
];

const hftfirms = [{ name: "Citadel" }, { name: "JUMP" }, { name: "jpmorgan" }];
const roles = [
  { name: "Trader" },
  { name: "Python" },
  { name: "Developer" },
  { name: "Portfolio" },
];
const skills = [
  { name: "Python" },
  { name: " C " },
  { name: "C++" },
  { name: "API" },
];
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

//const hftfirms_str = ['citadel', 'jumptrading', 'jpmorgan'];

export const Board = (props) => {
  const [value, setValue] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = (event) => {
    alert("A name was submitted: " + value);
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <input
          type="text"
          className="advancedSearchTextBox"
          value={value}
          onChange={handleChange}
        />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
};

export const HFTfirmAutocomplete = (props) => {
  return (
    <Autocomplete
      id="HFT Firms"
      options={hftfirms}
      sx={{ width: 300 }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Choose HFT Firm here"
          placeholder="Arbitrary HFT Firm"
        />
      )}
      getOptionLabel={(option) => option.name}
      value={props.selectedHFTfirm}
      onChange={(_event, newHFTfirm) => {
        props.setselectedHFTfirm(newHFTfirm);
        console.log(newHFTfirm);
      }}
    />
  );
};

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
        getAriaLabel={() => "Salary Range"}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        max={250000}
        min={0}
      />
    </Box>
  );
}

export const HFTJobAutocomplete = (props) => {
  return (
    <Autocomplete
      id="HFT Firms"
      options={roles}
      sx={{ width: 300 }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Choose HFT Job Position here"
          placeholder="Arbitrary HFT Position"
        />
      )}
      getOptionLabel={(option) => option.name} // need to change option
      value={props.selectedHFTJob}
      onChange={(_event, newHFTJob) => {
        props.setselectedHFTJob(newHFTJob);
      }}
    />
  );
};

export const HFTLocationAutcomplete = () => {
  // const [selectedHFTLocation, setselectedHFTLocation] = useState(null);
  return (
    <Autocomplete
      multiple
      sx={{ width: 300 }}
      id="locations"
      options={data}
      getOptionLabel={(option) => option.title}
      renderInput={(params) => (
        <TextField
          {...params}
          label="HFT Location"
          placeholder="Arbitrary HFT Location"
        />
      )}
      // value={selectedHFTLocation}
      // onChange={(_event, newHFTLocation) => {
      //     setselectedHFTLocation(newHFTLocation);
      // }}
    />
  );
};

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
export const HFTSkillAutocomplete = (props) => {
  return (
    <Autocomplete
      id="Skill"
      options={skills}
      sx={{ width: 300 }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Choose Skill Here"
          placeholder="Arbitrary HFT Position"
        />
      )}
      getOptionLabel={(option) => option.name} // need to change option
      value={props.selectedHFTSkill}
      onChange={(_event, newHFTSkill) => {
        props.setselectedHFTSkill(newHFTSkill);
      }}
    />
  );
};

export const Game = (props) => {
  const [compjob, setCompjob] = useState(null);
  const [job, setJob] = useState(null);
  const [skill, setSkill] = useState(null);
  const [selectedHFTfirm, setselectedHFTfirm] = useState(null);
  const [selectedHFTJob, setselectedHFTJob] = useState(null);
  const [selectedHFTSkill, setselectedHFTSkill] = useState(null);
  const [showGraphCompRole, setShowGraphCompRole] = useState(false);
  const [showGraphRole, setShowGrapRole] = useState(false);
  const [showGraphSkill, setShowGraphSkill] = useState(false);

  const submitGraph = () => {
    fetch(
      "http://localhost:5000/compjobanalysis?" +
        new URLSearchParams({
          selectedHFTfirm: selectedHFTfirm.name,
          selectedHFTJob: selectedHFTJob.name,
        })
    )
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        setCompjob(FormatData(data, selectedHFTfirm));
        setShowGraphCompRole(true);
        setShowGrapRole(false);
        setShowGraphSkill(false);
        console.log(data);
      });
  };

  const submitGraphRole = () => {
    fetch(
      "http://localhost:5000/jobanalysis?" +
        new URLSearchParams({
          selectedHFTJob: selectedHFTJob.name,
        })
    )
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        setJob(FormatData(data));
        setShowGraphCompRole(false);
        setShowGrapRole(true);
        setShowGraphSkill(false);
        console.log(data);
      });
  };

  const submitGraphSkill = () => {
    fetch(
      "http://localhost:5000/costperskill?" +
        new URLSearchParams({
          selectedHFTSkill: selectedHFTSkill.name,
        }) 
    )
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        setSkill(FormatData(data, selectedHFTSkill));
        setShowGraphCompRole(false);
        setShowGrapRole(false);
        setShowGraphSkill(true);
        console.log(data);
      });
  };
  console.log("cc", compjob);

  return (
    <div className="game">
      <Stack spacing={2}>
        <h1>HFT Job Industry Database</h1>
        <h3>
          {" "}
          designed by: Brennan Eng, Ashley Yeah, Jeep Kaewla, and Sanjana
          Pingali
        </h3>
        <h3>Input Values here:</h3>
        <HFTfirmAutocomplete
          selectedHFTfirm={selectedHFTfirm}
          setselectedHFTfirm={setselectedHFTfirm}
        />
        <HFTJobAutocomplete
          selectedHFTJob={selectedHFTJob}
          setselectedHFTJob={setselectedHFTJob}
        />
        <HFTSkillAutocomplete
          selectedHFTSkill={selectedHFTSkill}
          setselectedHFTSkill={setselectedHFTSkill}
        />

        {/* <HFTAutocomplete setlabel = "test" setplaceholder = "testing2"/> */}
        <h4>Change Salary Range here:</h4>
        <HFTSalarySlider />
        <HFTLocationAutcomplete />
        <Button variant="contained" sx={{ width: 100 }}>
          Submit
        </Button>
          
        <Button variant="contained" sx={{ width: 200 }} onClick={submitGraph}>
          Comp-Role Graph
        </Button>
        <Button variant="contained" sx={{ width: 200 }} onClick={submitGraphRole}>
          Role Graph
        </Button>
        <Button variant="contained" sx={{ width: 200 }} onClick={submitGraphSkill}>
          Skill Trend
        </Button>
          
      </Stack>
      {showGraphCompRole && (
        <ResponsiveContainer width="50%" aspect={1}>
          <LineChart
            width={500}
            height={300}
            data={compjob}
            margin={{
              top: 100,
              right: 0,
              left: 150,
              bottom: 100,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis
              label={{
                value: "Salary for " + selectedHFTJob?.["name"] + " role ($)",
                angle: -90,
                position: "insideLeft",
                dy: 100,
                dx: - 20
              }}
            />

            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="salary"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
              name={selectedHFTJob?.["name"] +' roles at '+selectedHFTfirm?.["name"]}
            />
          </LineChart>
        </ResponsiveContainer>

    
      )}

{showGraphRole && (
    <ResponsiveContainer width="50%" aspect={1}>
      <LineChart
        width={500}
        height={300}
        data={job}
        margin={{
          top: 100,
          right: 0,
          left: 150,
          bottom: 100,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis
          label={{
            value: "Salary for " + selectedHFTJob?.["name"] + " role ($)",
            angle: -90,
            position: "insideLeft",
            dy: 100,
            dx: - 20
          }}
        />

        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="salary"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
          name={selectedHFTJob?.["name"] +' role across all companies'}
        />
      </LineChart>
    </ResponsiveContainer>
    )}

{showGraphSkill && (
        <ResponsiveContainer width="50%" aspect={1}>
          <LineChart
            width={500}
            height={300}
            data={skill}
            margin={{
              top: 100,
              right: 0,
              left: 150,
              bottom: 100,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis
              label={{
                value: "Salary for " + selectedHFTSkill?.["name"] + "related roles ($)",
                angle: -90,
                position: "insideLeft",
                dy: 100,
                dx: - 20
              }}
            />

            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="salary"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
              name={selectedHFTSkill?.["name"] +' roles'}
            />
          </LineChart>
        </ResponsiveContainer>

    
      )}
    </div>
  );
};
