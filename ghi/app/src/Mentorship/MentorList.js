import React, {useState, useEffect} from "react";
import SuccessMessage from "./SuccessMessage";
import MentorForm from "./MentorForm";


function MentorList(props){
    const token = props.token;
    const [mentorships, setMentorships] = useState([]);
    const [successMessage, setSuccessMessage] = useState();
    const [shouldLoadList, setShouldLoadList] = useState();

    useEffect(()=>{
        const getList = async ()=> {
            const listResponse = await fetch(`${process.env.REACT_APP_MENTORSHIP_HOST}/api/mentorship/`,{
                headers: {
                    authorization:`Bearer ${token}`,
                }
            });
            const mentorshipsData = await listResponse.json();
            setMentorships(mentorshipsData)
        };
        getList();
    }, [shouldLoadList, token]);


    const signUpClick = async (mentorshipId)=> {
      const updateUrl = `${process.env.REACT_APP_MENTORSHIP_HOST}/api/mentorship/`+mentorshipId;
      const fetchConfigEvent = {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      };
      const response = await fetch(updateUrl, fetchConfigEvent);
      if (response.ok) {
        setSuccessMessage(mentorshipId);
      }
    };

    return(

    <div>
      <MentorForm token={token} setShouldLoadList={setShouldLoadList}/>
      <br></br>
      <h1 className="text-center">Sign Up for Available Mentorships Below</h1>

      <div className="col mentor-card">
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
                <button onClick={signUpClick.bind(this, mentorship.id)} className="btn btn-secondary">Book this mentor!</button>
                {(successMessage === mentorship.id) ? <SuccessMessage /> : <></>}
              </div>
              <div className="card-footer mentor-card-footer">
                Mentor: {mentorship.mentor_username}
              </div>
            </div>
        );
      })}
      </div>

    </div>
  );
}

export default MentorList;
