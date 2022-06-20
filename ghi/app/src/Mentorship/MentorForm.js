import React, { useState } from "react";
import SuccessMessage from "./SuccessMessage";

function MentorForm(props) {
  const token = props.token;
  const [successMessage, setSuccessMessage] = useState(false);
  const [stateMentorship, setStateMentorship] = useState({
    description: "",
    job_title: "",
    availability: "",
    booked: "",
    mentor_username: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = stateMentorship;
    const newMentorship = {
        description: data.description,
        job_title: data.job_title,
        availability: data.availability,
        booked: data.booked,
        mentor_username: data.mentor_username,
    };

    const mentorshipUrl = "http://localhost:8050/api/mentorship/";
    const fetchConfigEvent = {
      method: "POST",
      body: JSON.stringify(newMentorship),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(mentorshipUrl, fetchConfigEvent);

    if (response.ok) {
      setStateMentorship({
        description: "",
        job_title: "",
        availability: "",
        booked: "",
        mentor_username: "",
      });
      setSuccessMessage(true);

    }
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setStateMentorship({
      ...stateMentorship,
      [event.target.name]: value,
    });
  };

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Create a New Mentorship</h1>
          <form onSubmit={handleSubmit} id="create-form">
            <div className="form-floating mb-3">
              <textarea
                onChange={handleChange}
                value={stateMentorship.description}
                placeholder="Add a description"
                required
                type="text"
                name="description"
                id="description"
                className="form-control">
              </textarea>
              <label htmlFor="description">Mentorship Description</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleChange}
                value={stateMentorship.job_title}
                placeholder="Job title"
                required
                type="text"
                name="job_title"
                id="job_title"
                className="form-control"
              />
              <label htmlFor="job_title">Job Title or Qualifications</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleChange}
                value={stateMentorship.availability}
                placeholder="Availability"
                required
                type="text"
                name="availability"
                id="availability"
                className="form-control"
              />
              <label htmlFor="availability">Mentor's Availability</label>
            </div>
            <button className="btn btn-primary">Create</button>
            {(successMessage === true) ? <SuccessMessage /> : <></>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default MentorForm;
