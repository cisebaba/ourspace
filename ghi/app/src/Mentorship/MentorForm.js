import React,{useState, useEffect} from "react";
function MentorForm(props){
    const token = props.token
    useEffect(()=>{
        const getList = async ()=> {
            const listResponse = await fetch("http://localhost:8050/api/mentorship/",{
                headers: {
                    authorization:`Bearer ${token}`,
                }
            });
        }
        getList();
    });
    return("loading")
}
export default MentorForm;