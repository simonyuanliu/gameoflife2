import React, { Component } from 'react';
import Grid from './Grid.js';
import Button from './Button.js';

export default class App extends Component {
  constructor(){
    super();
    this.rows = 20;
    this.cols = 80;
    this.speed = 200;
    this.state = {
      generation:0,
      gridArr: Array(this.rows).fill().map(()=>Array(this.cols).fill(false))
    }
  }
  arrayClone = (arr) => {
    return JSON.parse(JSON.stringify(arr));
  }
  
  selectBox = (row, col) => {
    let gridArrCopy = this.arrayClone(this.state.gridArr);
    gridArrCopy[row][col] = !gridArrCopy[row][col];
    
    this.setState({
      gridArr: gridArrCopy
    })
  }
  seed = ()=> {
    let gridCopy = this.arrayClone(this.state.gridArr);
      for (let i = 0; i < this.rows; i++){
        for (let j = 0; j < this.cols; j++){
          if(Math.floor(Math.random()* 4) === 1){
            gridCopy[i][j]= true;
          }
        }
      }
      this.setState({
        gridArr: gridCopy
      });
  }
  playButton = () => {
    clearInterval(this.intervalId);
    this.intervalId = setInterval(this.play, this.speed);
  }
  stopButton = () => {
    clearInterval(this.intervalId);
  }
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
      gridArr: gridClone,
      generation: this.state.generation + 1
    });
  }
  slow = () => {
    this.speed += 100;
    this.playButton();
  }
  fast = () => {
    this.speed -= 100;
    this.playButton();
  }
  clear = () => {
    clearInterval(this.intervalId);
    let grid = Array(this.rows).fill().map(()=>Array(this.cols).fill(false))
    this.setState({gridArr:grid})
    this.state.generation = 0;

  }
  componentDidMount(){
    this.seed();
    this.playButton();
  }
  render() {
    return (
      <div>
        <h1>🌴The Game of Live🐒</h1>
        <Button 
         playButton = {this.playButton}
         stopButton = {this.stopButton}
         slow = {this.slow}
         fast = {this.fast}
         seed = {this.seed}
         clear = {this.clear}
        />
        <Grid 
          gridArr = {this.state.gridArr}
          rows = {this.rows}
          cols ={this.cols}
          selectBox = {this.selectBox}
        />
        <h2>Generation: {this.state.generation}</h2>
      </div>
    )
  }
}
