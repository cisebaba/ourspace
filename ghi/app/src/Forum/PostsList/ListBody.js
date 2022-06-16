import React from "react";
import { NavLink } from "react-router-dom";

const PostListBody = ({ post }) => {
  return (
    <div key={post.post_id} className="card mb-3 shadow">
      <div className="card-body">
        <h5 className="card-title">
          {" "}
          <NavLink to={"/posts/" + post.post_id}>{post.title}</NavLink>
        </h5>
        <h6 className="card-subtitle mb-2 text-muted">
          Created on:&nbsp;
          {new Date(post.created_on).toLocaleDateString()}
        </h6>
        <p className="card-text">{post.text}</p>
      </div>
      <div className="card-footer">
        <NavLink to={"/posts/" + post.post_id}>
          <button>Comments</button>
        </NavLink>
        <button>{post.upvote_count} upvotes</button>
      </div>
    </div>
  );
};

const PostListDetail = ({ post }) => {
  return <PostListBody post={post} />;
};

export default PostListDetail;
