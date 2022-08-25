import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Conversation.css"



export default function Conversation({conversations, currentUser}){
    const [user, setUser] = useState(null)
    useEffect(() => {
        const friendId = conversations.emisor_id === currentUser.id 
        ? conversations.receptor_id 
        : conversations.emisor_id
        const getUser = async () => {
            try{
                const res = await axios.get(`/users/${friendId}`)
                setUser(res.data)
            }catch(e){
                console.log(e)
            }
        }
        getUser()
    }, [])

    return(
        <div className="conversation">
            {
                user && <>
                <img className="conversationImg" 
                src={user?.image || "https://geekflare.com/wp-content/plugins/wp-user-avatars/wp-user-avatars/assets/images/mystery.jpg"}
                alt=""
                />
                <span className="conversationName">{user?.name}</span>        
                </>     
            }
        </div>
    )
}