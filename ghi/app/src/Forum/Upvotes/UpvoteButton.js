import React from "react";

export function UpvoteButton({
  postId,
  upvoteCount,
  setPostUpvoteCount,
  token,
}) {
  async function AddUpvote() {
    const upvoteUrl = `http://localhost:8090/api/posts/${postId}/upvote/`;
    const fetchConfigEvent = {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(upvoteUrl, fetchConfigEvent);
    let responseJson = await response.json();

    if (response.ok) {
      setPostUpvoteCount(responseJson.upvote_count);
    }
  }
  return <button onClick={AddUpvote}>{upvoteCount} votes</button>;
}
