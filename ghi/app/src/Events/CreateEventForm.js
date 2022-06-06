import React, { useState, useEffect } from 'react' ;

function EventForm() {
    const [stateEvent, setStateEvent ] = useState({
        name : "",
        starts : "",
        ends : "",
        description: "",
        locations: ""
    })
    const [stateLoc, setStateLoc] = useState({
        venue: "",
        city:"",
        state:""
    })
    const [stateStates, setStateStates] = useState([])
    const [successfulSubmit, setSuccessfulSubmit] = useState(false);
    
    // if the submission was successful, a message appears
    let formClasses = "";
    let alertClasses = "alert alert-success d-none mb-3";
    let alertContainerClasses = "d-none";

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
        // const dataLoc = stateLoc;

        const eventsUrl = "http://localhost:8000/api/events/" ;
        const fetchConfigEvent = {
            method: "POST", 
            body: JSON.stringify(data), 
            headers : {
                "Content-Type" : "application/json",
            }
        };
        // const locationUrl = "http://localhost:8000/api/locations/"
        // const fetchConfig = {
        //     method: "POST", 
        //     body: JSON.stringify(dataLoc), 
        //     headers : {
        //         "Content-Type" : "application/json",
        //     }
        // };
        // const responseLoc = await fetch(locationUrl, fetchConfig);
        const response = await fetch(eventsUrl, fetchConfigEvent );
        console.log(response)

        if (response.ok){
            setStateEvent({
            name : "",
            starts : "",
            ends : "",
            description: "",
            locations: "",
            locations: [],
        });
            // setStateLoc({
            //     venue: "",
            //     city:"",
            //     state:""
            // });
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
                        value={stateLoc.venue} 
                        placeholder="venue" 
                        required type="text" 
                        name="venue" 
                        id="venue" 
                        className="form-control" />
                        <label htmlFor="venue">Venue</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={handleChangeLoc} 
                        value={stateLoc.city} 
                        placeholder="city" 
                        required type="text" 
                        name="city" 
                        id="city" 
                        className="form-control" />
                        <label htmlFor="city">City</label>
                    </div>
                    <div className="mb-3">
                        <select onChange={handleChangeLoc} value={stateLoc.locations} required name="state" id="state" className="form-select">
                        <option value="">Choose a State</option>
                        {stateStates.map(state => {
                            return (
                            <option key={state.name} value={state.name}>{state.name}</option>
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