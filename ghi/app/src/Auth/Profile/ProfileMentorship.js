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
    
    const deleteMentor = async id => {
      await fetch(`${process.env.REACT_APP_MENTORSHIP_HOST}/api/mentorship/${id}/`, {
        method: "DELETE",
        headers: {
          authorization:`Bearer ${token}`,
        },
        credentials: "include",
      });
    }
   
    
    return(
      <div className="container-md mb-5 ">
      <div className="accordion" id="accordionExample">
        <div className="card">
          <div className="card-header" id="headingTwo">
            <h5 className="mb-0">
              <button className="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
              Mentorships as Mentor
              </button>
            </h5>
          </div>
          <div id="collapseTwo" className="collapse show" aria-labelledby="headingTwo" data-parent="#accordionExample">
            <div className="card-body">
            {mentorships.filter(m => m.mentor_username === username).map((mentorship) => {
              return (
                <div key={mentorship.id} className="card mb-3 shadow">
                  <div className="card-body">
                    <h5 className="card-title">{mentorship.description}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">
                      Available times: {mentorship.availability}
                    </h6>
                    <p className="card-text">
                      Mentor Qualifications: {mentorship.job_title}
                    </p>
                   
                  </div>
                  <div className="card-footer">
                    Mentor: {mentorship.mentor_username}
                  </div>
                  <button onClick={()=>deleteMentor(mentorship.id)}>Cancel</button>
                </div>
            );
          })}
            </div>
          </div>
        </div>
        </div>
        <div className="container-md mb-5 mt-5">
        <div className="accordion" id="accordionExample">
        <div className="card">
          <div className="card-header" id="headingTrio">
            <h5 className="mb-0">
              <button className="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseTrio" aria-expanded="true" aria-controls="collapseTrio">
              Mentorships as Mentee
              </button>
            </h5>
          </div>
          <div id="collapseTrio" className="collapse show" aria-labelledby="headingTrio" data-parent="#accordionExample">
            <div className="card-body">
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
                  </div>
                  <div className="card-footer">
                    Mentor: {mentorship.mentor_username}
                  </div>
                </div>
            );
          })}
            </div>
          </div>
        </div>
        </div>
        </div>
        </div>
      );
}

export default MentorshipProfile;