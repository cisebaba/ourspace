import { useState } from 'react';
// import { Navigate } from 'react-router-dom';

function ProfileForm(props) {
    const token = props.token;
    const [stateProfile, setStateProfile] = useState({
        city: "",
        state: "",
        role: ""
    });

    // const [stateStates, setStateStates] = useState([])
    // useEffect(() => {
    //     const getStatesData = async () => {
    //         const statesResponse = await fetch(
    //             "http://localhost:8000/api/states/"
    //         );
    //         const statesData = await statesResponse.json();
    //         setStateStates(statesData.states)
    //     };

    //     getStatesData();
    // }, []) ;

  const handleSubmit = async e => {
    e.preventDefault();
    const data = stateProfile;
    const profileUrl = `${process.env.REACT_APP_ACCOUNTS_HOST}/api/profile/new` ;
        const fetchConfigProfile = {
            method: "POST", 
            body: JSON.stringify(data), 
            credentials: "include",
            headers : {
                "Content-Type": "application/json",
                authorization:`Bearer ${token}`,
            }
        };
        const response = await fetch(profileUrl, fetchConfigProfile);
        if (response.ok){
            setStateProfile({
                city: "",
                state: "",
                role: ""
            })
        }
  };
  const handleChange = event => {

    const value = event.target.value ;
    setStateProfile({
        ...stateProfile,
        [event.target.name]: value,
    })
    
};

//   if (token) {
//     return <Navigate to="/" />;
//   }

  return (
    <form onSubmit={handleSubmit}>
      <input required name="city" type="text" onChange={handleChange} value={stateProfile.city} placeholder="city" />
      <input required name="state" type="text" onChange={handleChange} value={stateProfile.state} placeholder="state" />
      <input required name="role" type="text" onChange={handleChange} value={stateProfile.role} placeholder="role" />
      <button>Create</button>
    </form>
  )
}

export default ProfileForm;
