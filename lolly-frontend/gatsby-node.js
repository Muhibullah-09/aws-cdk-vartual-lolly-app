// const path = require("path");
// import { getLollies } from './src/graphql/queries';
// import { API } from 'aws-amplify';
// exports.createPages = async ({ actions }) => {
//   const { createPage } = actions;
//   const [ lollyData , setLollyData ] = React.useState(null);

// const fetchlolly = async () => {
//     try {
//       const data = await API.graphql({
//         query: getLollies,
//       })
//       setLollyData(lollyData);
//       console.log(data);
//     } catch (e) {
//       console.log(e)
//     }
//   }
//   useEffect(() => {
//     fetchlolly()
//   }, [])
//   lollyData.data.getLollies.map((data) => {
//     createPage({
//       path: `${data.lollyPath}`,
//       component: path.resolve("./src/Template/Template.tsx"),
//       context: {
//         data: data,
//       },
//     });
//   });
// };