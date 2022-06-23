import React, {useState, useEffect, useSyncExternalStore, useReducer} from "react";
import MentorshipProfile from "./ProfileMentorship";
import ProfileEvents from "./ProfileEvents";

function ProfilePage(props){
    const token = props.token;
    const [profile, setProfile]= useState({
        weather:{}
    });

    useEffect(()=>{
        const getProfile = async ()=>{
            const listResponse = await fetch(`${process.env.REACT_APP_ACCOUNTS_HOST}/api/profile/`,{
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
            <div className="card mt-5 mb-5" style={{ width: '18rem' }}>
                <div className="card-body">
                <h1 className="card-title">Hello {profile.username}</h1>
                <h3>{profile.city} is {profile.weather.temp}°F </h3>
                </div>
            </div>
            <div>
                <MentorshipProfile token={token} username={profile.username} />
                <ProfileEvents token={token} state={profile.state} />
            </div>
        </div>
    );
}

export default ProfilePage;