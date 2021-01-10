import { DynamoDB, Response } from 'aws-sdk';
import { resolve } from 'dns';
const docClient = new DynamoDB.DocumentClient();
import Lolly from './lolly';
var https = require('https');

const options = {
  hostname: 'webhooks.amplify.us-east-2.amazonaws.com',
  path: '/prod/webhooks?id=12de7c27-7933-4a6a-9b42-1a0ab066d91b&token=y2MId90A0qIWnftoZNCpgeC2dIZwpgECSF6l4z9Eto',
  method: 'POST'
};


const createLolly = async (lolly: Lolly) => {
  const params = {
    TableName: process.env.LOLLY_TABLE || "",
    Item: lolly
  }
  try {
    const req = https.request(options, (res: any) => {
      res.setEncoding('utf8');
    });
    req.end();
    await docClient.put(params).promise();
    return lolly;
  } catch (err) {
    console.log('DynamoDB error: ', err);
    return null;
  }
}

export default createLolly;