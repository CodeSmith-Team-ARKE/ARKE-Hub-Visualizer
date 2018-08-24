import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import GenerateChart from './GenerateChart.js';

export default class ChooseMetric extends Component {
render() {
  return (
  <div>
    <div className="popup_inner" >
    <div className="services-container">
      <div className="services" onClick={this.props.toggleMetrics}> 

    {this.props.toggleMetric ? <GenerateChart /> : null}

      <div >
      CPU
      </div>
    <div>
      Networks-In
    </div>
    <div>
      X Metric
    </div>
    <div>
      Y Metric
    </div>

    </div>
    </div>
  </div>
  </div>
  )}
}

