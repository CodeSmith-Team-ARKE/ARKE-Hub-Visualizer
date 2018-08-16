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

class EChartsView extends Component {
  render() {
    // let chartType = '';
    // let chartTitle = '';
    //logic for button clicks ( if button = EC2 chartType = 'bar' Chart Title = 'CPU' )
    const options = {
      title: { text: 'ECharts ' },
      tooltip: {},
      xAxis: {
        data: ['asda', 'c', 's', 'd', 'f', 's']
      },
      yAxis: {},
      series: [
        {
          name: 'd',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }
      ]
    };
    return (
      <ReactEcharts
        option={options}
        notMerge={true}
        lazyUpdate={true}
        theme={'theme_name'}
      />
    );
  }
}

export default EChartsView;
