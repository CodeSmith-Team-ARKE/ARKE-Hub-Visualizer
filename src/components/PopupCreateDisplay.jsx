import React, { Component } from 'react';
// import ChooseEC2 from './ChooseEC2.js';
import ChooseMetric from './ChooseMetric.jsx';

export default class PopupCreateDisplay extends Component {
  render() {
    const {
      selectedInstance,
      selectedMetricOptions,
      selectedGraphOptions,
      toggleGraphDisplay,
      selectEC2,
      closePopup
    } = this.props;
    // console.log('this.props.ec2Display: ', this.props.ec2Display);
    return (
      <div className="popup">
        <div className="popup_inner">
          {this.props.ec2Display ? (
            <ChooseMetric
              {...this.props}
              toggleGraphDisplay={toggleGraphDisplay}
              selectedMetricOptions={selectedMetricOptions}
              selectedGraphOptions={selectedGraphOptions}
              selectedInstance={selectedInstance}
            />
          ) : (
            <div className="services-container">
              <div className="services" onClick={selectEC2}>
                Elastic Cloud Compute (EC2)
              </div>
              <div className="services">Simple Storage Service (S3)</div>
              <div className="services">Dynamo Database (DDB)</div>
            </div>
          )}
          <div className="submit button" onClick={closePopup}>
            Close / Submit
          </div>
        </div>
      </div>
    );
  }
}
