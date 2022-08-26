import React from "react";
import "./Message.css"
import { format } from "timeago.js"


export default function Message({message, own, current, friendImage}){
    return(
        <div className={own ? "message own" : "message"}>
           <div className="messageTop">
            <img className="messageImg" 
            src={own ? current.image : friendImage}
            alt=""/>
            <p className="messageText">{message.text}</p>
           </div>
           <div className="messageBottom">{format(message.createdAt)}</div>
        </div>
    )
}