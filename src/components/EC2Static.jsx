import React, { Component } from 'react';

export default class EC2Static extends Component {
  render() {
    const props = this.props.ec2Container;
    console.log(this.props);
    return (
      <div className="EC2-contents">
        Name: {props[0].Name}
        <br />
        Instance ID: {props[0].InstanceId}
        <br />
        Instance Type: {props[0].InstanceType}
        <br />
        Date Launched: {props[0].LaunchTime}
        <br />
      </div>
    );
  }
}
