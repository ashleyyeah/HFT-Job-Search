import React from 'react';
import ReactDOM from 'react-dom';
//import Select from '@types/react-select'
import './index.css';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

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
  
  class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
      handleChange(event) {
        this.setState({value: event.target.value});
      }
    
      handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
      }
  
    render() {
      
      return (
        <form onSubmit={this.handleSubmit}>
        <label>
          <input type="text" class="advancedSearchTextBox" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
        </form>
      );
    }
  }
  
  class Game extends React.Component {
    render() {
      return (
        <div className="game">
          <ResponsiveContainer width="50%" height="100%">
          <div className="game-board">
            <h1> HFT Job Database </h1>
            <h4> created by: Brennan Eng, Ashley Yeah, Jeep Kaewla, Sanjana Pingali </h4>
            Input HFT firm: <Board />
            <div></div>
            Positions available: <Board />
            <div/>
            <h3> Salary Range </h3>
            From: <Board />
            <div></div>
            To: <Board />
            <div/>
            Skills: <Board />
            Location: <Board />
          </div> 
          </ResponsiveContainer>
  <ResponsiveContainer width="50%" aspect={1}>
    <LineChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 100,
        right:70,
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
    }
  }
  //test
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  