import React, { useState, useEffect } from 'react' ;

function EventsList() {
    const [events, setEvents] = useState([]) ;

    useEffect(() => {
        const getEventsData = async () => {
            const eventsResponse = await fetch(
                "http://localhost:8000/api/events/"
            );
            const eventsData = await eventsResponse.json();
            setEvents(eventsData.events)
        };

        getEventsData();
    }, []) ;
    
    return (
        <>
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
              return (
                <tr key={event.href}>
                  <td>{event.name}</td>
                  <td>{event.starts}</td>
                  <td>{event.ends}</td>
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