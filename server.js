// Dependencies

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const AWS = require('aws-sdk');
const app = express();

// wrapper for command.js
const useAccessObject = (accessObject) => {

  // const ec2 = new AWS.EC2();
  // const cloudwatch = new AWS.CloudWatch();

  AWS.config.update(accessObject);
  console.log('accessObject',accessObject)
  const ec2 = new AWS.EC2();
  const cloudwatch = new AWS.CloudWatch();

  app.use(
    bodyParser.json(),
    bodyParser.urlencoded({ extended: false }),
    express.static(path.join(__dirname, 'build', 'index.html')));

  app.use((req, res, next) => {
    res.header({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers':'Origin, X-Requested-With, Content-Type, Accept'
    });
    next();
  });

  app.get('/EC2info', function(req, res) {

    let params = {
      Filters: [
        {
          Name: 'instance-state-name',
          Values: ['running']
        }
        ]
      };

    ec2.describeInstances(params, (err, data) => { //retreives active EC2 instances to display

      let allEC2Inst = [];

      if (err) console.log(err, err.stack);
      // an error occurred
      else {
        for (let i = 0; i < data.Reservations.length; i++) {

          let tagsArray = data.Reservations[i].Instances[0].Tags;
          let dataProps = data.Reservations[i].Instances[0];
          let name;
          for (let j = 0; j < tagsArray.length; j++) {
            if (tagsArray[j].Key === 'Name') {
             name = tagsArray[j].Value;
            }
          }

          let ec2Instance = {
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

  app.post('/metric-data', (req, res, next) => {   // Pulls EC2 CPU Utilization Metrics

    const { serviceName, metricName, instanceId } = req.body.selectedOptions;
    let currUnits;

    if (metricName === ('NetworkIn' || 'NetworkOut')) {
      currUnits = 'Bytes';
    } else if (metricName === 'CPUUtilization') {
      currUnits = 'Percent';
    }

    let params = {
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
      //retrives data for selected instance
      if (err) console.log(err, err.stack);
      // an error occurred
      else {
        return res.json(data.MetricDataResults[0]);
      }
    });
  });

  app.listen(8080, (err) => {
    //hosts server on local port 8080
    if(err) throw err;

  console.log('your arke dashboard is now hosted on localhost 8080')
  });

}

module.exports = useAccessObject;
