import React, { Component } from "react";
import { ButtonToolbar, MenuItem, DropdownButton } from "react-bootstrap";

export default class Button extends Component {
  constructor(props){
    super(props)
    this.firstName = 0;
    this.lastName = 0;
    this.state = {
			firstName:'',
      lastName:''
		};
    this.handleChange = this.handleChange.bind(this);

  }
  handleSelect = evt => {
    this.props.gridSize(evt);
  };

  handleSubmit = (e) =>{
    e.preventDefault();
    this.firstName = e.target.firstName.value;
    this.lastName = e.target.lastName.value;
    this.props.save(this.firstName, this.lastName);
    let newState = {firstName:'',lastName:''};
    this.setState(newState);

  };
  handleSave = ()=>{
    this.props.save(this.firstName, this.lastName);
  }
  continueButton = ()=>{
    this.props.continueButton(this.props.speed);
  }
  handleChange(e){
		const newState={};
		newState[e.target.id]= e.target.value;
		this.setState(newState);
  }

  greeting = () => {
    let form = (<form className="player-form" onSubmit={this.handleSubmit}>
    <label htmlFor="firstName">First Name : </label>
      <input id="firstName" name="firstName" type="text" value={this.state.firstName} onChange={this.handleChange}/>
    <label htmlFor="lastName">Last Name : </label>
      <input id="lastName" name="lastName" type="text" value={this.state.lastName} onChange={this.handleChange}/>
      <button className="btn btn-success" type="submit" >Sign In</button>
    </form>)
    if(!this.firstName){
      return form;
    }else if(this.props.playerList[this.firstName.toLowerCase()+this.lastName.toLowerCase()]){
      console.log("old player")
      return (<div>{form}<h2> Welcome {this.firstName}!</h2></div>);
    }
  }
 
  render() {
    return (
      <div className="center">
        {this.greeting()}
        <ButtonToolbar>
          <DropdownButton
            className="btn btn-primary"
            title="Grid Size"
            id="size-menu"
            onSelect={this.handleSelect}
          >
            <MenuItem eventKey="1"> 20 x10 </MenuItem>
            <MenuItem eventKey="2"> 50 x25 </MenuItem>
            <MenuItem eventKey="3"> 80 x25 </MenuItem>
          </DropdownButton>
          
          {/* <button className="btn btn-primary" onClick={this.props.seed}>
            Seed
          </button> */}
          <button className="btn btn-primary" onClick={this.continueButton}>
            Continue
          </button>
          <button className="btn btn-primary" onClick={this.props.newGame}>
            New Game
          </button>
          <button className="btn btn-primary" onClick={this.props.stopButton}>
            Stop
          </button>
          <button className="btn btn-primary" onClick={this.props.slow}>
            Slow
          </button>
          <button className="btn btn-primary" onClick={this.props.fast}>
            Fast
          </button>
          <button className="btn btn-primary" onClick={this.props.clear}>
            Clear
          </button>
          <button className="btn btn-primary" onClick ={this.handleSave} >
            Save
          </button>
        </ButtonToolbar>

      </div>
    );
  }
}
