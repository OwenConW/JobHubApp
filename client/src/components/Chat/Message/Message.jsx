import React from "react";
import "./Message.css"



export default function Message({own}){
    return(
        <div className={own ? "message own" : "message"}>
           <div className="messageTop">
            <img className="messageImg" 
            src="https://cdn-icons-png.flaticon.com/512/560/560216.png" 
            alt=""/>
            <p className="messageText">Hi martin wassup</p>
           </div>
           <div className="messageBottom">1 hour ago</div>
        </div>
    )
}