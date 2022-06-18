import React from "react";
import PostsList from "./PostsList/Post";

//pass in currentuserid at some point??
const ForumApp = (props) => {
  const token = props.token;
  return (
    <div>
      <h1>OurForum</h1>
      <PostsList token={token} />
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
