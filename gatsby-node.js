var AWS = require('aws-sdk');
exports.createPages = async ({ actions }) => {
  var docClient = new AWS.DynamoDB.DocumentClient({
    region: 'us-east-2',
    accessKeyId: 'AKIAYOMOUGMGEYNM6E7J',
    secretAccessKey: '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'
  });

  const params = {
    TableName: 'Lolly_Table',
  };

  try {
    var result = await docClient.scan(params).promise();
    console.log(result);
  }
  catch (error) {
    console.log(error)
  }

  const { createPage } = actions
  if (result) {
    result.Items.forEach((lolly) => {
      createPage({
        path: `lollies/${lolly.lollyPath}`,
        component: path.resolve(`./src/Template/Template.tsx`),
        context: {
          lolly
        },
      })
    })
  }
}