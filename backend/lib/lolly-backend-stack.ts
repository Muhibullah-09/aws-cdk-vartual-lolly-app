import * as cdk from '@aws-cdk/core';
import * as appsync from '@aws-cdk/aws-appsync';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import * as lambda from '@aws-cdk/aws-lambda';

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

    // Prints out the AppSync GraphQL endpoint to the terminal
    new cdk.CfnOutput(this, "GraphQLAPIURL", {
      value: lolly_API.graphqlUrl
    });

    // Prints out the AppSync GraphQL API key to the terminal
    new cdk.CfnOutput(this, "GraphQLAPIKey", {
      value: lolly_API.apiKey || ''
    });
  }
};