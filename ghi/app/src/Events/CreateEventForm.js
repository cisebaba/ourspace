import React, { useState, useEffect } from 'react' ;

function EventForm() {
    const [stateEvent, setStateEvent ] = useState({
        name : "",
        starts : "",
        ends : "",
        description: "",
        // location:"",
        location_name:"",
        location_city:"",
        location_state:"",
        
    })
  
    const [stateStates, setStateStates] = useState([])
    // const [successfulSubmit, setSuccessfulSubmit] = useState(false);
    
    // if the submission was successful, a message appears
    // let formClasses = "";
    // let alertClasses = "alert alert-success d-none mb-3";
    // let alertContainerClasses = "d-none";

    useEffect(() => {
        const getStatesData = async () => {
            const statesResponse = await fetch(
                "http://localhost:8000/api/states/"
            );
            const statesData = await statesResponse.json();
            //console.log(statesData.states)
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
        console.log(new_data)
        // const dataLoc = stateLoc;

        const eventsUrl = "http://localhost:8000/api/events/" ;
        const fetchConfigEvent = {
            method: "POST", 
            body: JSON.stringify(new_data), 
            credentials:"include",
            headers : {
                "Content-Type" : "application/json",
            }
        };
        const response = await fetch(eventsUrl, fetchConfigEvent );
        // console.log(response)

        if (response.ok){
            setStateEvent({
            name : "",
            starts : "",
            ends : "",
            description: "",
            // location:""
            location: {
                name:"",
                city:"",
                state:""
            }
            });
        // setSuccessfulSubmit(true);
        }
        
    } ;

    
    
    const handleChange = event => {

        const value = event.target.value ;
        setStateEvent({
            ...stateEvent,
            [event.target.name]: value,
        })
        
    };
   
    // if (successfulSubmit) {
    //     formClasses = "d-none";
    //     alertClasses = "alert alert-success mb-3";
    //     alertContainerClasses = "";
    //   }

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
                        <select onChange={handleChange} value={stateEvent.location_state} required name="location_state" id="state" className="form-select">
                        <option value="">Choose a State</option>
                        {stateStates.map(state => {
                            return (
                            <option key={state.name} value={state.abbreviation}>{state.name}</option>
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
};

export default EventForm;
