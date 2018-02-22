'use strict';

var gm = require('gm').subClass({ imageMagick: true });
var aws = require('aws-sdk');
var s3 = new aws.S3();
var dynamodb = new aws.DynamoDB();

exports.handler = (event, context, callback) => {

  event.Records.forEach(function(record) {
    if(record.eventName == "INSERT") {
      const id = record.dynamodb.NewImage.id.N;

      gm(200, 30, '#fff')
        .drawText(10, 20, "Id number: " + id)
        .border(2, 2).borderColor('#ff0000')
        .toBuffer('PNG', function(err, buffer) {

          const params = {
            Bucket: process.env.S3BucketName,
            Key: `image-${id}.png`,
            Body: buffer
          }

          s3.putObject(params, function(err, data) {
            let params = {
              TableName: process.env.DynamoDBTableName,
              Item: {
                "id": {
                  N: id
                },
                "status": {
                  S: "Processed"
                }
              }
            };

            if(err) {
              params.Item.status.S = "Failed";
            }

            dynamodb.putItem(params, function(err, data) {
              let response = {
                statusCode: err ? 500 : 200,
                body: err ? err.stack : '',
              };

              callback(null, '');
            });
          });
        });
    }
  });
}
