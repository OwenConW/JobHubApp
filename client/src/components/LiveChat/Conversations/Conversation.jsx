import axios from "axios";
import React, { useEffect, useState } from "react";
import s from "./Conversation.module.scss";



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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onlineOrNo = online?.find(o => o.userId === user?.id)

    return(
        <div className={s.conversation}>
            {
                onlineOrNo ? <>
                <div className={s.chatOnlineImgContainer}>
                    <img className={s.conversationImg}
                    src={user?.image || "https://geekflare.com/wp-content/plugins/wp-user-avatars/wp-user-avatars/assets/images/mystery.jpg"}
                    alt=""
                    />
                    <div className={s.chatOnlineBadge}>

                    </div>
                </div>

                <div className={s.dataChat}>
                    <p className={s.conversationName}>{user?.name} {user?.last_Name}</p>
                    <p className={s.profession}>{user?.professions[0]?.name}</p>
                </div>
                </>
                : <>
                <div className={s.chatOnlineImgContainer}>
                    <img className={s.conversationImg}
                    src={user?.image || "https://geekflare.com/wp-content/plugins/wp-user-avatars/wp-user-avatars/assets/images/mystery.jpg"}
                    alt=""
                    />
                    <div className={s.chatOnlineBadgeNo}>

                    </div>
                </div>

                <div className={s.dataChat}>
                    <p className={s.conversationName}>{user?.name} {user?.last_Name}</p>
                    <p className={s.profession}>{user?.professions[0]?.name}</p>
                </div>
                </>
            }
        </div>
    )
}