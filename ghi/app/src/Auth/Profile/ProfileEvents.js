import React, {useState, useEffect } from "react";

function ProfileEvents(props){
    const token = props.token;
    const location = props.state;
    const [events, setEvents]= useState([]);

    useEffect(()=>{
        const getEvents = async ()=>{
            const listResponse = await fetch(`${process.env.REACT_APP_ACCOUNTS_HOST}/profile/events/`,{
                headers: {
                    authorization:`Bearer ${token}`,
                }
            });

            const eventsData = await listResponse.json();
            console.log(eventsData)
            setEvents(eventsData);  

        };
        if(token){
            getEvents();
        }
    },[token]);

    
    return(
        // <p>
        //     Hello {mentorships[0]["job_title"]}
        // </p>
        <div className="all-mentorships">
          <div className="col">
          <h1>
            Events Near Me!
          </h1>
            {events.filter(e => e.location === location).map(event => {
              return (
                <div key={event.href} className="card mb-3 shadow">
                  <div className="card-body">
                    <h5 className="card-title">{event.name}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">
                      Start: {event.starts}
                    </h6>
                    <p className="card-text">
                      Event description: {event.description}
                    </p>
                    {/* <button onClick={signUpClick.bind(this, mentorship.id)} className="btn btn-primary">Book this mentor!</button>
                    {(successMessage === mentorship.id) ? <SuccessMessage /> : <></>} */}
                  </div>
                  <div className="card-footer">
                    Event start: {new Date(event.starts).toLocaleDateString()}
                    <br></br>
                    Event end: {new Date(event.ends).toLocaleDateString()}
                  </div>
                </div>
            );
          })}
          </div>
        </div>
      );
}

export default ProfileEvents;