'use strict';

var aws = require('aws-sdk');
var dynamodb = new aws.DynamoDB();

exports.handler = (event, context, callback) => {

  let params = {
    TableName: process.env.DynamoDBTableName,
    Item: {
      "id": {
        N: event.pathParameters['id']
      },
      "status": {
        S: "New"
      }
    }
  };

  dynamodb.putItem(params, function(err, data) {
    let response = {
      statusCode: err ? 500 : 200,
      body: err ? err.stack : '',
    };

    callback(null, response);
  });
}
