import React, { Component } from 'react';
import './App.css';
import PopupCreateDisplay from './components/PopupCreateDisplay.jsx';
import PopupChooseEC2 from './components/PopupChooseEC2.jsx';
import Chart from './components/EChartsView.jsx';
import ChooseEC2 from './components/ChooseEC2.js';
import EC2Static from './components/EC2Static.jsx';
import ChooseMetric from './components/ChooseMetric';

// This component is a frame for the other components and it is the parent component with state
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCreateDisplay: false, // Flag w/ boolean to display or not

      ec2Display: false, // Bool val to display ec2 button or not
      ec2Selected: false, // In the pop up when ec2 is selected this will happen
      ec2Container: null, // Pulls information from AWS SDK

      chartOption: null,
      metricsDisplay: false,
    };
    this.toggleDisplay = this.toggleDisplay.bind(this);
    this.toggleEC2Display = this.toggleEC2Display.bind(this);
    this.getOption = this.getOption.bind(this);
    this.toggleMetricsDisplay = this.toggleMetricsDisplay.bind(this);
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
      // console.log(this.state);
  }
  // event handler to change state = {showCreateDisplay: true} upon user click
  toggleDisplay() {
    this.setState({
      showCreateDisplay: !this.state.showCreateDisplay,
      ec2Display: false
    });
    console.log('Display shown');
  }
  toggleEC2Display() {
    this.setState({
      ec2Display: true
    });
    // console.log('this.state.eC2Display inside App toggle func: ', this.state.ec2Display);
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

  toggleMetricsDisplay() {
    this.setState({
      metricsDisplay: true
    });
    console.log('metrics toggled');
  }

  render() {
    const toggle = this.toggleDisplay;
    const toggleEC2 = this.toggleEC2Display;
    const toggleMetrics = this.toggleMetricsDisplay;
    const option = this.getOption;
    // const changeChartType = this.assignChartType;

    return (
      // className="App"
      <div>
        <div>
          {/* This creates the header and invisible header*/}
          <header className="App-header">
            <h1 className="App-title">Welcome to the AWS: ARKE Dashboard</h1>
          </header>
          <header className="invisible-header" />
        </div>

        {/* This creates the create display button */}
        <div className="button" onClick={toggle}>
          Create Display
        </div>
        {/* This checks to see if a display is on or off and generates the popup display depending on the state */}
        {this.state.showCreateDisplay ? (
          <PopupCreateDisplay {...this.state} closePopup={toggle} toggleEC2={toggleEC2} toggleMetrics={toggleMetrics}/>
          // <Popup closePopup={toggle} toggleEC2={toggleEC2} />
        ) : null}

        {/*Metric display component, will display 3 graphs */}

          <div className="wrapper">
            {/* <div className="clear button">Clear</div> */}
            {/* {this.state.ec2Display ? (
              <div>
                <div>Elastic Cloud Computer (EC2)</div>
                <EC2Static {...this.state} />
                {/* <Chart {...this.state} /> */}
              {/* </div>) : null}  */}
            </div>
            {this.state.displayMetrics ? <Chart /> : null}
          <div className="wrapper">
            {/* <div>Simple Storage Service (S3)</div> */}
          </div>

          <div className="wrapper">
            {/* <div>Dynamo Database (DDB) </div> */}
          </div>
        </div>
      // </div>
    );
  }
}

// {this.props.toggleMetric ? <EChartsView /> : null} >

export default App;
