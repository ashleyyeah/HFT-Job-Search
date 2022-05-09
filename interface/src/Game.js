import React, { useState, useEffect } from "react";
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

// const hftfirms = [{ name: "Citadel" }, { name: "JUMP" }, { name: "jpmorgan" }];
// const roles = [
//   { name: "Trader" },
//   { name: "Python" },
//   { name: "Developer" },
//   { name: "Portfolio" },
// ];
// const skills = [
//   { name: "Python" },
//   { name: " C " },
//   { name: "C++" },
//   { name: "API" },
// ];
const cities = [
  { name: "Virginia" },
  { name: "New York" },
  { name: "Chicago" },
  { name: ""},
];

const states = [
  { name: "MA" },
  { name: "NY" },
  { name: "IL" },
  { name: ""},
];

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

// export const HFTfirmAutocomplete = (props) => {
//   return (
//     <Autocomplete
//       id="HFT Firms"
//       options={compNames}
//       sx={{ width: 300 }}
//       renderInput={(params) => (
//         <TextField
//           {...params}
//           label="Choose HFT Firm here"
//           placeholder="Arbitrary HFT Firm"
//         />
//       )}
//       getOptionLabel={(option) => option.name}
//       value={props.selectedHFTfirm}
//       onChange={(_event, newHFTfirm) => {
//         props.setselectedHFTfirm(newHFTfirm);
//         console.log(newHFTfirm);
//       }}
//     />
//   );
// };

function valuetext(value) {
  return `${value}`;
}

export default function HFTSalarySlider(props) {
  //const [value, setValue] = React.useState([70000, 100000]);
  const handleChange = (event, newValue) => {
    props.setValue(newValue);
  };
  return (
    <Box sx={{ width: 300 }}>
      <Slider
        getAriaLabel={() => "Salary Range"}
        value={props.value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        max={250000}
        min={0}
      />
    </Box>
  );
}

// export const HFTJobAutocomplete = (props) => {
//   return (
//     <Autocomplete
//       id="HFT Firms"
//       options={roleNames}
//       sx={{ width: 300 }}
//       renderInput={(params) => (
//         <TextField
//           {...params}
//           label="Choose HFT Job Position here"
//           placeholder="Arbitrary HFT Position"
//         />
//       )}
//       getOptionLabel={(option) => option.name} // need to change option
//       value={props.selectedHFTJob}
//       onChange={(_event, newHFTJob) => {
//         props.setselectedHFTJob(newHFTJob);
//       }}
//     />
//   );
// };

// export const HFTLocationAutcomplete = () => {
//   // const [selectedHFTLocation, setselectedHFTLocation] = useState(null);
//   return (
//     <Autocomplete
//       multiple
//       sx={{ width: 300 }}
//       id="locations"
//       options={data}
//       getOptionLabel={(option) => option.title}
//       renderInput={(params) => (
//         <TextField
//           {...params}
//           label="HFT Location"
//           placeholder="Arbitrary HFT Location"
//         />
//       )}
//       // value={selectedHFTLocation}
//       // onChange={(_event, newHFTLocation) => {
//       //     setselectedHFTLocation(newHFTLocation);
//       // }}
//     />
//   );
// };

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
      options={props.skillNames}
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

export const HFTCityAutocomplete = (props) => {
  return (
    <Autocomplete
      id="HFT City"
      options={cities}
      sx={{ width: 300 }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="city"
          placeholder="Arbitrary HFT city"
        />
      )}
      getOptionLabel={(option) => option.name} // need to change option
      value={props.selectedHFTCity}
      onChange={(_event, newHFTCity) => {
        props.setselectedHFTCity(newHFTCity);
      }}
      defaultValue={''}
    />
  );
};

export const HFTStateAutocomplete = (props) => {
  return (
    <Autocomplete
      id="HFT State"
      options={states}
      sx={{ width: 300 }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="state"
          placeholder="Arbitrary HFT state"
        />
      )}
      getOptionLabel={(option) => option.name}
      // need to change option
      value={props.selectedHFTState}
      onChange={(_event, newHFTState) => {
        props.setselectedHFTState(newHFTState);
      }}
      defaultValue={''}
    />
  );
};

export const Game = (props) => {
  const [compjob, setCompjob] = useState(null);
  const [job, setJob] = useState(null);
  const [skill, setSkill] = useState(null);
  const [selectedHFTfirm, setselectedHFTfirm] = useState('');
  const [selectedHFTJob, setselectedHFTJob] = useState('');
  const [selectedHFTSkill, setselectedHFTSkill] = useState('');
  const [showGraphCompRole, setShowGraphCompRole] = useState(false);
  const [showGraphRole, setShowGraphRole] = useState(false);
  const [showGraphSkill, setShowGraphSkill] = useState(false);
  const [compNames, setCompNames] = useState([]);
  const [roleNames, setRoleNames] = useState([]);
  const [skillNames, setSkillNames] = useState([]);
  const [selectedHFTCity, setselectedHFTCity] = useState('');
  const [selectedHFTState, setselectedHFTState] = useState('');
  const [displayTable, setDisplayTable] = useState(null);
  const [showTable, setShowTable] = useState(false);
  const [value, setValue] = useState([0, 250000]);

  useEffect(() => {
    fetch(
      "http://localhost:5000/companies"
    )
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((data) => {
      setCompNames(data);
      console.log(data);
    });
  },[])

  useEffect(() => {
    fetch(
      "http://localhost:5000/comp_roles?" +
        new URLSearchParams({
          selectedHFTfirm: ''
        })
    )
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        setRoleNames(data);
        console.log(data);
      });
  }, [])

  useEffect(() => {
    fetch(
      "http://localhost:5000/skills"
    )
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((data) => {
      setSkillNames(data);
      console.log(data);
    });
  },[])

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
        setShowGraphRole(false);
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
        setShowGraphRole(true);
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
        setShowGraphRole(false);
        setShowGraphSkill(true);
        console.log(data);
      });
  };

  const getRoleNames = (newHFTfirm) => {
    fetch(
      "http://localhost:5000/comp_roles?" +
        new URLSearchParams({
          selectedHFTfirm: newHFTfirm.name
        })
    )
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        setRoleNames(data);
        console.log(data);
      });
  };
  console.log('test', selectedHFTfirm)
  const submit = () => {
    fetch(
      "http://localhost:5000/submit?" +
        new URLSearchParams({
          selectedHFTSkill: selectedHFTSkill.name,
          selectedHFTfirm: typeof(selectedHFTfirm.name)==undefined? '':selectedHFTfirm.name,
          selectedHFTJob: selectedHFTJob.name,
          selectedHFTCity: selectedHFTCity.name,
          selectedHFTState: selectedHFTState.name,
          min_salary: value[0],
          max_salary: value[1],
        }) 
    )
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        setDisplayTable(data);
        setShowTable(true)
        setShowGraphCompRole(false);
        setShowGraphRole(false);
        setShowGraphSkill(false);
        console.log(data);
      });
  };

  console.log("cc", displayTable);

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
        <Autocomplete
          value={selectedHFTfirm}
          onChange={(event, newHFTfirm) => {
            setselectedHFTfirm(newHFTfirm);
            getRoleNames(newHFTfirm);
            console.log(newHFTfirm);
          }}
          id="HFT Firms"
          options={compNames}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Choose HFT Firm here"
              placeholder="Arbitrary HFT Firm"
            />
          )}
          getOptionLabel={(option) => option.name}
        />
        <Autocomplete
          id="HFT Roles"
          options={roleNames}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Choose HFT Job Position here"
              placeholder="Arbitrary HFT Position"
            />
          )}
          getOptionLabel={(option) => option.name} // need to change option
          value={selectedHFTJob}
          onChange={(_event, newHFTJob) => {
            setselectedHFTJob(newHFTJob);
          }}
        />
        <HFTSkillAutocomplete
          skillNames={skillNames}
          selectedHFTSkill={selectedHFTSkill}
          setselectedHFTSkill={setselectedHFTSkill}
        />

        <HFTCityAutocomplete 
          selectedHFTCity={selectedHFTCity} 
          setselectedHFTCity={setselectedHFTCity}
        />
        <HFTStateAutocomplete
          selectedHFTState={selectedHFTState} 
          setselectedHFTState={setselectedHFTState}
        />
        {/* <HFTAutocomplete setlabel = "test" setplaceholder = "testing2"/> */}
        <h4>Change Salary Range here:</h4>
        <HFTSalarySlider  value={value} setValue={setValue}/>
        {/* <HFTLocationAutcomplete /> */}
        <Button variant="contained" sx={{ width: 100 }} onClick={submit}>
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
