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
        <h1>Hello {profile.firstname} {profile.lastname} or {profile.username}</h1>
            <div>
                
            <h2>{profile.city} is {profile.weather.temp}°F, </h2>
            </div>
            <MentorshipProfile token={token} username={profile.username} />
            <ProfileEvents token={token} state={profile.state} />
        </div>
    );
}

export default ProfilePage;