import React, { useEffect, useState, useRef  } from "react"
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
import { io } from "socket.io-client"


const Chat = (props) => {

    const [conversations, setConversations] = useState([])
    const [currentChat, setCurrentChat] = useState(null)
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState("")
    const [arriveMessage, setArriveMessage] = useState(null)
    // const [onlineUsers, setOnlineUsers] = useState([])
    const socket = useRef()
    const currentUser = functions.getLocalStorage()
    const scrollRef = useRef()


    useEffect(() => {
        socket.current = io("ws://localhost:3001");
        socket.current.on("getMessage", data => {
            setArriveMessage({
                sender: data.senderId,
                text: data.text,
                crearedAt: Date.now()
            })
        })
    }, [])

    useEffect(() => {
        arriveMessage && (currentChat?.receptor_id === arriveMessage.sender || currentChat?.emisor_id === arriveMessage.sender )  &&
        setMessages(prev => [...prev, arriveMessage])
    }, [arriveMessage, currentChat])

    useEffect(() => {
        socket.current.emit("addUser", currentUser.id)
        // socket.current.on("getUsers", users => {
            
        // })
    }, [currentUser])


    const handleSubmit = async (e) => {
        e.preventDefault();
        const message = {
            conversationId: currentChat.id,
            sender: currentUser.id,
            text: newMessage
        }

        socket.current.emit("sendMessage", {
            senderId: currentUser.id,
            receiverId: currentChat.receptor_id === currentUser.id ? currentChat.emisor_id : currentChat.receptor_id,
            text: newMessage
        })

        try{
            const res = await axios.post("http://localhost:3001/messages", message)
            setMessages([...messages, res.data])
            setNewMessage("")
        }catch(e){
            console.log(e)
        }
    }


    useEffect(() => {
        const getConversations = async () => {
            try{
                const res = await axios.get(`http://localhost:3001/conversation/${currentUser.id}`)
                setConversations(res.data)
            }catch(e){
                console.log(e)
            }
        }
        getConversations()
    }, [currentUser.id])
  
    useEffect(() => {
        const getMessages = async () => {
            try{
                const res = await axios.get(`http://localhost:3001/messages/${currentChat.id}`)
                setMessages(res.data)
            }catch(e){
                console.log(e)
            }
        }
        getMessages()
    }, [currentChat])

    useEffect(() => {
        
    }, [currentChat])

    useEffect(() => {
        scrollRef.current?.scrollIntoView({behavior: "smooth"})
    }, [messages])

    return (
  
        <>
        <NavBar/>
        <div className="messenger">
            <div className="chatMenu">
                <div className="chatMenuWrapper">
                    <input placeholder="Buscar profesionales..." className="chatMenuInput"/>
                    {conversations && conversations.length && conversations.map((c, i) => (
                        <div onClick={() => {
                            setCurrentChat(c)
                        }}>
                        <Conversation key={i} conversations={c} currentUser={currentUser}/>
                        </div>
                    ))}
                </div>
            </div>
            <div className="chatBox">
                <div className="chatBoxWrapper">
                    {
                        currentChat ?
                        <>
                        <div className="chatBoxTop">
                        {
                            messages.map(m => (
                                <div ref={scrollRef}>
                                <Message message={m} own={m.sender === currentUser.id} current={currentUser}/>
                                </div>
                            ))
                        }
                    </div>
                    <div className="chatBoxBottom">
                        <textarea placeholder="Escribe algo..." 
                        className="chatMessageInput"
                        onChange={e => setNewMessage(e.target.value)}
                        value={newMessage}>
                        </textarea>
                        <button className="chatSubmitButton" onClick={handleSubmit}>Enviar</button>
                    </div>
                    </> : <span className="noConversationText">Abri una orden para empezar a chatear</span>}
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
