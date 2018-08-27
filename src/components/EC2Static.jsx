import React, { Component } from 'react';

export default class EC2Static extends Component {
  // onClick={() => selectedInstance(this.instance)}
  render() {
    const { selectedInstance } = this.props;
    const mappedEC2List = this.props.ec2Container.map(instance => {
      return (
        <div
          className="EC2-contents"
          key={instance.Name}
          onClick={() => selectedInstance(instance)}
        >
          Name: {instance.Name}
          <br />
          Instance ID: {instance.InstanceId}
          <br />
          Instance Type: {instance.InstanceType}
          <br />
          Date Launched: {instance.LaunchTime}
          <br />
          {/* {console.log(this.instance)} */}
        </div>
      );
    });

    // console.log(this.props);
    return <div>{mappedEC2List}</div>;
  }
}

// onClick={() => selectedInstance(this.instance)}
