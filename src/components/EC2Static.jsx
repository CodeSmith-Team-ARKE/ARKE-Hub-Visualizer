import React, { Component } from 'react';

export default class EC2Static extends Component {
  render() {
    const mappedEC2List = this.props.ec2Container.map(instance => {
      return (
        <div className="EC2-contents" key={instance.InstanceId}>
          Name: {instance.Name}
          <br />
          Instance ID: {instance.InstanceId}
          <br />
          Instance Type: {instance.InstanceType}
          <br />
          Date Launched: {instance.LaunchTime}
          <br />
        </div>
      );
    });

    console.log(this.props);
    return <div>{mappedEC2List}</div>;
  }
}
