import React from "react";
// import { useNavigate } from "react-router-dom";
import { StyledDeleteButton } from "../styling/styling";

function DeletePostButton({ token, postId }) {
  async function DeletePost() {
    const deletePostUrl = `${process.env.REACT_APP_FORUM_HOST}/api/posts/${postId}/`;
    const fetchConfigEvent = {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    };
    // const navigate = useNavigate();
    const response = await fetch(deletePostUrl, fetchConfigEvent);
    await response.json();
  }

  return (
    <StyledDeleteButton style={{ float: "right" }} onClick={DeletePost}>
      Delete Post
    </StyledDeleteButton>
  );
}

export default DeletePostButton;
