import React from "react";

export function DeletePostButton({ token, postId }) {
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
    const response = await fetch(deletePostUrl, fetchConfigEvent);
    let responseJson = await response.json();
  }

  return (
    <button className="btn btn-outline-danger" onClick={DeletePost}>
      Delete Post
    </button>
  );
}

export default DeletePostButton;
