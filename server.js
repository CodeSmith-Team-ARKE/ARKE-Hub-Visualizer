const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

// https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Config.html
const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-2' });

// console.log(AWS.config);
const cloudwatch = new AWS.CloudWatch();
const ec2 = new AWS.EC2();

// logs the current S3 buckets
// var s3 = new AWS.S3();
// s3.listBuckets({}, function(err, data) {
//   if (err) console.log(err, err.stack);
//   else console.log(data);
// });

// var params = {
//   DashboardName: 'Test-Board' /* required */
// };
// cloudwatch.getDashboard(params, function(err, data) {
//   if (err) console.log(err, err.stack);
//   // an error occurred
//   else console.log(data); // successful response
// });

var params = {};
ec2.describeAccountAttributes(params, function(err, data) {
  if (err) console.log(err, err.stack);
  else {
    console.log('================EC2 Account Data Object============ \n', data);
    console.log(
      '================EC2 Data - Supported Platforms============ \n',
      data.AccountAttributes[0].AttributeValues
    );
  }
});

// < =================================================== > //
app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 8080);
console.log('Production build running on ' + 8080);
