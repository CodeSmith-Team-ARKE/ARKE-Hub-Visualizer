import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';

class ChooseMetric extends Component {
render() {
  return (
  <div>
    <div className="button" onClick={func}>
      CPU
    </div>

    <div>
    {this.state.showCreateDisplay ? (
      <PopupChooseEC2 text="Close Me" closePopup={toggle} toggleEC2={toggleEC2} />
    ) : null}
    </div>
  </div>
  )}
}

