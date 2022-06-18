import React from "react";
import { NavLink } from "react-router-dom";
import { UpvoteButton } from "../Upvotes/UpvoteButton";

const PostListBody = ({ post, setPost, token }) => {
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
        <UpvoteButton
          token={token}
          postId={post.post_id}
          upvoteCount={post.upvote_count}
          setPostUpvoteCount={(postUpvoteCount) => {
            let newPost = { ...post };
            newPost.upvote_count = postUpvoteCount;
            setPost(newPost);
          }}
        />
      </div>
    </div>
  );
};

const PostListDetail = ({ post, setPost, token }) => {
  return <PostListBody post={post} setPost={setPost} token={token} />;
};

export default PostListDetail;
