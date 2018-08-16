import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Popup from './components/popup.jsx';
import FirstChart from './components/EChartsView.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCreateDisplay: false,
      ec2Display: false,
      ec2Container: [] // where the information will be put into once button is clicked
    };
    this.toggleDisplay = this.toggleDisplay.bind(this);
    this.toggleEC2Display = this.toggleEC2Display.bind(this);
  }

  toggleDisplay() {
    this.setState({
      showCreateDisplay: !this.state.showCreateDisplay
    });
    console.log('Display shown');
  }
  toggleEC2Display() {
    this.setState({
      ec2Display: true
    });
    console.log('EC2 toggled');
  }

  render() {
    const toggle = this.toggleDisplay;
    const toggleEC2 = this.toggleEC2Display;

    return (
      // className="App"
      <div>
        <div>
          {/* This creates the header and invisible header*/}
          <header className="App-header">
            <h1 className="App-title">Welcome to the AWS: Team ARKE Project</h1>
          </header>
          <header className="invisible-header" />
        </div>

        {/* This creates the create display button */}
        <div className="button" onClick={toggle}>
          Create Display
        </div>

        {/* This checks to see if a display is on or off and generates the popup display depending on the state */}
        {this.state.showCreateDisplay ? (
          <Popup text="Close Me" closePopup={toggle} toggleEC2={toggleEC2} />
        ) : null}

        <div className="wrapper">
          {/*Metric display component, will display 3 graphs */}
          <div>Elastic Cloud Computer (EC2)</div>
          {/* <div className="clear button">Clear</div> */}
          {this.state.ec2Display ? <FirstChart /> : null}
        </div>
        <div className="wrapper">
          <div>Simple Storage Service (S3)</div>
        </div>
        <div className="wrapper">
          <div>Dynamo Database (DDB) </div>
        </div>
      </div>
    );
  }
}

export default App;
