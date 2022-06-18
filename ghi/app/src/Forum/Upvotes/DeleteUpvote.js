import React, { useState } from "react";
import { useParams } from "react-router-dom";

function DeleteUpvote(props) {
  const token = props.token;
  const [deleteUpvoteState, setDeleteUpvoteState] = useState({
    post_upvote_id: "",
    post_id: "",
    upvoter: "",
  });

  const params = useParams();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {}; //upvotedeleteState;
    console.log("datafordeletedupvote", data);
    const delete_upvote = {
      post_upvote_id: data.post_upvote_id,
      post_id: data.post_id,
      upvoter: data.upvoter,
    };

    const deleteupvoteUrl = `http://localhost:8090/api/posts/${params.post_id}/upvote/`;
    const fetchConfigEvent = {
      method: "DELETE",
      body: JSON.stringify(delete_upvote),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(deleteupvoteUrl, fetchConfigEvent);

    if (response.ok) {
      setDeleteUpvoteState({
        post_upvote_id: "",
        post_id: "",
        upvoter: "",
      });
    }
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setDeleteUpvoteState({
      ...deleteUpvoteState,
      [event.target.name]: value,
    });
  };
}

export default DeleteUpvote;
