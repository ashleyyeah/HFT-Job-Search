import React, { useState, useEffect } from "react";
import ReactTestUtils from 'react-dom/test-utils'; // ES6
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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
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
// const cities = [
//   { name: "Virginia" },
//   { name: "New York" },
//   { name: "Chicago" },
//   { name: "" },
// ];

// const states = [{ name: "MA" }, { name: "NY" }, { name: "IL" }, { name: "" }];

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
          placeholder="ex. C++"
        />
      )}
      getOptionLabel={(option) => option.name} // need to change option
      value={props.selectedHFTSkill}
      onChange={(_event, newHFTSkill) => {
        props.setselectedHFTSkill(newHFTSkill);
      }}
      loading={true}
    />
  );
};

export const HFTSkillAutocomplete1 = (props) => {
  return (
    <Autocomplete
      id="Skill1"
      options={props.skillNames}
      sx={{ width: 300 }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Choose Skill 2"
          placeholder="ex. PYTHON"
        />
      )}
      getOptionLabel={(option) => option.name} // need to change option
      value={props.selectedHFTSkill1}
      onChange={(_event, newHFTSkill1) => {
        props.setselectedHFTSkill1(newHFTSkill1);
      }}
      loading={true}
    />
  );
};

export const DenseTable = (props) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Firm</TableCell>
            <TableCell align="right">Year</TableCell>
            <TableCell align="right">Role</TableCell>
            <TableCell align="right">City</TableCell>
            <TableCell align="right">State</TableCell>
            <TableCell align="right">Min Salary</TableCell>
            <TableCell align="right">Max Salary</TableCell>
            <TableCell align="right">Skills</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
         {props.displayTable.map((row) => (
          <TableRow
           key={row.company_name}
           sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
         >
           <TableCell component="th" scope="row">
             {row.company_name}
           </TableCell>
           <TableCell align="right">{row.year}</TableCell>
           <TableCell align="right">{row.role}</TableCell>
           <TableCell align="right">{row.city}</TableCell>
           <TableCell align="right">{row.state}</TableCell>
           <TableCell align="right">{row.min_salary}</TableCell>
           <TableCell align="right">{row.max_salary}</TableCell>
           <TableCell align="right">{row.skills}</TableCell>
         </TableRow>
         ))}
       </TableBody>
      </Table>
    </TableContainer>
  );
}

export const Game = (props) => {
  const [selectedHFTfirm, setselectedHFTfirm] = useState(null);
  const [selectedHFTJob, setselectedHFTJob] = useState(null);
  const [selectedHFTSkill, setselectedHFTSkill] = useState(null);
  const [selectedHFTSkill1, setselectedHFTSkill1] = useState(null);
  const [selectedHFTLocation, setSelectedHFTLocation] = useState(null);

  const [showGraphCompRole, setShowGraphCompRole] = useState(false);
  const [showGraphRole, setShowGraphRole] = useState(false);
  const [showGraphSkill, setShowGraphSkill] = useState(false);
  const [showTable, setShowTable] = useState(false);

  const [compNames, setCompNames] = useState([]);
  const [roleNames, setRoleNames] = useState([]);
  const [skillNames, setSkillNames] = useState([]);
  const [locationNames, setLocationNames] = useState([]);

  const [compjob, setCompjob] = useState(null);
  const [job, setJob] = useState(null);
  const [skill, setSkill] = useState(null);
  const [skill1, setSkill1] = useState(null);
  const [displayTable, setDisplayTable] = useState(null);
  const [value, setValue] = useState([0, 250000]);

  useEffect(() => {
    fetch("http://localhost:5000/companies")
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        setCompNames(data);
        console.log(data);
      });
  }, []);

  useEffect(() => {
    fetch(
      "http://localhost:5000/comp_roles?" +
        new URLSearchParams({
          selectedHFTfirm: "",
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
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/skills")
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        setSkillNames(data);
        console.log(data);
      });
  }, []);

  useEffect(() => {
    fetch(
      "http://localhost:5000/locations?" +
        new URLSearchParams({
          selectedHFTfirm: "",
          selectedHFTJob: "",
        })
    )
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        setLocationNames(data);
        console.log(data);
      });
  }, []);

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
        setShowTable(false);
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
        setShowTable(false);
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
        setShowTable(false);
        setShowGraphSkill(true);
        console.log(data);
      });
  };

  const getRoleNames = (newHFTfirm) => {
    fetch(
      "http://localhost:5000/comp_roles?" +
        new URLSearchParams({
          selectedHFTfirm: newHFTfirm === null ? "" : newHFTfirm.name,
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

  const getLocationNames = (newHFTfirm, newHFTJob) => {
    fetch(
      "http://localhost:5000/locations?" +
        new URLSearchParams({
          selectedHFTfirm: newHFTfirm === null ? "" : newHFTfirm.name,
          selectedHFTJob: newHFTJob === null ? "" : newHFTJob.name,
        })
    )
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        setLocationNames(data);
        console.log(data);
      });
  };
  console.log("test", selectedHFTfirm);

  const submitGraphSkill1 = () => {
    console.log("here");
    fetch(
      "http://localhost:5000/costperskill1?" +
        new URLSearchParams({
          selectedHFTSkill1:
            selectedHFTSkill1.name === null
              ? ""
              : selectedHFTSkill1.name,
        })
    )
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        setSkill1(FormatData(data));
        console.log("skill1", skill1);
        setShowGraphCompRole(false);
        setShowGraphRole(false);
        setShowTable(false);
        setShowGraphSkill(true);
      });
  };

  const submit = () => {
    if (selectedHFTfirm !== null || selectedHFTJob !== null) {
      fetch(
        "http://localhost:5000/submit?" +
          new URLSearchParams({
            selectedHFTfirm: selectedHFTfirm === null ? "" : selectedHFTfirm.name,
            selectedHFTJob: selectedHFTJob === null ? "" : selectedHFTJob.name,
            selectedHFTLocation:
              selectedHFTLocation === null ? "" : selectedHFTLocation.name,
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
          setShowTable(true);
          setShowGraphCompRole(false);
          setShowGraphRole(false);
          setShowGraphSkill(false);
          console.log(data);
        });
    }
  };

  console.log("cc", displayTable);

  return (
    <div className="game" data-testid = 'game'>
      <Stack spacing={2}>
        <h1>HFT Job Industry Database</h1>
        <h3>
          {" "}
          designed by: Brennan Eng, Ashley Yeah, Jeep Kaewla, and Sanjana
          Pingali
        </h3>
        <h3>Input Values here:</h3>
        {/* Companies Autocomplete */}
        <div data-testid = "firm_selection"> </div>
        <Autocomplete
          id="HFT Firms"
          options={compNames}
          sx={{ width: 300 }}
          value={selectedHFTfirm}
          onChange={(_event, newHFTfirm) => {
            setselectedHFTfirm(newHFTfirm);
            getRoleNames(newHFTfirm);
            getLocationNames(newHFTfirm, selectedHFTJob);
            console.log(newHFTfirm);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Choose Firm Here"
              placeholder="ex. CITADEL"
            />
          )}
          getOptionLabel={(option) => option.name}
          loading={true}
        />
        {/* Roles Autocomplete */}
        <Autocomplete
          id="HFT Roles"
          options={roleNames}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Choose Job Position Here"
              placeholder="ex. QUANTITATIVE ANALYST"
            />
          )}
          getOptionLabel={(option) => option.name} // need to change option
          value={selectedHFTJob}
          onChange={(_event, newHFTJob) => {
            setselectedHFTJob(newHFTJob);
            getRoleNames(selectedHFTfirm);
            getLocationNames(selectedHFTfirm, newHFTJob);
          }}
          loading={true}
        />
        {/* Locations Autocomplete */}
        <Autocomplete
          id="HFT Locations"
          sx={{ width: 300 }}
          options={locationNames}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Choose Location Here"
              placeholder="ex. CHICAGO, IL"
            />
          )}
          value={selectedHFTLocation}
          onChange={(_event, newHFTLocation) => {
            setSelectedHFTLocation(newHFTLocation);
          }}
          loading={true}
        />
        {/* <HFTAutocomplete setlabel = "test" setplaceholder = "testing2"/> */}
        <h4>Change Salary Range here:</h4>
        <HFTSalarySlider value={value} setValue={setValue} />
        {/* <HFTLocationAutcomplete /> */}
        <Button variant="contained" sx={{ width: 100 }} onClick={submit}>
          Submit
        </Button>
        <Button variant="contained" sx={{ width: 200 }} onClick={submitGraph}>
          Comp-Role Graph
        </Button>
        <Button
          variant="contained"
          sx={{ width: 200 }}
          onClick={submitGraphRole}
        >
          Role Graph
        </Button>
        <h3>Skill Value: </h3>
        {/* Skills Autocomplete */}
        <HFTSkillAutocomplete
          skillNames={skillNames}
          selectedHFTSkill={selectedHFTSkill}
          setselectedHFTSkill={setselectedHFTSkill}
        />
        <p>For comparing 2 skills, choose skill 2 here:</p>
        <div data-testid="Skill-1">
        <HFTSkillAutocomplete1
          skillNames={skillNames}
          selectedHFTSkill1={selectedHFTSkill1}
          setselectedHFTSkill1={setselectedHFTSkill1}
        />
        </div>
       
        <Button
          variant="contained"
          sx={{ width: 200 }}
          onClick={() => {
            submitGraphSkill();
            submitGraphSkill1();
          }}
        >
          Compare SKill
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
                dy: 170,
                dx: -20,
              }}
              // type="number"
              domain={[ dataMin => (Math.floor(parseInt(dataMin * 0.5)/1000)*1000), (dataMax) => (Math.ceil(parseInt(dataMax *1.45)/1000)*1000) ]} 
              interval = "preserveEnd"
              tickCount = {6}
            />

            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="salary"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
              name={
                selectedHFTJob?.["name"] +
                " roles at " +
                selectedHFTfirm?.["name"]
              }
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
                dy: 150,
                dx: -20,
              }}
              domain={[ dataMin => (Math.floor(parseInt(dataMin * 0.5)/1000)*1000), (dataMax) => (Math.ceil(parseInt(dataMax *1.45)/1000)*1000) ]} 
              interval = "preserveEnd"
              tickCount = {6}
            />

            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="salary"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
              name={selectedHFTJob?.["name"] + " role across all companies"}
            />
          </LineChart>
        </ResponsiveContainer>
      )}

      {showGraphSkill && (
        <ResponsiveContainer width="50%" aspect={1}>
          <LineChart
            width={500}
            height={300}
            margin={{
              top: 100,
              right: 0,
              left: 150,
              bottom: 100,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              xAxisId={"first"}
              hide={typeof selectedHFTSkill?.name == "undefined" ? true : false}
              dataKey="year"
            />
            <XAxis
              xAxisId={"sec"}
              hide={typeof selectedHFTSkill?.name == "undefined" ? false : true}
              dataKey="year"
            />
            <YAxis
              label={{
                value: "Salary ($)",
                angle: -90,
                position: "insideLeft",
                dy: 30,
                dx: -20,
              }}
              domain={[ dataMin => (Math.floor(parseInt(dataMin * 0.5)/1000)*1000), (dataMax) => (Math.ceil(parseInt(dataMax *1.45)/1000)*1000) ]} 
              interval = "preserveEnd"
              tickCount = {6}
            />

            <Tooltip />
            <Legend />
            {typeof selectedHFTSkill?.name != "undefined" ? (
              <Line
                data={skill}
                type="monotone"
                dataKey="salary"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
                name={selectedHFTSkill?.["name"] + " roles"}
                xAxisId={"first"}
              />
            ) : (
              ""
            )}
            
            {typeof selectedHFTSkill1?.name != "undefined" ? (
              <Line
                data={skill1}
                type="monotone"
                dataKey="salary"
                stroke="#d264d8"
                activeDot={{ r: 8 }}
                name={selectedHFTSkill1?.["name"] + " roles"}
                xAxisId={"sec"}
              />
            ) : (
              ""
            )}
            {typeof selectedHFTSkill1?.name == "undefined" && typeof selectedHFTSkill?.name == "undefined" ? 
            setShowGraphSkill(false): ''}
          </LineChart>
        </ResponsiveContainer>
      )}
      {showTable && (
        <ResponsiveContainer width="75%" aspect={1} >
          <DenseTable displayTable={displayTable} />
        </ResponsiveContainer>
      )}
    </div>
  );
};

// // testing
// it("renders an h1", function () {
//   var component = TestUtils.renderIntoDocument(
//       <MyComponent />
//   );

//   var h1 = TestUtils.findRenderedDOMComponentWithTag(
//      component, 'h1'
//   );

//   expect(h1.getDOMNode().textContent)
//       .toEqual("A title");
// });

