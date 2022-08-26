import axios from "axios";
import React, { useEffect, useState } from "react";
import "./chatOnline.css"


export default function Conversation({conversations, currentUser, online}){
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

    const onlineOrNo = online?.find(o => o.userId === user?.id)

    return(
        <div className="conversation">
            {
                onlineOrNo  ? <>
              <div className="chatOnline">
                <div className="chatOnlineFriend">
                <div className="chatOnlineImgContainer">
                    <img className="chatOnlineImg" src={user?.image} alt=""/>
                    <div className="chatOnlineBadge"></div>
                </div>
                <span className="chatOnlineName">{user?.name}</span>
                </div>
                </div>
                </>
                : <>
                <div className="chatOnlineNO">
                <div className="chatOnlineFriendNO">
                <div className="chatOnlineImgContainerNO">
                    <img className="chatOnlineImgNO" src={user?.image} alt=""/>
                    <div className="chatOnlineBadgeNO"></div>
                </div>
                <span className="chatOnlineNameNO">{user?.name}</span>
                </div>
                </div>
                </>
            }
        </div>
    )
}