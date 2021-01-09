plugins: [
  `gatsby-plugin-react-helmet`,
  {
    resolve: `gatsby-source-graphql`,
    options: {
      typeName: `gatsbyappsync`,
      fieldName: `gatsbyappsync`,
      url: `https://jhgnml6n7ndmfkkzaunzzrdob4.appsync-api.us-east-2.amazonaws.com/graphql`
    },
    headers: {
      'x-api-key': 'randomkey'
    }
  }
] 