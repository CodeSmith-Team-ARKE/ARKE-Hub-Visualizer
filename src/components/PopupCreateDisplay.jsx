import React, { Component } from 'react';
import ChooseEC2 from './ChooseEC2.js'

export default class PopupCreateDisplay extends Component {
  render() {
    const { toggleEC2, closePopup } = this.props;
    return (
      <div className="popup">
        <div className="popup_inner">
          <div className="services-container">
            <div className="services" onClick={toggleEC2}>
            <div>
          <ChooseEC2 />
            </div>
            <div className="services">Simple Storage Service (S3)</div>
            <div className="services">Dynamo Database (DDB)</div>
          </div>

          <div className="submit button" onClick={closePopup}>
            Close / Submit
          </div>
          </div>
        </div>
      </div>
    );
  }
}
