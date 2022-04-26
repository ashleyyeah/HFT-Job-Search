import React from 'react';
import ReactDOM from 'react-dom';
//import Select from '@types/react-select'
import './index.css';
  
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
          <div className="game-board">
            <h1> HFT Job Database </h1>
            <h4> created by: Brennan Eng, Ashley Yeah, Jeep Kawala, Sanjana Pingali </h4>
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
  