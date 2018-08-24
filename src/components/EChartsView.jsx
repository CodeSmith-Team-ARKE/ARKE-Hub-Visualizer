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
  // changeMetricToRAM() {
  //   // when button in render is clicked, metric changed to X
  //   this.setState({
  //     options: {
  //       title: {text: 'RAM Usage'},
  //       tooltip: {},
  //       xAxis: {
  //         // this will eventually be accessing a prop off a back end obj
  //         // eg: Obj.data.times 
  //         data: ['8:00', '8:30', '9:00', '9:30', '10:00', '10:30',] 
  //       },
  //       yAxis: {},
  //     series: [
  //       {
  //         name: 'Time',
  //         type: 'line',
  //         data: [40, 10, 1, 35, 18, 10]
  //       }
  //     ]}
  //   })
  // }
  render() {
    console.log(this.props);
    const { chartOption } = this.props;
    return (
      <div style={{ display: 'inline-block', width: '33%' }}>
        <ReactEcharts
          option={chartOption}
          notMerge={true}
          lazyUpdate={true}
          theme={'theme_name'}
        />
      </div>
    );
  }
}

export default EC2View;
