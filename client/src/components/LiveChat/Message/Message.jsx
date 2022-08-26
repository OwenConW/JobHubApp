import React from "react";
import "./Message.css"
import { format } from "timeago.js"


export default function Message({message, own, current, friendImage}){
    return(
        <div className={own ? "message own" : "message"}>
           <div className="messageTop">
               {
                   !own ? (
                    <>
                    <img className="messageImg" 
                    src={own ? current.image : friendImage}
                    alt=""/>
                    <p className="messageText">{message.text}</p>
                    </>
                   ) : (
                       <>
                    <p className="messageText">{message.text}</p>
                    <img className="messageImg" 
                    src={own ? current.image : friendImage}
                    alt=""/>
                    </>
                   )
               }
           </div>
           <div className="messageBottom">{format(message.createdAt)}</div>
        </div>
    )
}