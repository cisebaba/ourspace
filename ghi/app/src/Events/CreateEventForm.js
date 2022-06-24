import React, { useState, useEffect } from 'react' ;
// import { Navigate } from 'react-router-dom';

function EventForm(props) {
    const token = props.token
    const setLoadList = props.setLoadList;
    const [stateEvent, setStateEvent ] = useState({
        name : "",
        starts : "",
        ends : "",
        description: "",
        location_name:"",
        location_city:"",
        location_state:"",
    })
    const [stateStates, setStateStates] = useState([])

    useEffect(() => {
        const getStatesData = async () => {
            const statesResponse = await fetch(
                `${process.env.REACT_APP_EVENTS_HOST}/api/states/`
            );
            const statesData = await statesResponse.json();
            setStateStates(statesData.states)
        };

        getStatesData();
    }, []) ;

    const handleSubmit = async event => {
        event.preventDefault();
        const data = stateEvent ;
        const new_data = {
            name : data.name,
            starts : data.starts,
            ends : data.ends,
            description: data.description,
            location: {
                name:data.location_name,
                city: data.location_city,
                state: data.location_state,
            }
        }

        const eventsUrl = `${process.env.REACT_APP_EVENTS_HOST}/api/events/`;
        const fetchConfigEvent = {
            method: "POST", 
            body: JSON.stringify(new_data), 
            credentials:"include",
            headers : {
                "Content-Type" : "application/json",
                "authorization" : `Bearer ${token}`
            }
        };
        const response = await fetch(eventsUrl, fetchConfigEvent );

        if (response.ok){
            const record = await response.json();
            setLoadList(record.href);
            setStateEvent({
                name : "",
                starts : "",
                ends : "",
                description: "",
                location_name:"",
                location_city:"",
                location_state:"",
            });
        }
    };

    const handleChange = event => {
        const value = event.target.value ;
        setStateEvent({
            ...stateEvent,
            [event.target.name]: value,
        })
        
    };

    return (
        <div className="row">
            <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
                <h1>Create an Event!</h1>
                <form onSubmit={handleSubmit} id="create-form">
                    <div className="form-floating mb-3">
                        <input onChange={handleChange}
                        value={stateEvent.name}
                        placeholder="name"
                        required type="text"
                        name="name"
                        id="event_name"
                        className="form-control" />
                        <label htmlFor="name"> Event Name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={handleChange}
                        value={stateEvent.starts}
                        placeholder="starts"
                        required type="datetime-local"
                        name="starts"
                        id="event_starts"
                        className="form-control" />
                        <label htmlFor="starts">Starts</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={handleChange}
                        value={stateEvent.ends}
                        placeholder="ends"
                        required type="datetime-local"
                        name="ends" id="event_ends"
                        className="form-control" />
                        <label htmlFor="ends">Ends</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={handleChange}
                        value={stateEvent.description}
                        placeholder="description"
                        required type="text"
                        name="description"
                        id="description"
                        className="form-control" />
                        <label htmlFor="description">Description</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={handleChange} 
                        value={stateEvent.location_name} 
                        placeholder="venue" 
                        required type="text" 
                        name="location_name" 
                        id="venue" 
                        className="form-control" />
                        <label htmlFor="venue">Venue</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={handleChange} 
                        value={stateEvent.location_city} 
                        placeholder="city" 
                        required type="text" 
                        name="location_city" 
                        id="city" 
                        className="form-control" />
                        <label htmlFor="city">City</label>
                    </div>
                    <div className="mb-3">
                        <select onChange={handleChange} 
                        value={stateEvent.location_state} 
                        required name="location_state" 
                        id="state" 
                        className="form-select">
                        <option value="">Choose a State</option>
                        {stateStates.map(state => {
                            return (
                            <option key={state.name} value={state.abbreviation}>{state.name}</option>
                            )
                         })}
                        </select>
                    </div>
                    <button className="btn btn-primary">Add</button>
                </form>
            </div>
            </div>
        </div>
    )
};

export default EventForm;
