import React from "react";
import "./Message.css"
import { format } from "timeago.js"


export default function Message({message, own, current}){
    return(
        <div className={own ? "message own" : "message"}>
           <div className="messageTop">
            <img className="messageImg" 
            src={own ? current.image : "https://cdn-icons-png.flaticon.com/512/560/560216.png"} 
            alt=""/>
            <p className="messageText">{message.text}</p>
           </div>
           <div className="messageBottom">{format(message.createdAt)}</div>
        </div>
    )
}