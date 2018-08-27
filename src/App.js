import React, { Component } from 'react';
import './App.css';
import PopupCreateDisplay from './components/PopupCreateDisplay.jsx';
// import PopupChooseEC2 from './components/PopupChooseEC2.jsx';
import Chart from './components/EChartsView.jsx';
// import ChooseEC2 from './components/ChooseEC2.js';
// import EC2Static from './components/EC2Static.jsx';
// import ChooseMetric from './components/ChooseMetric';

// This component is a frame for the other components and it is the parent component with state
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCreateDisplay: false, // Flag w/ boolean to display or not
      ec2Display: false, // Flicks when EC2 is selected
      ec2Container: null, // Pulls information from AWS SDK
      // [
      //   {
      //     ServiceName: 'AWS/EC2',
      //     // /<-- Namespace --> // SDK Call
      //     Name: 'Sample',
      //     InstanceId: '001',
      //     InstanceType: 'Code',
      //     LaunchTime: 'today'
      //     // metricName: '',
      //     // graphType: ''
      //   }
      // ],
      // selectedInstance: null,
      selectedOptions: {
        serviceName: '',
        instanceName: '',
        instanceId: '',
        metricName: '',
        graphType: ''
      },
      // chartOptions: null,
      metricsDisplay: false
    };
    this.toggleDisplay = this.toggleDisplay.bind(this);
    this.selectEC2 = this.selectEC2.bind(this);
    this.toggleGraphDisplay = this.toggleGraphDisplay.bind(this);
    this.selectedMetricOptions = this.selectedMetricOptions.bind(this);
    this.selectedGraphOptions = this.selectedGraphOptions.bind(this);
    this.selectedInstance = this.selectedInstance.bind(this);
  }

  // event handler to change state = {showCreateDisplay: true} upon user click
  toggleDisplay() {
    this.setState({
      showCreateDisplay: !this.state.showCreateDisplay,
      ec2Display: false,
      selectedOptions: {
        serviceName: '',
        instanceName: '',
        instanceId: '',
        metricName: '',
        graphType: ''
      }
    });
    // console.log('Display shown');
    // console.log('Current State', this.state);
  }

  selectEC2() {
    fetch('http://localhost:8080/info', { mode: 'cors' })
      .then(res => {
        return res.json();
      })
      .then(info => {
        // console.log(info);
        this.setState({
          ec2Container: info,
          ec2Display: true,
          selectedOptions: {
            ...this.state.selectedOptions,
            serviceName: 'AWS/EC2'
          }
        });
      });
  }

  selectedMetricOptions(value) {
    this.setState({
      selectedOptions: {
        ...this.state.selectedOptions,
        metricName: value
      }
    });
    // console.log(this.state.selectedOptions);
    // console.log(value);
  }

  selectedGraphOptions(value) {
    this.setState({
      selectedOptions: {
        ...this.state.selectedOptions,
        graphType: value
      }
    });
    // console.log(this.state.selectedOptions);
    // console.log(value);
  }

  selectedInstance(value) {
    this.setState({
      selectedOptions: {
        ...this.state.selectedOptions,
        instanceName: value.Name,
        instanceId: value.InstanceId
      }
    });
    // console.log(this.state.selectedOptions);
    // console.log('This is the value of the div being selected', value);
    // console.log(value.Name);
    // console.log(value.InstanceId);
    console.log(this.state.selectedOptions);
  }

  toggleGraphDisplay() {
    const metricName = this.state.selectedOptions.metricName;
    const graphType = this.state.selectedOptions.graphType;

    let chart = {
      title: { text: metricName }, // can be filled in
      tooltip: {},
      xAxis: {
        data: [
          '2018-08-27T15:10:00.000Z',
          '15:10:15',
          '15:10:30',
          '15:10:45',
          '15:11:00',
          '15:11:15',
          '15:11:30'
        ]
      },
      yAxis: {},
      series: [
        {
          name: 'Time',
          type: graphType, // can be filled in
          data: [5, 20, 36, 10, 10, 20, 100]
        }
      ]
    };
    if (!metricName || !graphType) {
      console.log('Please select a Metric name and Graph type');
    } else {
      this.setState({
        chartOptions: chart,
        ec2Display: false,
        showCreateDisplay: false,
        metricsDisplay: true
      });
      console.log(this.state.selectedOptions);
    }
  }

  render() {
    const toggle = this.toggleDisplay;
    const selectEC2 = this.selectEC2;
    const toggleGraphDisplay = this.toggleGraphDisplay;
    const selectedMetricOptions = this.selectedMetricOptions;
    const selectedGraphOptions = this.selectedGraphOptions;
    const selectedInstance = this.selectedInstance;

    return (
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
          <PopupCreateDisplay
            {...this.state}
            closePopup={toggle}
            selectEC2={selectEC2}
            toggleGraphDisplay={toggleGraphDisplay}
            selectedMetricOptions={selectedMetricOptions}
            selectedGraphOptions={selectedGraphOptions}
            selectedInstance={selectedInstance}
          />
        ) : null}
        {/*Metric display component, will display 3 graphs */}

        <div className="wrapper">
          {/* <div className="clear button">Clear</div> */}
          {this.state.metricsDisplay ? (
            <div>
              <div>Elastic Cloud Computer (EC2)</div>
              {/* <EC2Static {...this.state} /> */}
              <Chart chartOption={this.state.chartOptions} />
            </div>
          ) : null}
        </div>

        <div className="wrapper">
          {/* <div>Simple Storage Service (S3)</div> */}
        </div>
        <div className="wrapper">{/* <div>Dynamo Database (DDB) </div> */}</div>
      </div>
    );
  }
}

export default App;
