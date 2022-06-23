import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import PostsList from "../Components/PostsList";
import { getPosts } from "../Api/GetPostsData";

const ListView = (props) => {
  console.log(props, "props!");
  const token = props.token;
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function initializePosts() {
      let posts = await getPosts({ token: token });
      setPosts(posts);
    }
    initializePosts();
  }, []);

  return (
    <div>
      <h1>OurForum</h1>
      <h6>
        <NavLink to={"/posts/new/"}>Create new post</NavLink>
      </h6>
      <PostsList token={token} posts={posts} setPosts={setPosts} />
    </div>
  );
};

export default ListView;
