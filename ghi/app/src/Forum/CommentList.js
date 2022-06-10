import React, { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";

const CommentListBody = ({ comments }) => {
  return (
    <div className="col">
      <h5>Comments</h5>
      <NavLink to={"comment/form"}>Add a comment</NavLink>
      {comments.map((comment) => {
        return (
          <div key={comment.comment_id} className="card mb-3 shadow">
            <div className="card-body">
              <h5 className="card-text">{comment.text}</h5>
              <h6 className="card-subtitle mb-2 text-muted">
                {new Date(comment.created_on).toLocaleDateString()}
                &nbsp; at {new Date(comment.created_on).toLocaleTimeString()}
              </h6>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const CommentList = () => {
  const params = useParams();
  const [commentList, setCommentList] = useState(null);

  useEffect(() => {
    const getCommentsData = async () => {
      const commentsResponse = await fetch(
        `http://localhost:8090/api/posts/${params.post_id}/comments/`
      );
      const commentsData = await commentsResponse.json();
      setCommentList(commentsData);
    };
    getCommentsData();
  }, []);
  if (commentList === null) {
    return "loading";
  }
  return <CommentListBody comments={commentList} />;
};

export default CommentList;
