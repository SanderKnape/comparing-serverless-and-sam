'use strict';

var aws = require('aws-sdk');
aws.config.update({region: 'eu-west-1'});

var sns = new aws.SNS();

exports.handler = (event, context, callback) => {

  event.Records.forEach(function(record) {
    const key = record.s3.object.key;

    // example key: image-XXX.png
    const dotIndex = key.lastIndexOf(".");
    const id = key.substring(6, dotIndex);

    const params = {
      Message: `The image with ID '${id}' was succesfully generated`,
      TopicArn: process.env.SNSTopicARN
    };

    sns.publish(params, function(err, data) {
      callback(null, '');
    });
  });
}
