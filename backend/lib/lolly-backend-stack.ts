import * as cdk from '@aws-cdk/core';
import * as appsync from '@aws-cdk/aws-appsync';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import * as lambda from '@aws-cdk/aws-lambda';
// import * as cloudfront from "@aws-cdk/aws-cloudfront";
// import * as origins from "@aws-cdk/aws-cloudfront-origins";
// import * as s3 from "@aws-cdk/aws-s3";
// import * as s3deploy from "@aws-cdk/aws-s3-deployment";

export class LollyBackendStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    //This is Appsync graphql Api for lambda function
    const lolly_API = new appsync.GraphqlApi(this, 'Api', {
      name: 'cdk-lolly-appsync-api',
      schema: appsync.Schema.fromAsset('schema/schema.gql'),
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: appsync.AuthorizationType.API_KEY,
        },
      },
      xrayEnabled: true,
    });

    //This is lambda function
    const lollyLambda = new lambda.Function(this, 'AppSyncLollyHandler', {
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset('functions')
    });

    //Here we define our Datasource
    const lambdaDs = lolly_API.addLambdaDataSource('lambdaDatasource', lollyLambda);

    //Here we define Dynamodb construct
    const lollyTable = new dynamodb.Table(this, 'LolliesTable', {
      tableName: "Lolly_Table",
      partitionKey: {
        name: 'id',
        type: dynamodb.AttributeType.STRING,
      },
    });
    lollyTable.grantFullAccess(lollyLambda);

    lollyLambda.addEnvironment('LOLLY_TABLE', lollyTable.tableName);

    //Here we define resolvers for queries and for mutations
    lambdaDs.createResolver({
      typeName: "Query",
      fieldName: "getLollies"
    });

    lambdaDs.createResolver({
      typeName: "Mutation",
      fieldName: "createLolly"
    });

    lambdaDs.createResolver({
      typeName: "Mutation",
      fieldName: "deleteLolly"
    });

    // Prints out the AppSync GraphQL endpoint to the terminal
    new cdk.CfnOutput(this, "GraphQLAPIURL", {
      value: lolly_API.graphqlUrl
    });

    // Prints out the AppSync GraphQL API key to the terminal
    new cdk.CfnOutput(this, "GraphQLAPIKey", {
      value: lolly_API.apiKey || ''
    });

    // //define s3 bucket 
    // const lollyBucket = new s3.Bucket(this, "lollyBucket", {
    //   versioned: true,
    // });

    // lollyBucket.grantPublicAccess(); // website visible to all.

    // // create a CDN to deploy your website
    // const distribution = new cloudfront.Distribution(this, "lollyDistribution", {
    //   defaultBehavior: {
    //     origin: new origins.S3Origin(lollyBucket),
    //   },
    //   defaultRootObject: "index.html",
    // });


    // // Prints out the web endpoint to the terminal
    // new cdk.CfnOutput(this, "DistributionDomainName", {
    //   value: distribution.domainName,
    // });


    // // housekeeping for uploading the data in bucket 
    // new s3deploy.BucketDeployment(this, "DeploybookmarkApp", {
    //   sources: [s3deploy.Source.asset("../lolly-frontend/public")],
    //   destinationBucket: lollyBucket,
    //   distribution,
    //   distributionPaths: ["/*"],
    // });
  }
};