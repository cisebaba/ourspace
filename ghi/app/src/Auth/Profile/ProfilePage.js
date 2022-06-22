import React, {useState, useEffect, useSyncExternalStore, useReducer} from "react";

function ProfilePage(props){
    console.log(props,"props")

    const token = props.token;
    const [profile, setProfile]= useState({
        weather:{}
    });
    console.log(`${process.env.REACT_APP_ACCOUNTS_HOST}/api/profile/`,"url")

    useEffect(()=>{
        const getProfile = async ()=>{
            console.log("getProfile")
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
            console.log("profile",profile)
            setProfile(profileData)
           
        };
        if(token){
            getProfile();
        }
    },[token]);
    console.log(profile)
    return(
        <div>
        <h1>Hello {profile.firstname} {profile.lastname} or {profile.username}</h1>
            <div>
                
            <h2>{profile.city} is {profile.weather.temp}°F, </h2>
            </div>
        </div>
    );
}

export default ProfilePage;