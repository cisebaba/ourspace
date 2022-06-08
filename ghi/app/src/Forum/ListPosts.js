import React, { useState, useEffect } from "react";

function PostsList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPostsData = async () => {
      const postsResponse = await fetch("http://localhost:8090/api/posts/");
      const postsData = await postsResponse.json();
      setPosts(postsData);
    };
    getPostsData();
  }, []);

  return (
    <div className="col">
      {posts.map((post) => {
        return (
          <div key={post.post_id} className="card mb-3 shadow">
            <div className="card-body">
              <h5 className="card-title">{post.title}</h5>
              <h6 className="card-subtitle mb-2 text-muted">
                Created on:&nbsp;
                {new Date(post.created_on).toLocaleDateString()}
              </h6>
              <p className="card-text">{post.text}</p>
            </div>
            <div className="card-footer">Comments</div>
          </div>
        );
      })}
    </div>
  );
}
export default PostsList;
