import React, { useState } from "react";
import { useParams } from "react-router-dom";

function CommentForm() {
  const [stateComment, setStateComment] = useState({
    comment_id: "",
    text: "",
    created_on: "",
    post_id: "",
  });

  const params = useParams();
  console.log("params", params);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = stateComment;
    console.log("data", data);
    const new_comment = {
      comment_id: data.comment_id,
      text: data.text,
      created_on: data.created_on,
      post_id: data.post_id,
    };

    const commentsUrl = `http://localhost:8090/api/posts/${params.post_id}/comment/`;
    console.log("commentsUrl", commentsUrl);
    const fetchConfigEvent = {
      method: "POST",
      body: JSON.stringify(new_comment),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(commentsUrl, fetchConfigEvent);

    if (response.ok) {
      setStateComment({
        comment_id: "",
        title: "",
        text: "",
        created_on: "",
      });
    }
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setStateComment({
      ...stateComment,
      [event.target.name]: value,
    });
  };

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Add a Comment</h1>
          <form onSubmit={handleSubmit} id="create-form">
            <div className="form-floating mb-3">
              <input
                onChange={handleChange}
                value={stateComment.text}
                placeholder="text"
                required
                type="text"
                name="text"
                id="text"
                className="form-control"
              />
              <label htmlFor="name">Comment</label>
            </div>
            <button className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CommentForm;
