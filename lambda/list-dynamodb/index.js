'use strict';

var aws = require('aws-sdk');
aws.config.update({region: 'eu-west-1'});

var dynamodb = new aws.DynamoDB();

exports.handler = (event, context, callback) => {

  let params = {
    TableName: process.env.DynamoDBTableName,
  };

  dynamodb.listTables({}, function(err, data) {
    let response = {
      statusCode: err ? 500 : 200,
      body: err ? err.stack : "",
    };
    callback(null, response);
  });
}
