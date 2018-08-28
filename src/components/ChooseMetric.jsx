import React, { Component } from 'react';
import EC2Static from './EC2Static.jsx';
// import ReactEcharts from 'echarts-for-react';
// import EChartsView from './EChartsView.jsx';

export default class ChooseMetric extends Component {
  render() {
    const {
      selectedInstance,
      selectedGraphOptions,
      selectedMetricOptions,
      toggleGraphDisplay
    } = this.props;

    return (
      <div>
        <div className="column info">
          Your EC2 Basic information | Choose Instance Below
          <EC2Static {...this.props} selectedInstance={selectedInstance} />
        </div>
        <div className="column">
          Select Metrics here
          <div className="selectors">
            <div
              className="button"
              onClick={() => selectedMetricOptions('CPUUtilization')}
            >
              CPU Usage
            </div>
            <div
              className="button"
              onClick={() => selectedMetricOptions('NetworkIn')}
            >
              Network-In
            </div>
            <div
              className="button"
              onClick={() => selectedMetricOptions('NetworkOut')}
            >
              Network-Out
            </div>
          </div>
          <br />
          Select View Type here
          <div className="selectors">
            <div
              className="button"
              onClick={() => selectedGraphOptions('line')}
            >
              Line Graph
            </div>
            {/* <div
              className="button"
              onClick={() => selectedGraphOptions('scatter')}
            >
              Number
              Scatterplot Graph
            </div> */}

            <div className="button" onClick={() => selectedGraphOptions('bar')}>
              Bar Graph
            </div>
          </div>
          <br />
          <div className="button" onClick={toggleGraphDisplay}>
            {' '}
            Create Chart
          </div>
        </div>
        {/* </div>
        </div> */}
      </div>
    );
  }
}
// onClick={toggleMetrics}

// console.log('this.props.metricsDisplay: ', this.props);
