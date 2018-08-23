import React, { Component } from 'react';

export default class Popup extends Component {
  render() {
    const { toggleEC2, closePopup } = this.props;
    return (
      <div className="popup">
        <div className="popup_inner">
          <div className="services-container">
            <div className="services" onClick={toggleEC2}>
              Elastic Cloud Compute (EC2)
            </div>
            <div className="services">Simple Storage Service (S3)</div>
            <div className="services">Dynamo Database (DDB)</div>
          </div>

          <div className="submit button" onClick={closePopup}>
            Close / Submit
          </div>
        </div>
      </div>
    );
  }
}
