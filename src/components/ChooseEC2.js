import React, { Component } from 'react';
import PopupChooseEC2 from './components/PopupChooseEC2.jsx';

class ChooseEC2 extends Component {

    render() {
        return (
            <div className="button" onClick={this.toggleEC2Display}> 
            
            <PopupChooseEC2 />

            {/* {this.state.showCreateDisplay ? (
          <PopupChooseEC2 text="Close Me" closePopup={toggle} toggleEC2={toggleEC2} />
        ) : null} */}
            
            </div>
        )
    }
}

export default ChooseEC2;