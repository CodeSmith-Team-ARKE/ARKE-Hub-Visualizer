const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

// https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Config.html
const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-2' });

app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// console.log(AWS.config);
const ec2 = new AWS.EC2();

// logs the current S3 buckets
// var s3 = new AWS.S3();
// s3.listBuckets({}, function(err, data) {
//   if (err) console.log(err, err.stack);
//   else console.log(data);
// });

const cloudwatch = new AWS.CloudWatch();

// // Pulls EC2 CPU Utilization Metrics
// var params = {
//   StartTime: new Date('Aug 20 2018 00:00 GMT-0400 (EST)'),
//   EndTime: new Date(),
//   MetricDataQueries: [
//     {
//       Id: 'm1',
//       MetricStat: {
//         Metric: {
//           Namespace: 'AWS/EC2', // Service name !--Important--!
//           MetricName: 'CPUUtilization', // NetworkIn || NetworkOut  !--Important--!
//           Dimensions: [
//             {
//               Name: 'InstanceId', // Dimension Name !--Important--!
//               Value: 'i-0df035ca3d920d241' // Dimension Value !--Important--!
//             }
//           ]
//         },
//         Period: 300, // 5 min intervals - period works in 1 second increments

//         Stat: 'Average', // Statistic Type
//         Unit: 'Percent' // Unit Type
//       }
//     }
//   ],
//   MaxDatapoints: 10
// };

// cloudwatch.getMetricData(params, function(err, data) {
//   if (err) console.log(err, err.stack);
//   // an error occurred
//   else {
//     console.log(data); // successful response
//     console.log(data.MetricDataResults[0].Values);
//     console.log(data.MetricDataResults[0].Timestamps);
//   }
// });

// <==================== This information is requested when the page if first loaded ===================> //
app.get('/info', function(req, res) {
  var params = {
    Filters: [
      {
        Name: 'instance-state-name',
        Values: ['running']
      }
    ]
  };
  ec2.describeInstances(params, function(err, data) {
    let allEC2Inst = [];
    let ec2Instance = {};

    if (err) console.log(err, err.stack);
    // an error occurred
    else {
      for (let i = 0; i < data.Reservations.length; i++) {
        let tagsArray = data.Reservations[i].Instances[0].Tags;
        let dataProps = data.Reservations[i].Instances[0];
        var name;
        for (let j = 0; j < tagsArray.length; j++) {
          if (tagsArray[j].Key === 'Name') {
            var name = tagsArray[j].Value;
          }
        }
        ec2Instance = {
          Name: name,
          InstanceId: dataProps.InstanceId,
          InstanceType: dataProps.InstanceType,
          LaunchTime: new Date(dataProps.LaunchTime)
        };
        allEC2Inst.push(ec2Instance);
      }
    }
    return res.json(allEC2Inst);
  });
});

app.listen(process.env.PORT || 8080);
console.log('Production build running on ' + 8080);

//process.env.PORT ||
