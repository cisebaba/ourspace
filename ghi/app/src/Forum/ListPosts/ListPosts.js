import React, { useState, useEffect } from "react";
import PostListDetail from "./ListBody";

//pass in current user id
function PostsList(props) {
  const token = props.token;
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPostsData = async () => {
      const postsResponse = await fetch("http://localhost:8090/api/posts/", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      const postsData = await postsResponse.json();
      setPosts(postsData);
    };
    getPostsData();
  }, []);
  // above [] is blank cause you only want useeffect to happen once

  return (
    <div className="col">
      <h3>Posts</h3>
      {posts.map((post) => {
        return <PostListDetail key={post.post_id} post={post} />;
      })}
    </div>
  );
}
export default PostsList;
