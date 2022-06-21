import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PostBody from "../Components/PostBody";
import CommentList from "../Components/CommentList";
import { getPost } from "../Api/GetPostData";

const DetailView = (props) => {
  const token = props.token;
  const [post, setPost] = useState([]);
  const params = useParams();

  useEffect(() => {
    async function initializePost() {
      let postData = await getPost({ token: token, post_id: params.post_id });
      setPost(postData);
    }
    initializePost();
  }, []);

  return (
    <div>
      <>
        <PostBody
          post={post}
          token={token}
          setPost={setPost}
          showNavLinks={false}
        />
        <CommentList token={token} />
      </>
    </div>
  );
};

export default DetailView;
