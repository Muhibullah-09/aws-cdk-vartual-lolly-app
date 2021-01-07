import { DynamoDB } from 'aws-sdk';
const docClient = new DynamoDB.DocumentClient();

const getLolly = async () => {
    const params = {
        TableName: process.env.LOLLY_TABLE || "",
    }
    try {
        const data = await docClient.scan(params).promise()
        return data.Items
    } catch (err) {
        console.log('DynamoDB error: ', err)
        return null
    }
}

export default getLolly;