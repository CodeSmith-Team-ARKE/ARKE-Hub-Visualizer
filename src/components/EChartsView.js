import React, { Component } from 'react';
// import echarts from 'echarts';
// // 引入柱状图
// import  'echarts/lib/chart/bar';
// // 引入提示框和标题组件
// import 'echarts/lib/component/tooltip';
// import 'echarts/lib/component/title';
import ReactEcharts from 'echarts-for-react';

//set up similar to tic tac toe
//set number of 'boxes' and the state of each box would depend on the button clicked
//one box would be the label one box would be the graph one box would be the percentage visualization one box would be the # of instances

class EC2View extends Component {
  render() {
    // let chartType = '';
    // let chartTitle = '';
    //logic for button clicks ( if button = EC2 chartType = 'bar' Chart Title = 'CPU' )
    const options = {
      title: { text: 'CPU usage' },
      tooltip: {},
      xAxis: {
        data: ['Mon', 'Tues', 'Weds', 'Thurs', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {},
      series: [
        {
          name: 'Time',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20, 100]
        }
      ]
    };
    const options2 = {
      title: { text: 'Time spent researching AWS' },
      tooltip: {},
      xAxis: {
        data: ['Mon', 'Tues', 'Weds', 'Thurs', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {},
      series: [
        {
          name: 'Time',
          type: 'line',
          data: [100, 150, 1200, 1921, 9928, 1289, 100]
        }
      ]
    };
    return (
      <div>
        <ReactEcharts
          option={options}
          notMerge={true}
          lazyUpdate={true}
          theme={'theme_name'}
        />
        <ReactEcharts
          option={options2}
          notMerge={true}
          lazyUpdate={true}
          theme={'theme_name'}
        />
      </div>
    );
  }
}

export default EC2View;
