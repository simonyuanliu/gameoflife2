import React, { Component } from 'react'
import Box from './Box.js';
export default class Grid extends Component {
  render() {
    const width = this.props.cols * 14;
    let rowsArr = [];
    let boxClass = '';
    for (let i = 0; i < this.props.rows; i++){
      for (let j = 0; j < this.props.cols; j++){
        let boxId = `${i}_${j}`;
        boxClass = this.props.gridArr[i][j] ? "box on" : "box off";
        rowsArr.push(
          <Box 
            boxClass = {boxClass}
            key = {boxId}
            boxId = {boxId}
            row = {i}
            col = {j}
            selectBox = {this.props.selectBox}
            generation = {this.props.generation}
          />
        )
      }
    }

    return (
      <div className = "grid" style = {{width}}>
        {rowsArr}
      </div>
    )
  }
}
