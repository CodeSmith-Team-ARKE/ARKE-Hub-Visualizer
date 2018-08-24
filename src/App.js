import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Popup from './components/popup.jsx';
import Chart from './components/EChartsView.jsx';
import EC2Static from './components/EC2Static.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCreateDisplay: false, // Flag w/ boolean to display or not
      ec2Display: false, // Bool val to display ec2 button or not
      ec2Selected: false, // In the pop up when ec2 is selected this will happen
      ec2Container: null, // Pulls information from AWS SDK
      chartOption: null
    };
    this.toggleDisplay = this.toggleDisplay.bind(this);
    this.toggleEC2Display = this.toggleEC2Display.bind(this);
    this.getOption = this.getOption.bind(this);
  }

  componentWillMount() {
    fetch('http://localhost:8080/info', { mode: 'cors' })
      .then(res => {
        return res.json();
      })
      .then(info => {
        // console.log(info);
        this.setState({
          ec2Container: info
        });
      });
  }
  // event handler to change state = {showCreateDisplay: true} upon user click
  toggleDisplay() {
    this.setState({
      showCreateDisplay: !this.state.showCreateDisplay
    });
    // console.log('Display shown');
  }
  toggleEC2Display() {
    this.setState({
      ec2Display: true
    });
    // console.log(this.state.ec2Container);
  }
  getOption() {
    let chart = {
      title: { text: 'CPU Usage' },
      tooltip: {},
      xAxis: {
        data: ['Mon', 'Tues', 'Weds', 'Thurs', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {},
      series: [
        {
          name: 'Time',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20, 100]
        }
      ]
    };
    this.setState({
      chartOptions: chart
    });
    // console.log(this.state);
  }

  render() {
    const toggle = this.toggleDisplay;
    const toggleEC2 = this.toggleEC2Display;
    // const option = this.getOption;

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
          <Popup closePopup={toggle} toggleEC2={toggleEC2} />
        ) : null}

        {/*Metric display component, will display 3 graphs */}
        <div>
          <div className="wrapper">
            {/* <div className="clear button">Clear</div> */}
            {this.state.ec2Display ? (
              <div>
                <div>Elastic Cloud Computer (EC2)</div>
                <EC2Static {...this.state} />
                {/* <Chart {...this.state} /> */}
              </div>
            ) : null}
          </div>
          {/* </div className=""> */}

          <div className="wrapper">
            {/* <div>Simple Storage Service (S3)</div> */}
          </div>

          <div className="wrapper">
            {/* <div>Dynamo Database (DDB) </div> */}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
