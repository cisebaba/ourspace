import React from "react";
import { NavLink } from "react-router-dom";
import { UpvoteButton } from "./UpvoteButton";
import DeletePostButton from "./DeletePostButton";

const PostBody = ({
  post,
  currentUsername,
  setPost,
  token,
  showNavLinks,
  hideDeleteButton,
}) => {
  return (
    <div key={post.post_id} className="card mb-3 shadow">
      <div className="card-body">
        <h5 className="card-title">
          {" "}
          {showNavLinks ? (
            <NavLink to={"/posts/" + post.post_id}>{post.title}</NavLink>
          ) : (
            <>
              <div className="card-title">
                <NavLink to={"/posts/new/"}>Create new post</NavLink>
              </div>
              <h2 className="card-header">
                {post.title}{" "}
                {hideDeleteButton ? (
                  <></>
                ) : (
                  <DeletePostButton token={token} postId={post.post_id} />
                )}
              </h2>
            </>
          )}
        </h5>
        <h6 className="card-subtitle mb-2 text-muted">
          Created on:&nbsp;
          {new Date(post.created_on).toLocaleDateString()}
        </h6>
        <p className="card-text">{post.text}</p>
      </div>
      <div className="card-footer">
        {showNavLinks ? (
          <NavLink to={"/posts/" + post.post_id}>Comments</NavLink>
        ) : (
          ""
        )}
        <UpvoteButton
          token={token}
          postId={post.post_id}
          upvoteCount={post.upvote_count}
          userPostUpvoteCount={post.user_upvoted}
          setPostUpvoteCount={(postUpvoteCount, userPostUpvoteCount) => {
            let newPost = { ...post };
            newPost.upvote_count = postUpvoteCount;
            newPost.user_upvoted = userPostUpvoteCount;
            setPost(newPost);
          }}
        />
        {/* <div>
          {showDeleteButton ? <DeletePostButton token={token} /> : <></>}
        </div> */}
      </div>
    </div>
  );
};

export default PostBody;
