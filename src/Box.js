import React, { Component } from 'react'

export default class Box extends Component {
  selectBox = () => {
    this.props.selectBox(this.props.row, this.props.col)
  }
  changeIcon = ()=>{
    let icon;
    if(this.props.boxClass === "box off"){
      icon =(<span role="img" aria-label="tree">🌴</span>);
    }else{
      icon =(<span role="img" aria-label="tree">🐒</span>);
      if(this.props.generation >= 100){
      icon = (<span role="img" aria-label="monkey">🤖</span>);
      }else if(this.props.generation >=50){
        icon =(<span role="img" aria-label="monkey">👨‍🌾</span>);
      }
    }
    return icon;
  }
  render() {
    
      return (
        <div 
        className = {this.props.boxClass}
        id = {this.props.boxId}
        onClick = {this.selectBox}
        >  {this.changeIcon()}
        </div>
      )
      }
}

