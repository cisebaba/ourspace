// import React, { useEffect } from "react";

// function getPosts(props) {
//     const token = props.token;

//     useEffect(() => {
//         const getPostsData = async () => {
//           const postsResponse = await fetch("http://localhost:8090/api/posts/", {
//             headers: {
//               authorization: `Bearer ${token}`,
//             },
//           });
//           const postsData = await postsResponse.json();
//           setPosts(postsData);
//         };
//         getPostsData();
//       }, []);

// }
