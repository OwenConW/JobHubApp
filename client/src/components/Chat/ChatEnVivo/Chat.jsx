import React, { useEffect, useState } from "react"
// , useEffect, useRef } 
// import { useParams } from "react-router-dom"
// import socket from "./Socket"
import NavBar from "../../Navbar/Navbar"
import Conversation from "../Conversations/Conversation"
import Message from "../Message/Message"
import ChatOnline from "../ChatOnline/ChatOnline"
import * as functions from "../../../handlers/localStorage"
import "./Chat.css"
import axios from "axios"



const Chat = (props) => {

    const [conversations, setConversations] = useState([])
    // const currentUser = functions.getLocalStorage()
    let currentUser = {
        id: 2,
        name: "owen",
        last_Name: "bonoris",
        description: null,
        dni: "41.521.421",
        image: "not image",
        date_of_Birth: null,
        mail: "owensito@gmail.com",
        phone: 1153532345,
        country: "Argentina",
        city: "San Martin",
        coordinate: [
            "231",
            "-23"
        ],
        rating: -1,
        isPremium: false,
        isProfessional: true,
        isAdmin: false,
        isBanned: false,
        isActive: true,
        professions: [
            {
                name: "programador"
            }
        ]
    };
   

    useEffect(() => {
        const getConversations = async () => {
            try{
                const res = await axios.get(`http://localhost:3001/conversation/2`)
                console.log(res)
                setConversations(res.data)
            }catch(e){
                console.log(e)
            }
        }
        getConversations()
    }, [])
  
    return (
        <>
        <NavBar/>
        <div className="messenger">
            <div className="chatMenu">
                <div className="chatMenuWrapper">
                    <input placeholder="Buscar profesionales..." className="chatMenuInput"/>
                    {conversations && conversations.length && conversations.map((c, i) => (
                        <Conversation key={i} conversations={c} currentUser={currentUser}/>
                        
                    ))}
                </div>
            </div>
            <div className="chatBox">
                <div className="chatBoxWrapper">
                    <div className="chatBoxTop">
                        <Message/>
                        <Message own={true}/>
                        <Message own={true}/>
                        <Message/>
                        <Message own={true}/>
                        <Message/>
                        <Message/>
                        <Message own={true}/>
                        <Message/>
                        <Message/>
                        <Message own={true}/>
                        <Message own={true}/>
                    </div>
                    <div className="chatBoxBottom">
                        <textarea placeholder="Escribe algo..." className="chatMessageInput"></textarea>
                        <button className="chatSubmitButton">Enviar</button>
                    </div>
                </div>  
            </div>
            <div className="chatOnline">
                <div className="chatOnlineWrapper">
                    <ChatOnline/>
                </div>   
            </div>
        </div>
        </>
    )
}

export default Chat

// let {id} = useParams()
    
// useEffect(() =>{
//     console.log(id)
//     const res = functions.getLocalStorage()
//     Object.keys(res).lenght ? setUser(res.name) : setUser("Invitado")
//     // socket.emit("join", {id1: props.match.params.query})
// }, [])

// const [user, setUser] = useState("")
// const [message, setMessage] = useState("")
// const [messagesSent, setMessagesSent] = useState([]);

// useEffect(() => {
//     socket.emit("conectado", user)
// }, [user])

// useEffect(() => {
//     socket.on("mensajes", mensaje => {
//         setMessagesSent([...messagesSent, mensaje])
//     })
//     return () => {
//         socket.off()
//     }
// }, [messagesSent])

// const divRef = useRef(null)

// useEffect(() => {
//     divRef.current.scrollIntoView({ behavior: "smooth"})
// })

// const handleSubmit = (e) => {
//     e.preventDefault()
//     socket.emit("mensaje", user, message)
//     setMessage("")
// }


/* <div className="chat">
{messagesSent.map((e, i) => <div key={i}><b>{`${e.nombre}:    `}</b><b>{e.mensaje}</b></div>)}
<div ref={divRef}></div>
</div>
<div>
<form onSubmit={handleSubmit} className="form">
<label>Escriba su mensaje:</label>
<input value={message} onChange={(e) => setMessage(e.target.value) }></input>
<button type="submit">Enviar</button>
</form>
</div> */
