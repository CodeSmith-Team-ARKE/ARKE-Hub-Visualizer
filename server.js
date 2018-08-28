const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

// https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Config.html
const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-2' });

app.use(bodyParser.json());
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

app.use(function(req, res, next) {
  req.header('Access-Control-Allow-Origin', '*');
  req.header(
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
const cloudwatch = new AWS.CloudWatch();
// logs the current S3 buckets
var s3 = new AWS.S3();

// s3.listBuckets({}, function(err, data) {
//   if (err) console.log(err, err.stack);
//   else {
//     var params = {
//       StartTime: new Date('Aug 20 2018 00:00 GMT-0400 (EST)'),
//       EndTime: new Date(),
//       MetricDataQueries: [
//         {
//           Id: 's3m1',
//           MetricStat: {
//             Metric: {
//               Namespace: 'AWS/S3', // AWS/ EC2 || S3 !--Important--!
//               MetricName: 'BytesUploaded', // NetworkIn || NetworkOut || CPUUtilization  !--Important--!
//               Dimensions: [
//                 {
//                   Name: 'BucketName', // Dimension Name !--Important--!
//                   Value: 'test-bucket-for-node-manipulation' // Dimension Value !--Important--!
//                 }
//               ]
//             },
//             Period: 3600, // 60 min intervals - period works in 1 second increments

//             Stat: 'Average', // Statistic Type
//             Unit: 'Bytes' // Unit Type
//           }
//         }
//       ],
//       MaxDatapoints: 24
//     };
//     cloudwatch.getMetricData(params, function(err, data) {
//       if (err) console.log(err, err.stack);
//       // an error occurred
//       else {
//         console.log(data);
//         // console.log(data.MetricDataResults[0]); // successful response
//         // console.log(data.MetricDataResults[0].Values);
//         // console.log(data.MetricDataResults[0].Timestamps);
//         // return res.json(data.MetricDataResults[0]);
//       }
//     });
//   }
// });

// <==================== This information is requested when the page if first loaded ===================> //
app.get('/EC2info', function(req, res) {
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
    // console.log(allEC2Inst);
    console.log('EC2 instances queried');
    return res.json(allEC2Inst);
  });
});

app.post('/metric-data', (req, res, next) => {
  /// console.log(req.body);
  // Pulls EC2 CPU Utilization Metrics
  const { serviceName, metricName, instanceId } = req.body.selectedOptions;

  //this is kinda've a hard coded hacky solution
  var currUnits;
  if (metricName === ('NetworkIn' || 'NetworkOut')) {
    currUnits = 'Bytes';
  } else if (metricName === 'CPUUtilization') {
    currUnits = 'Percent';
  }

  var params = {
    StartTime: new Date('Aug 25 2018 00:00 GMT-0400 (EST)'),
    EndTime: new Date(),
    MetricDataQueries: [
      {
        Id: 'm1',
        MetricStat: {
          Metric: {
            Namespace: serviceName, // Service name !--Important--!
            MetricName: metricName, // NetworkIn || NetworkOut ||CPUUtilization  !--Important--!
            Dimensions: [
              {
                Name: 'InstanceId', // Dimension Name !--Important--!
                Value: instanceId // Dimension Value !--Important--!
              }
            ]
          },
          Period: 3600, // 60 min intervals - period works in 1 second increments

          Stat: 'Average', // Statistic Type
          Unit: currUnits // Unit Type
        }
      }
    ],
    MaxDatapoints: 24
  };

  cloudwatch.getMetricData(params, function(err, data) {
    if (err) console.log(err, err.stack);
    // an error occurred
    else {
      // console.log(data.MetricDataResults[0]); // successful response
      // console.log(data.MetricDataResults[0].Values);
      // console.log(data.MetricDataResults[0].Timestamps);
      return res.json(data.MetricDataResults[0]);
    }
  });
  // var parsedbody = JSON.parse(req.body.selectedOptions);
  // console.log(req);
  // console.log('This is the service Name', req.body.selectedOptions.serviceName);
  // return res.json(req.body.selectedOptions);
});

app.listen(process.env.PORT || 8080);
console.log('Production build running on ' + 8080);

//process.env.PORT ||
