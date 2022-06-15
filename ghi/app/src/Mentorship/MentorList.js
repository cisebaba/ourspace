import React, {useState, useEffect} from "react";

function MentorList(props){
    const token = props.token;
    const [mentorships, setMentorships] = useState([]);

    useEffect(()=>{
        const getList = async ()=> {
            const listResponse = await fetch("http://localhost:8050/api/mentorship/",{
                headers: {
                    authorization:`Bearer ${token}`,
                }
            });
            const mentorshipsData = await listResponse.json();
            setMentorships(mentorshipsData)
        };
        getList();
    }, []);

    return(
    <div className="col">
      {mentorships.map(mentorship => {
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
              <a href="#" className="btn btn-primary">Sign me up!</a>
            </div>
            <div className="card-footer">
              Mentor: {mentorship.mentor_username}
            </div>
          </div>
        );
      })}
    </div>
  );
}
export default MentorList;