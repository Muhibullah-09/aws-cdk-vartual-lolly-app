// const path = require("path");
// exports.createPages = async ({ graphql, actions }) => {
//   const { createPage } = actions;

//   const result = await graphql(`
//     query MyQuery {
//       GetLollies {
//         getLollies {
//           id
//           colorTop
//           colorMiddle
//           colorBottom
//           recipient
//           message
//           sender
//           lollyPath
//         }
//       }
//     }
//   `);

//   console.log(result);
//   result.data.GetLollies.getLollies.map((data) => {
//     createPage({
//       path: `${data.lollyPath}`,
//       component: path.resolve("./src/Template/Template.tsx"),
//       context: {
//         data: data,
//       },
//     });
//   });
// }; 