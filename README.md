# Comparing the Serverless framework with AWS SAM
This repository contains both a [Serverless](https://www.serverless.com) and a [SAM](https://github.com/awslabs/serverless-application-model) infrastructure template for generating the following infrastructure:

![Serverless S3 upload architecture](https://sanderknape.com/wp-content/uploads/2017/11/serverless_application_architecture.png)

The full setup is explained in my blog post: [Comparing AWS SAM with Serverless framework](https://sanderknape.com/2018/02/comparing-aws-sam-with-serverless-framework).

## Installation

Make sure you have configured AWS credentials for your account. These credentials must have the permissions to create the resources defined in the stacks.

Please note that all Lambda function assume to be ran in the `eu-west-1` region. You must change the NodeJS code to reflect the correct region. Find the following line:

`aws.config.update({region: 'eu-west-1'});`
### Serverless

Deploy the [serverless.yaml](/serverless.yaml) file through the following steps;

1. If required, change the region to the region you wish to use (line 7)
2. Replace `unique_bucket_name` and `your_email_address` with proper values. The bucket shouldn't yet exist. Your e-mail adress is used to attach it to an SNS topic.
3. Run `serverless deploy -v`. This will generate a CloudFormation stack that is deployed to your AWS account. You will receive an e-mail that you are now subscribed to an SNS topic.

Run `serverless remove` to destroy the stack.

### Serverless Application Model (SAM)

Deploy the [template.yaml](/template.yaml) file through the following steps:

1. Create a new S3 bucket in your AWS account. This is used to upload the CloudFormation and Lambda artifacts to by SAM.
2. Replace `your_email_address` with your e-mail address. This is used to attach it to an SNS topic.
3. Run the following command to generate the CloudFormation: `sam package --template-file template.yaml --s3-bucket [your_s3_bucket] --output-template-file package.yaml`. Replace `your_s3_bucket` with the name of the bucket you just created.
4. Run the following command to deploy the generated stack: `sam deploy --template-file package.yaml --stack-name serverless-application --capabilities CAPABILITY_IAM`

Run `aws cloudformation delete-stack --stack-name serverless-application` to destroy the stack.
