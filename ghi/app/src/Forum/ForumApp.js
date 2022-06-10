import React from "react";
import PostsList from "./ListPosts/ListPosts";

//pass in currentuserid at some point??
const ForumApp = () => {
  return (
    <div>
      <h1>OurForum</h1>
      <PostsList />
    </div>
  );
};

export default ForumApp;

// function ForumApp() {
//     const [forum, setForum] = useState([PostsList]);

// }

//if state is postdetailid, render detail
//if not render postlist
//on click- render detail view
