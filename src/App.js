import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Popup from './components/popup.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCreateDisplay: false,
      ec2Container: [] // where the information will be put into once button is clicked
    };
    this.toggleDisplay = this.toggleDisplay.bind(this);
  }

  toggleDisplay() {
    this.setState({
      showCreateDisplay: !this.state.showCreateDisplay
    });
  }

  render() {
    const toggle = this.toggleDisplay;

    return (
      // className="App"
      <div>
        <div>
          {/* This creates the header and invisible header*/}
          <header className="App-header">
            <h1 className="App-title">Welcome to the AWS: Team ARKE Project</h1>
          </header>
        </div>
        <div className="invisible-header" />

        {/* This creates the create display button */}
        <div className="button" onClick={toggle}>
          Create Display
          {/* This checks to see if a display is on or off and generates the popup display depending on the state */}
          {this.state.showCreateDisplay ? (
            <Popup text="Close Me" closePopup={toggle} />
          ) : null}
        </div>

        <div className="wrapper">
          {/*Metric display component, will display 3 graphs */}
          <div className="EC2-contents">
            {' '}
            Some kind of relevant information here, more more and more Data Some
            kind of relevant information here, more more and more DataSome kind
            of relevant information here, more more and more Data
          </div>
        </div>
      </div>
    );
  }
}

export default App;
