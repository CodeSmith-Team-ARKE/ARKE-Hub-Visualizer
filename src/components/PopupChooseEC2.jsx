import React, { Component } from 'react';


export default class PopupChooseEC2 extends Component {
  render() {
    const { toggleEC2, closePopup } = this.props;
    return ( 
      <div>   
            <div className="services"> 
            {/* onClick={toggleEC2} */}
              CPU Usage
            </div>
            <div className="services">Networks In</div>
            <div className="services">Duration of EC2 instance</div>
          <div className="submit button" onClick={closePopup}>
            Close / Submit
          </div>
      </div>
    );
  }
}