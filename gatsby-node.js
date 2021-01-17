var AWS = require('aws-sdk');
exports.createPages = async ({ actions }) => {
  var docClient = new AWS.DynamoDB.DocumentClient({
    region: '',
    accessKeyId: '',
    secretAccessKey: ''
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
        path: `/${lolly.lollyPath}`,
        component: require.resolve(`./src/Template/Template.tsx`),
        context: {
          lolly
        },
      })
    })
  }
}