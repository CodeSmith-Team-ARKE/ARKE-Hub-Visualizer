import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import EChartsView from './EChartsView.jsx';

export default class ChooseMetric extends Component {
render() {
  const { closePopup, toggleMetrics } = this.props;
  console.log('this.props.metricsDisplay: ', this.props);
  return (
  <div>
    <div className="popup_inner">
    <div className="services-container">
      <div className="services"> 
      <div onClick={toggleMetrics}>
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

