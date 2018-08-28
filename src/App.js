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
      ec2Charts: [],

      rdsDisplay: false,
      rdsContainer: null,
      rdsCharts: [],

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
    this.selectRDS = this.selectRDS.bind(this);

    this.toggleGraphDisplay = this.toggleGraphDisplay.bind(this);
    this.selectedMetricOptions = this.selectedMetricOptions.bind(this);
    this.selectedGraphOptions = this.selectedGraphOptions.bind(this);
    this.selectedInstance = this.selectedInstance.bind(this);
  }

  // event handler to change state = {showCreateDisplay: true} upon user click
  toggleDisplay() {
    this.setState(prevState => ({
      showCreateDisplay: !prevState.showCreateDisplay,
      ec2Display: false,
      rdsDisplay: false,
      selectedOptions: {
        serviceName: '',
        instanceParam: '',
        instanceName: '',
        instanceId: '',
        metricName: '',
        graphType: ''
      }
    }));
    // console.log('Display shown');
    // console.log('Current State', this.state);
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
        instanceId: value.InstanceId || value.DBInstanceIdentifier
      }
    });
    console.log(this.state.selectedOptions);
  }

  selectEC2() {
    fetch('http://localhost:8080/EC2info', { mode: 'cors' })
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
            serviceName: 'AWS/EC2',
            instanceParam: 'InstanceId'
          }
        });
      });
  }

  selectRDS() {
    fetch('http://localhost:8080/RDSinfo', { mode: 'cors' })
      .then(res => {
        return res.json();
      })
      .then(info => {
        // console.log(info);
        this.setState({
          rdsContainer: info,
          rdsDisplay: true,
          selectedOptions: {
            ...this.state.selectedOptions,
            serviceName: 'AWS/RDS',
            instanceParam: 'DBInstanceIdentifier'
          }
        });
      });
  }

  toggleGraphDisplay() {
    fetch('http://localhost:8080/metric-data', {
      mode: 'cors',
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        selectedOptions: {
          ...this.state.selectedOptions
        }
      })
    })
      .then(res => {
        return res.json();
      })
      .then(info => {
        const humanDates = info.Timestamps.map(interval => {
          var date = new Date(interval);
          return date.toLocaleTimeString();
        });
        const parsedValues = info.Values.map(value => {
          return Number.parseFloat(value).toFixed(2);
        });
        // console.log(parsedValues);
        // console.log(humanDates);
        const metricName = this.state.selectedOptions.metricName;
        const graphType = this.state.selectedOptions.graphType;
        const instanceName = this.state.selectedOptions.instanceName;

        let chart = {
          title: {
            text: 'Metric: ' + metricName + '\nInstance Name: ' + instanceName
          }, // can be filled in
          tooltip: {},
          xAxis: {
            data: humanDates
          },
          yAxis: {},
          series: [
            {
              name: 'Time',
              type: graphType, // can be filled in
              data: parsedValues
            }
          ]
        };
        if (!metricName || !graphType) {
          console.log('Please select a Metric name and Graph type');
        }
        if (this.state.selectedOptions.serviceName === 'AWS/EC2') {
          this.state.ec2Charts.push(chart);
          this.setState({
            chartOptions: chart,
            ec2Display: false,
            showCreateDisplay: false,
            metricsDisplay: true
          });
        }
        if (this.state.selectedOptions.serviceName === 'AWS/RDS') {
          this.state.rdsCharts.push(chart);
          this.setState({
            chartOptions: chart,
            rdsDisplay: false,
            showCreateDisplay: false,
            metricsDisplay: true
          });
        }
        // else {
        //   // console.log(chart);
        //   // console.log(this.state.selectedOptions);
        //   // console.log(this.state.ec2Charts);
        //   // console.log(this.state.ec2Charts);
        //   // console.log(this.state.ec2Charts.length);
        // }
      });
  }

  render() {
    const toggle = this.toggleDisplay;
    const selectEC2 = this.selectEC2;
    const selectRDS = this.selectRDS;
    const toggleGraphDisplay = this.toggleGraphDisplay;
    const selectedMetricOptions = this.selectedMetricOptions;
    const selectedGraphOptions = this.selectedGraphOptions;
    const selectedInstance = this.selectedInstance;

    const allec2Charts = this.state.ec2Charts.map(chartOption => {
      return <Chart key={chartOption.length} chartOption={chartOption} />;
    });
    const allrdsCharts = this.state.rdsCharts.map(chartOption => {
      return <Chart key={chartOption.length} chartOption={chartOption} />;
    });

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
            selectRDS={selectRDS}
            toggleGraphDisplay={toggleGraphDisplay}
            selectedMetricOptions={selectedMetricOptions}
            selectedGraphOptions={selectedGraphOptions}
            selectedInstance={selectedInstance}
          />
        ) : null}
        {/*Metric display component, will display 3 graphs */}

        <div className="wrapper">
          {/* <div className="clear button">Clear</div> */}
          {this.state.ec2Charts.length > 0 ? (
            <div>
              <div>Elastic Cloud Computer (EC2)</div>
              {allec2Charts}
            </div>
          ) : null}
        </div>

        <div className="wrapper">
          {/* <div>Simple Storage Service (S3)</div> */}
        </div>
        <div className="wrapper">
          {this.state.rdsCharts.length > 0 ? (
            <div>
              <div>Relational Database Service (RDS) </div>
              {allrdsCharts}
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default App;
