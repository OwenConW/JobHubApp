import React from "react"

import "./chatOnline.css"


export default function ChatOnline(){
    return(
        <div className="chatOnline">
            <div className="chatOnlineFriend">
                <div className="chatOnlineImgContainer">
                    <img className="chatOnlineImg" src="https://cdn-icons-png.flaticon.com/512/560/560216.png" alt=""/>
                    <div className="chatOnlineBadge"></div>
                </div>
                <span className="chatOnlineName">Owen Nicolas</span>
            </div>
        </div>
    )
}