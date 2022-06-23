import React, {useState, useEffect } from "react";

function MentorshipProfile(props){
    const token = props.token;
    const username = props.username;
    const [mentorships, setMentorships]= useState([]);

    useEffect(()=>{
        const getMentorships = async ()=>{
            const listResponse = await fetch(`${process.env.REACT_APP_ACCOUNTS_HOST}/profile/mentorship/`,{
                headers: {
                    authorization:`Bearer ${token}`,
                }
            });

            const mentorshipData = await listResponse.json();
            setMentorships(mentorshipData);  

        };
        if(token){
            getMentorships();
        }
    },[token]);

    
    return(
        // <p>
        //     Hello {mentorships[0]["job_title"]}
        // </p>
        <div className="all-mentorships">
          <div className="col">
          <h1>
            Mentorships as Mentor
          </h1>
            {mentorships.filter(m => m.mentor_username === username).map((mentorship, index) => {
              return (
                <div key={index} className="card mb-3 shadow">
                  <div className="card-body">
                    <h5 className="card-title">{mentorship.description}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">
                      Available times: {mentorship.availability}
                    </h6>
                    <p className="card-text">
                      Mentor Qualifications: {mentorship.job_title}
                    </p>
                    {/* <button onClick={signUpClick.bind(this, mentorship.id)} className="btn btn-primary">Book this mentor!</button>
                    {(successMessage === mentorship.id) ? <SuccessMessage /> : <></>} */}
                  </div>
                  <div className="card-footer">
                    Mentor: {mentorship.mentor_username}
                  </div>
                </div>
            );
          })}
          </div>

          <div className="col">
          <h1>
            Mentorships as Mentee
          </h1>
            {mentorships.filter(m => m.mentee_username === username).map((mentorship, index) => {
              return (
                <div key={index} className="card mb-3 shadow">
                  <div className="card-body">
                    <h5 className="card-title">{mentorship.description}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">
                      Available times: {mentorship.availability}
                    </h6>
                    <p className="card-text">
                      Mentor Qualifications: {mentorship.job_title}
                    </p>
                    {/* <button onClick={signUpClick.bind(this, mentorship.id)} className="btn btn-primary">Book this mentor!</button>
                    {(successMessage === mentorship.id) ? <SuccessMessage /> : <></>} */}
                  </div>
                  <div className="card-footer">
                    Mentor: {mentorship.mentor_username}
                  </div>
                </div>
            );
          })}
          </div>
        </div>
      );
}

export default MentorshipProfile;