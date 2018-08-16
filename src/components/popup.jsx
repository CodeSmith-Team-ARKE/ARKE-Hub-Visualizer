import React, { Component } from 'react';

export default class Popup extends Component {
  render() {
    return (
      <div className="popup">
        <div className="popup_inner">
          <div className="services-container">
            <div className="services">Elastic Cloud Compute (EC2)</div>
            <div className="services">Simple Storage Service (S3)</div>
            <div className="services">Dynamo Database (DDB)</div>
          </div>

          <button className="submit button" onClick={this.props.closePopup}>
            submit
          </button>
        </div>
      </div>
    );
  }
}

// {this.props.text}
