import React, { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import CommentList from "./CommentList";
import { UpvoteButton } from "./Components/UpvoteButton";

//DON"T PUT COMMENTS WITHIN COMPONENT BELOW HERE

const PostDetailBody = ({ post, setPost, token }) => {
  return (
    <div key={post.post_id} className="card mb-3 shadow">
      <div className="card-body">
        <h2 className="card-title">{post.title}</h2>
        <h6 className="card-subtitle mb-2 text-muted">
          Created on:&nbsp;
          {new Date(post.created_on).toLocaleDateString()}
          &nbsp; at {new Date(post.created_on).toLocaleTimeString()}
        </h6>
        <p className="card-text">{post.text}</p>
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
      </div>
    </div>
  );
};

const PostDetail = (props) => {
  const token = props.token;
  const params = useParams();
  const [postDetail, setPostDetail] = useState(null);

  useEffect(() => {
    const getPostsData = async () => {
      const postsResponse = await fetch(
        `http://localhost:8090/api/posts/${params.post_id}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      const postsData = await postsResponse.json();
      setPostDetail(postsData);
    };
    getPostsData();
  }, []);
  if (postDetail === null) {
    return "loading";
  }

  return (
    <>
      <PostDetailBody post={postDetail} token={token} setPost={setPostDetail} />
      <CommentList token={token} />
    </>
  );
};

export default PostDetail;

// function PostDetail() {
//     const [statePostDetail, setStatePostDetail] = useState({});

//     useEffect () => {
//         PostsList();
//     }, [statePostDetail]
//     const
// }
