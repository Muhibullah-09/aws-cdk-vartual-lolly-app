import { DynamoDB } from 'aws-sdk';
const docClient = new DynamoDB.DocumentClient();
import Lolly from './lolly';
const https = require('https');


const createLolly = async(lolly: Lolly) => {
    const params = {
        TableName: process.env.LOLLY_TABLE || "",
        Item: lolly
    }
    try {
        await docClient.put(params).promise();
        https.post("https://webhooks.amplify.us-east-2.amazonaws.com/prod/webhooks?id=1212ef11-a6b8-420a-b41a-cd659d50a00d&token=MaBrr788hqGtoqIbpGffhLhdgOiw2WPiItBj3gx9I")
        .then(function (response: any) {
          console.log(response);
        })
        .catch(function (error: any) {
          console.error(error);
        });
        return lolly;
    } catch (err) {
        console.log('DynamoDB error: ', err);
        return null;
    }
}

export default createLolly;