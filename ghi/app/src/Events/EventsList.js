import React, { useState, useEffect } from 'react' ;
import CreateEventForm from './CreateEventForm';

function EventsList(props) {
    const token = props.token;
    const [events, setEvents] = useState([]) ;
    const [loadList, setLoadList] = useState();

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
    }, [loadList]) ;
    

    return (
        <>
        { token ? <CreateEventForm token={props.token} setLoadList={setLoadList} /> : null}
        <br></br>
          <h1>Events</h1>
          <div className="row row-cols-1 row-cols-md-3 g-4">
              {events.map(event => {
                const start_date = new Date(event.starts).toLocaleDateString();
                const start_time = new Date(event.starts).toLocaleTimeString([], {timeStyle: 'short'});
                const end_date = new Date(event.ends).toLocaleDateString();
                const end_time = new Date(event.ends).toLocaleTimeString([], {timeStyle: 'short'});
              return (
                <div key={event.href} className="card mb-3 shadow">
                  <div className="card-body">
                  <img src={event.location.picture_url} className="card-img-top"></img>
                    <h5 className="card-title">{event.name}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">
                      {event.location.name}
                    </h6>
                    <p className="card-text">
                      {event.description}
                    </p>
                  </div>
                  <div className="card-footer">
                    {start_date} {start_time} - {end_date} {end_time}
                  </div>
              </div>
              );
            })}
            </div>
        </>
    );
  }
  

export default EventsList;