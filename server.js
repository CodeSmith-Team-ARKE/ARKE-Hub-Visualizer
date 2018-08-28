const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

function useAccessObject (accessObject){


// https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Config.html
const AWS = require('aws-sdk');
AWS.config.update(accessObject);

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
const s3 = new AWS.S3();
const rds = new AWS.RDS();

// s3.listBuckets({}, function(err, data) {
//   if (err) console.log(err, err.stack);
//   else console.log(data)
// }

// rds.describeAccountAttributes(params, function(err, data) {
//   if (err) console.log(err, err.stack);
//   // an error occurred
//   else console.log(data); // successful response
// });

// var params = {
//   StartTime: new Date('Aug 25 2018 00:00 GMT-0400 (EST)'),
//   EndTime: new Date(),
//   MetricDataQueries: [
//     {
//       Id: 'm1',
//       MetricStat: {
//         Metric: {
//           Namespace: 'AWS/RDS', // Service name !--Important--!
//           MetricName: 'CPUUtilization', // NetworkIn || NetworkOut ||CPUUtilization  !--Important--!
//           Dimensions: [
//             {
//               Name: 'DBInstanceIdentifier', // Dimension Name !--Important--!
//               Value: 'aauvjxp7ov0zxs' // Dimension Value !--Important--!
//             }
//           ]
//         },
//         Period: 3600, // 60 min intervals - period works in 1 second increments

//         Stat: 'Average', // Statistic Type
//         Unit: 'Percent' // Unit Type
//       }
//     }
//   ],
//   MaxDatapoints: 24
// };

// cloudwatch.getMetricData(params, function(err, data) {
//   if (err) console.log(err, err.stack);
//   // an error occurred
//   else {
//     console.log(data.MetricDataResults[0]); // successful response
//     // console.log(data.MetricDataResults[0].Values);
//     // console.log(data.MetricDataResults[0].Timestamps);
//     // return res.json(data.MetricDataResults[0]);
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

app.get('/RDSinfo', (req, res) => {
  var params = {};
  rds.describeDBInstances(params, function(err, data) {
    // var rdsInstance = {};
    var rdsArray = [];
    if (err) console.log(err, err.stack);
    // an error occurred
    else {
      for (let i = 0; i < data.DBInstances.length; i++) {
        var rdsInstance = {
          DBInstanceIdentifier: data.DBInstances[i].DBInstanceIdentifier,
          instanceClass: data.DBInstances[i].DBInstanceClass,
          Engine:
            data.DBInstances[i].Engine +
            ', Version ' +
            data.DBInstances[i].EngineVersion
        };
        // console.log(rdsInstance);
        rdsArray.push(rdsInstance);
      }
    }
    // console.log(RDS Info Queried); // successful response
    return res.json(rdsArray);
  });
}),
  app.post('/metric-data', (req, res, next) => {
    /// console.log(req.body);
    // Pulls EC2 CPU Utilization Metrics
    const {
      serviceName,
      metricName,
      instanceId,
      instanceParam
    } = req.body.selectedOptions;

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
                  Name: instanceParam, // Dimension Name !--Important--!
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

app.listen(process.env.PORT || 8080, (err) => {
  if(err) throw err;

console.log('your arke dashboard is now hosted on localhost 8000')
console.log('please open a new terminal and run npm start to render your dash')
console.log('     *  * ** ** * * *          * *      ** *             **    *')
console.log(' * *  **       * *     **  * ** *  ** **  * *        **    **')
console.log('* *         *        *   *  *                **  ***       *')
console.log('     *     *    *                        *       *          ')
console.log('       *    * *      *                       *     ')
console.log('                                       * *   *     *     *')
console.log('  *       *       *         *           **')
console.log('        *              *     *     *      *          *')
console.log(' *             *        *         *   *    *')
console.log('                                 *')
console.log('*            *                             *    *          *')
console.log('   *  *          *  *      *   *')
});

}

module.exports = useAccessObject;

//process.env.PORT ||
