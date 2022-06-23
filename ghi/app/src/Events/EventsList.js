import React, { useState, useEffect } from 'react' ;
import CreateEventForm from './CreateEventForm';

function EventsList(props) {
    const token = props.token;
    const [events, setEvents] = useState([]) ;

    useEffect(() => {
        const getEventsData = async () => {
            const eventsResponse = await fetch(
              `${process.env.REACT_APP_EVENTS_HOST}/api/events/`,
              {headers: {
                authorization:`Bearer ${token}`,
            }}
            );
            const eventsData = await eventsResponse.json();
            setEvents(eventsData.events)
        };

        getEventsData();
    }, []) ;
    
    

    return (
        <>

        { token ? <CreateEventForm token={props.token} /> : null}
      <br></br>
        <h1>Events</h1>
        <div className="row">
            {events.map(event => {
              const start_date = new Date(event.starts).toLocaleDateString();
              const start_time = new Date(event.starts).toLocaleTimeString([], {timeStyle: 'short'});
              const end_date = new Date(event.ends).toLocaleDateString();
              const end_time = new Date(event.ends).toLocaleTimeString([], {timeStyle: 'short'});


              return (
                <div key={event.href} className="card mb-3 shadow">
                  <div className="card-body">
                    <h5 className="card-title">{event.name}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">
                      Location: {event.location.name}
                    </h6>
                    <p className="card-text">
                      Description: {event.description}
                    </p>
                    {/* <button onClick={signUpClick.bind(this, mentorship.id)} className="btn btn-primary">Book this mentor!</button>
                    {(successMessage === mentorship.id) ? <SuccessMessage /> : <></>} */}
                  </div>
                  <div className="card-footer">
                    When: {start_date} {start_time} - {end_date} {end_time}
                  </div>
              </div>
                // <tr key={event.href}>
                //   <td>{event.name}</td>
                //   <td>{start_date} {start_time}</td>
                //   <td>{start_date} {start_time}</td>
                //   <td>{event.description}</td>
                //   <td>{event.location.name}</td>
                // </tr>
              );
            })}
            </div>
        </>
    );
  }
  

export default EventsList