import { DynamoDB } from 'aws-sdk';
const docClient = new DynamoDB.DocumentClient();

const deleteLolly = async (lollyId: string) => {
    const params = {
        TableName: process.env.LOLLY_TABLE || "",
        Key: { id: lollyId }
    }
    try {
        await docClient.delete(params).promise()
        return lollyId
    } catch (err) {
        console.log('DynamoDB error: ', err)
        return null
    }
}

export default deleteLolly;