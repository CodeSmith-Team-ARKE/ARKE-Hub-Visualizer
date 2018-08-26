import React, { Component } from 'react';
import EC2Static from './EC2Static.jsx';
// import ReactEcharts from 'echarts-for-react';
// import EChartsView from './EChartsView.jsx';

export default class ChooseMetric extends Component {
  render() {
    const { toggleMetrics } = this.props; // closePopup

    return (
      <div>
        {/* <div className="popup_inner">
          <div className="services-container"> */}
        <div className="column info">
          Your EC2 Basic information | Choose Instance Below
          <EC2Static {...this.props} />
        </div>
        <div className="column">
          Select Metrics here
          <div className="selectors">
            <div className="button">CPU</div>
            <div className="button">Networks-In</div>
            <div className="button">Networks-Out</div>
          </div>
          <br />
          Select View Type here
          <div className="selectors">
            <div className="button">Line</div>
            <div className="button">Number</div>
            <div className="button">Bar</div>
          </div>
          <br />
          <div className="button" onClick={toggleMetrics}>
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
