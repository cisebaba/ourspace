import React, {useState, useEffect, useSyncExternalStore, useReducer} from "react";

function ProfilePage(props){
    const token = props.token;
    const [profile, setProfile]= useState([]);
    const [mentorships, setMentorships] = useState([]);

    useEffect(()=>{
        const getProfile = async ()=>{
            const listResponse = await fetch("http://localhost:9000/api/profile/",{
                headers: {
                    authorization:`Bearer ${token}`,
                }
            });
            // const mentorListResponse = await fetch("http://localhost:9000/api/mentorship/",{
            //     headers: {
            //         authorization:`Bearer ${token}`,
            //     }
            // });
            const profileData = await listResponse.json();
            setProfile(profileData)
           
        };
        if(token){
            getProfile();
        }
    },[token]);

    return(
        <div>
        <h1>Hello {profile.firstname} {profile.lastname} or {profile.username}</h1>
            <div>
                
            {/* <h2>{profile.city} is {profile.weather.temp}°F, </h2> */}
            </div>
        </div>
    );
}

export default ProfilePage;