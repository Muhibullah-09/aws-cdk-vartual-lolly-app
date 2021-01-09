plugins: [
  `gatsby-plugin-react-helmet`,
  {
    resolve: `gatsby-source-graphql`,
    options: {
      typeName: `gatsbyappsync`,
      fieldName: `gatsbyappsync`,
      url: `https://rkullmdfrbc3be2hoxybw6xjne.appsync-api.us-east-2.amazonaws.com/graphql`,
      headers: {
        'x-api-key': 'randomkey'
      }
    }
  }
]