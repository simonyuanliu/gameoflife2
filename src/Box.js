import React, { Component } from 'react'

export default class Box extends Component {
  selectBox = () => {
    this.props.selectBox(this.props.row, this.props.col)
  }
  render() {
    if(this.props.boxClass === "box off"){
      return (
        <div 
        className = {this.props.boxClass}
        id = {this.props.boxId}
        onClick = {this.selectBox}
        >  <span>🌴</span>
        </div>
      )
    }else {
      return (
        <div 
        className = {this.props.boxClass}
        id = {this.props.boxId}
        onClick = {this.selectBox}
        >  <span>🐒</span>
        </div>
      )
    }
  }
}

