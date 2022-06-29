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
            setEvents(eventsData);  
        
        };
        if(token){
            getEvents();
        }
    },[token]);

   

    return(
      <div className="container-sm mb-5 ">
        <div className="accordion" id="accordionExample">
        <div className="card w-50" >
          <div className="card-header" id="headingOne">
            <h5 className="mb-0">
              <button className="btn btn-profile" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
              Events Near Me!
              </button>
            </h5>
          </div>

          <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
            <div className="card-body">
            {events.filter(e => e.location === location).map(event => {
                    return (
                  <div className="card mb-5 mt-5 mx-auto">
                      <div key={event.href} className="col shadow">
                        <div className="card-body">
                          <h5 className="card-title">{event.name}</h5>
                          <h6 className="card-subtitle mb-2 text-muted">
                            Start: {event.starts}
                          </h6>
                          <p className="card-text">
                            Event description: {event.description}
                          </p>
                        </div>
                        <div className="card-footer">
                          Event start: {new Date(event.starts).toLocaleDateString()}
                          <br></br>
                          Event end: {new Date(event.ends).toLocaleDateString()}
                        </div>
                      </div>
                      </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
      </div>
      );
}

export default ProfileEvents;