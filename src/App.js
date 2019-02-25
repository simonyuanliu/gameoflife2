import React, { Component } from "react";
import Grid from "./Grid.js";
import Button from "./Button.js";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.fullName = false;
    this.rows = 20;
    this.cols = 80;
    this.speed = 1000;

    
    this.state = {
      generation: 0,
      gridArr: this.grid(),
      records: {}
      
    };
    this.continueButton = this.continueButton.bind(this);
    this.save = this.save.bind(this);
    this.stopButton = this.stopButton.bind(this)

  }
  grid = () => {
    return Array(this.rows)
      .fill()
      .map(() => Array(this.cols).fill(false));
  };

  arrayClone = (arr) => JSON.parse(JSON.stringify(arr));

  selectBox = (row, col) => {
    let gridArrCopy = this.arrayClone(this.state.gridArr);
    gridArrCopy[row][col] = !gridArrCopy[row][col];
    this.setState({
      gridArr: gridArrCopy
    });
  };

  seed = () => {
    let gridCopy = this.arrayClone(this.state.gridArr);
    for (let i = 0; i < this.rows; i += 1) {
      for (let j = 0; j < this.cols; j += 1) {
        if (Math.floor(Math.random() * 4) === 1) {
          gridCopy[i][j] = true;
        }
      }
    }
    this.setState({
      gridArr: gridCopy
    });
  };
  continueButton = (playSpeed) => {
    let speed =  playSpeed;
    if(this.state.records[this.fullName]){
      let {cols, rows, speed, saveGrid, generation} = this.state.records[this.fullName];
      this.cols = cols;
      this.rows = rows; 
      this.speed = speed;
      this.setState({
        gridArr: saveGrid,
        generation: generation
      });
    }
    console.log(this.state.records)

      this.intervalId = setInterval(this.play, speed);
    
  };

  stopButton = () => {
    clearInterval(this.intervalId);
  };

  gridSize = size => {
    switch (size) {
      case "1":
        this.cols = 20;
        this.rows = 10;
        break;
      case "2":
        this.cols = 50;
        this.rows = 25;
        break;
      default:
        this.cols = 80;
        this.rows = 25;
        break;
    }
    this.clear();
  };
  play = () => {
      let grid = this.state.gridArr;
      let gridClone = this.arrayClone(this.state.gridArr);
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
          let count = 0; // number of live neighbers
          if (i > 0) if (grid[i - 1][j]) count++;
          if (i > 0 && j > 0) if (grid[i - 1][j - 1]) count++;
          if (i > 0 && j < this.cols - 1) if (grid[i - 1][j + 1]) count++;
          if (j < this.cols - 1) if (grid[i][j + 1]) count++;
          if (j > 0) if (grid[i][j - 1]) count++;
          if (i < this.rows - 1) if (grid[i + 1][j]) count++;
          if (i < this.rows - 1 && j > 0) if (grid[i + 1][j - 1]) count++;
          if (i < this.rows - 1 && this.cols - 1) if (grid[i + 1][j + 1]) count++;
          if (grid[i][j] && (count < 2 || count > 3)) gridClone[i][j] = false;
          if (!grid[i][j] && count === 3) gridClone[i][j] = true;
        }
      }
      this.setState({
        gridArr:gridClone,
        generation: this.state.generation + 1
      }); 
  }
  newGame = () => {
    this.clear();
    this.seed();
    this.intervalId = setInterval(this.play, this.speed);
  };

  slow = () => {
    this.speed += 100;
    this.stopButton();
    this.intervalId = setInterval(this.play, this.speed);
 console.log(this.speed)
  };
  fast = () => {
    this.speed -= 100;
    this.stopButton();
    this.intervalId = setInterval(this.play, this.speed);
 console.log(this.speed)
  };
  clear = () => {
    clearInterval(this.intervalId);
    let grid = this.grid();
    this.setState({
      gridArr: grid,
      generation: 0
    });
  };

  //save user info
  save = (lastName, firstName) => {
    this.stopButton();
    let saveGrid = this.arrayClone(this.state.gridArr);
    let fullName = lastName.toLowerCase()+firstName.toLowerCase();
    this.fullName = fullName;
    let record = {rows:this.rows, cols:this.cols, speed:this.speed, saveGrid:saveGrid, generation:this.state.generation}
    let newRecords = this.state.records;
    newRecords[fullName] = record;
    this.setState({records:newRecords})
    console.log(this.state.records)
  }

  // componentDidMount() {
  //   this.seed();
  //   this.playButton();
  // }

  render() {
    return (
      <div>
         <h1><span role="img" aria-label="tree">🌴</span>The Game of Live 
         <span role="img" aria-label="monkey">🐒</span></h1>
        <Button
          continueButton={this.continueButton}
          stopButton={this.stopButton}
          slow={this.slow}
          fast={this.fast}
          seed={this.seed}
          clear={this.clear}
          gridSize={this.gridSize}
          save={this.save}
          playerList = {this.state.records}
          newGame = {this.newGame}
          speed = {this.speed}
        />
        <Grid
          gridArr={this.state.gridArr}
          rows={this.rows}
          cols={this.cols}
          selectBox={this.selectBox}
          generation={this.state.generation}
        />
        <h2>Generation: {this.state.generation}</h2>
      </div>
    );
  }
}
