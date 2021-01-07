import { DynamoDB } from 'aws-sdk';
const docClient = new DynamoDB.DocumentClient();
import Lolly from './lolly';

const createLolly = async(lolly: Lolly) => {
    const params = {
        TableName: process.env.LOLLY_TABLE || "",
        Item: lolly
    }
    try {
        await docClient.put(params).promise();
        return lolly;
    } catch (err) {
        console.log('DynamoDB error: ', err);
        return null;
    }
}

export default createLolly;