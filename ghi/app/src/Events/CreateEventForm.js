import React, { useState } from 'react' ;

function EventForm() {
    const [stateEvent, setStateEvent ] = useState({
        name : "",
        starts : "",
        ends : "",
        description: "",
        locations: "",
        locations: []
    })
    const [stateLoc, setStateLoc] = useState({
        name: "",
        city:"",
        state:"",
        state: []

    })
    const [successfulSubmit, setSuccessfulSubmit] = useState(false);
    
    // if the submission was successful, a message appears
    let formClasses = "";
    let alertClasses = "alert alert-success d-none mb-3";
    let alertContainerClasses = "d-none";

    const handleSubmit = async event => {
        event.preventDefault();
        const data = stateEvent ;

        const eventsUrl = "http://localhost:8000/api/events/" ;
        const fetchConfig = {
            method: "POST", 
            body: JSON.stringify(data), 
            headers : {
                "Content-Type" : "application/json",
            }
        };
        const response = await fetch(eventsUrl, fetchConfig );

        if (response.ok) {
            setStateEvent({
            name : "",
            starts : "",
            ends : "",
            description: "",
            locations: "",
            locations: [],
        });
        setSuccessfulSubmit(true);
        }
    } ;
    
    const handleChange = event => {
        const value = event.target.value ;
        setStateEvent({
            ...stateEvent,
            [event.target.name]: value,
        })
    };
    const handleChangeLoc = event=> {
        const value = event.target.value;
        setStateLoc({
            ...stateLoc,
            [event.target.name]:value,
        })
    }

    if (successfulSubmit) {
        formClasses = "d-none";
        alertClasses = "alert alert-success mb-3";
        alertContainerClasses = "";
      }

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
                        <input onChange={handleChangeLoc} 
                        value={stateLoc.name} 
                        placeholder="name-venue" 
                        required type="text" 
                        name="name-venue" 
                        id="name-venue" 
                        className="form-control" />
                        <label htmlFor="name-venue">Venue</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={handleChangeLoc} 
                        value={stateLoc.city} 
                        placeholder="name-city" 
                        required type="text" 
                        name="name-city" 
                        id="name-city" 
                        className="form-control" />
                        <label htmlFor="name-city">City</label>
                    </div>
                    <div className="mb-3">
                        <select onChange={handleChangeLoc} value={stateLoc.state} required name="state" id="state" className="form-select">
                        <option value="">Choose a State</option>
                        {stateEvent.locations.map(location => {
                            return (
                            <option key={location.states.id} value={location.id}>{location.name}</option>
                            )
                         })}
                        </select>
                    </div>
                    {/* <div className="form-floating mb-3">
                        <input onChange={handleChangeReason} value={state.reason} placeholder="reason" required type="text" name="reason" id="reason" className="form-control" />
                        <label htmlFor="reason">Purpose of Visit</label>
                    </div> */}
                    <button className="btn btn-primary">Add</button>
                </form>
            </div>
            </div>
        </div>
                
    )
}

export default EventForm;