import React, { Component } from 'react';

export default class RDSStatic extends Component {
  // onClick={() => selectedInstance(this.instance)}
  render() {
    const { selectedInstance } = this.props;
    const mappedRDSList = this.props.rdsContainer.map(instance => {
      return (
        <div
          className="contents"
          key={instance.DBInstanceIdentifier}
          onClick={() => selectedInstance(instance)}
        >
          Name: {instance.DBInstanceIdentifier}
          <br />
          Class Type: {instance.instanceClass}
          <br />
          Engine: {instance.Engine}
          <br />
          {/* {console.log(this.instance)} */}
        </div>
      );
    });

    // console.log(this.props);
    return <div>{mappedRDSList}</div>;
  }
}

// onClick={() => selectedInstance(this.instance)}
