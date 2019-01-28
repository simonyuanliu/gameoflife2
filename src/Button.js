import React, { Component } from 'react'
import { ButtonToolbar } from 'react-bootstrap';
export default class Button extends Component {
  render() {
    return (
      <div className = "center">
        <ButtonToolbar>
          <button className = "btn btn-primary" onClick = {this.props.playButton}>
          Play
          </button>
          <button className = "btn btn-primary" onClick = {this.props.stopButton}>
          stop
          </button>
          <button className = "btn btn-primary" onClick = {this.props.slow}>
          Slow
          </button>
          <button className = "btn btn-primary" onClick = {this.props.fast}>
          Fast
          </button>
          <button className = "btn btn-primary" onClick = {this.props.clear}>
          Clear
          </button>
          <button className = "btn btn-primary" onClick = {this.props.seed}>
          Seed
          </button>

        </ButtonToolbar>
      </div>
    )
  }
}
