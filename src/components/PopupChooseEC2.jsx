import React, { Component } from 'react';


export default class PopupChooseEC2 extends Component {
  render() {
    const { toggleEC2, closePopup } = this.props;
    return (
      <div className="popup">
        <div className="popup_inner">
          <div className="services-container">
            <div className="services"> 
            {/* onClick={toggleEC2} */}
              CPU Usage
            </div>
            <div className="services">Networks In</div>
            <div className="services">Duration of EC2 instance</div>
          </div>

          <div className="submit button" onClick={closePopup}>
            Close / Submit
          </div>
        </div>
      </div>
    );
  }
}