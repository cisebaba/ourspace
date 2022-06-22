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
        <table className='table table-striped'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Starts</th>
              <th>Ends</th>
              <th>Description</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {events.map(event => {
              const start_date = new Date(event.starts).toLocaleDateString();
              const start_time = new Date(event.starts).toLocaleTimeString([], {timeStyle: 'short'});
              const end_date = new Date(event.ends).toLocaleDateString();
              const end_time = new Date(event.ends).toLocaleTimeString([], {timeStyle: 'short'});


              return (
                <tr key={event.href}>
                  <td>{event.name}</td>
                  <td>{start_date} {start_time}</td>
                  <td>{start_date} {start_time}</td>
                  <td>{event.description}</td>
                  <td>{event.location.name}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </>
    );
  }
  

export default EventsList