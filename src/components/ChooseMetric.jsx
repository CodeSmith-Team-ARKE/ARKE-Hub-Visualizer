import React, { Component } from 'react';
import EC2Static from './EC2Static.jsx';
import RDSStatic from './RDSStatic.jsx';
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
          {this.props.ec2Display ? (
            <div>
              Your EC2 Basic information | Choose Instance Below
              <EC2Static {...this.props} selectedInstance={selectedInstance} />
            </div>
          ) : null}
          {this.props.rdsDisplay ? (
            <div>
              Your RDS Basic information | Choose Instance Below
              <RDSStatic {...this.props} selectedInstance={selectedInstance} />
            </div>
          ) : null}
        </div>
        <div className="column">
          Select Metrics here
          {this.props.ec2Display ? (
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
          ) : null}
          {this.props.rdsDisplay ? (
            <div className="selectors">
              <div
                className="button"
                onClick={() => selectedMetricOptions('CPUUtilization')}
              >
                CPU Usage
              </div>

              {/* <div
                className="button"
                onClick={() => selectedMetricOptions('ReadIOPS')}
              >
                Read Input/Output per second
              </div>

              <div
                className="button"
                onClick={() => selectedMetricOptions('WriteIOPS')}
              >
                Write Input/Output per second
              </div> */}
            </div>
          ) : null}
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
