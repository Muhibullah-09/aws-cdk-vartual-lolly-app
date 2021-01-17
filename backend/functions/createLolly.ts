import { DynamoDB } from 'aws-sdk';
const docClient = new DynamoDB.DocumentClient();
import Lolly from './lolly';
var https = require('https');

const options = {
  hostname: '',
  path: '',
  method: ''
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