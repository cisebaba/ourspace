import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

function ProfileForm(props) {
    const token = props.token;
    const [stateProfile, setStateProfile] = useState({
        city: "",
        state: "",
        role: ""
    });

    const [stateStates, setStateStates] = useState([])
    useEffect(() => {
        const getStatesData = async () => {
            const statesResponse = await fetch(
                "http://localhost:8000/api/states/"
            );
            const statesData = await statesResponse.json();
            setStateStates(statesData.states)
        };

        getStatesData();
    }, []) ;

  const handleSubmit = async e => {
    e.preventDefault();
    const data = stateProfile;
    const profileUrl = "http://localhost:9000/api/profile/new/" ;
        const fetchConfigProfile = {
            method: "POST", 
            body: JSON.stringify(data), 
            headers : {
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

  if (token) {
    return <Navigate to="/" />;
  }

  return (
    <form onSubmit={handleSubmit}>
      { error ? <div dangerouslySetInnerHTML={{__html: error}} /> : null }
      <input required name="username" type="text" onChange={e => setUsername(e.target.value)} value={username} placeholder="username" />
      <input required name="firstname" type="text" onChange={e => setFirstname(e.target.value)} value={firstname} placeholder="firstname" />
      <input required name="lastname" type="text" onChange={e => setLastname(e.target.value)} value={lastname} placeholder="lastname" />
      <input required name="email" type="email" onChange={e => setEmail(e.target.value)} value={email} placeholder="email" />
      <input required name="password" type="password" onChange={e => setPassword(e.target.value)} value={password} placeholder="password" />
      <button>Signup</button>
    </form>
  )
}

export default ProfileForm;
