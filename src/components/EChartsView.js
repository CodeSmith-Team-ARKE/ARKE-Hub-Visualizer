import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';

//set up similar to tic tac toe
//set number of 'boxes' and the state of each box would depend on the button clicked
//one box would be the label one box would be the graph one box would be the percentage visualization one box would be the # of instances

// make this stateful
class EChartsView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: {
        title: {text: 'CPU Usage'},
        tooltip: {},
        xAxis: {
          // this will eventually be accessing a prop off a back end obj
          // eg: Obj.data.times 
          data: ['8:00', '8:30', '9:00', '9:30', '10:00', '10:30',] 
        },
        yAxis: {},
      series: [
        {
          name: 'Time',

// CHANGED FROM LINE TO SCATTER

          type: 'scatter',
          data: [5, 20, 36, 10, 10, 20, 100]
        }]
      }
    }
  }

  changeMetricToRAM() {
    // when button in render is clicked, metric changed to X
    this.setState({
      options: {
        title: {text: 'RAM Usage'},
        tooltip: {},
        xAxis: {
          // this will eventually be accessing a prop off a back end obj
          // eg: Obj.data.times 
          data: ['8:00', '8:30', '9:00', '9:30', '10:00', '10:30',] 
        },
        yAxis: {},
      series: [
        {
          name: 'Time',
          type: 'line',
          data: [40, 10, 1, 35, 18, 10]
        }
      ]}
    })
  }

  render() {
    // let chartType = '';
    // let chartTitle = '';
    //logic for button clicks ( if button = EC2 chartType = 'bar' Chart Title = 'CPU' )
    return (
      <div>
        <ReactEcharts
          option={this.state.options}
          notMerge={true}
          lazyUpdate={true}
          theme={'theme_name'}
        />
        {/* <ReactEcharts
          option={options2}
          notMerge={true}
          lazyUpdate={true}
          theme={'theme_name'}
        /> */}
      </div>
    );
  }
}

export default EChartsView;
