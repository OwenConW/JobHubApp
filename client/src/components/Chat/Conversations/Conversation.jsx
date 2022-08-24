import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Conversation.css"



export default function Conversation({conversations, currentUser}){
    const [user, setUser] = useState(null)

    useEffect(() => {
        const friendId = conversations.receptor_id
        const getUser = async () => {
            try{
                const res = await axios.get(`http://localhost:3001/users/${friendId}`)
                setUser(res.data)
            }catch(e){
                console.log(e)
            }
        }
        getUser()
        console.log(user)
    }, [ ])

    return(
        <div className="conversation">
            <img className="conversationImg" 
            
            src={!user.image || user.image === "not image" ? "https://cdn-icons-png.flaticon.com/512/560/560216.png" : user.image}
            alt=""
            />
            <span className="conversationName">{user.name}</span>
        </div>
    )
}