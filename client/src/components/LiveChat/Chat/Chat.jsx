import React, { useEffect, useState, useRef  } from "react"
import NavBar from "../../Navbar/Navbar"
import Conversation from "../Conversations/Conversation"
import Message from "../Message/Message"
import * as functions from "../../../handlers/localStorage"
import "./Chat.css"
import axios from "axios"
import { io } from "socket.io-client"
import { useNavigate } from "react-router"
import { useAuth0 } from '@auth0/auth0-react';
import ProfessionalPreview from "../ProfessionalPreview/ProfessionalPreview"

const Chat = (props) => {

    const navigate = useNavigate()

    const { isAuthenticated } = useAuth0();
    const [currentImage, setCurrentImage] = useState('');
    const [conversations, setConversations] = useState([])
    const [currentChat, setCurrentChat] = useState(null)
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState("")
    const [arriveMessage, setArriveMessage] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([])
    const socket = useRef()
    const currentUser = functions.getLocalStorage()
    const scrollRef = useRef()


    if(!isAuthenticated) navigate("/")


    useEffect(() => {
        return () => {
            socket.current.emit("QuitFromChat", currentUser.id)
            socket.current.disconnect()
        }
    }, [currentUser.id])


    useEffect(() => {
        socket.current = io(window.location); //"ws://localhost:3001" "wss://jobhub-pg.herokuapp.com"
        socket.current.on("getMessage", data => {
            setArriveMessage({
                sender: data.senderId,
                text: data.text,
                crearedAt: Date.now()
            })
        })
    }, [socket, currentUser])

    useEffect(() => {
        arriveMessage && (currentChat?.receptor_id === arriveMessage.sender || currentChat?.emisor_id === arriveMessage.sender )  &&
        setMessages(prev => [...prev, arriveMessage])
    }, [arriveMessage, currentChat])

    useEffect(() => {
        socket.current.emit("addUser", currentUser.id)
        socket.current.on("getUsers", users => {
            setOnlineUsers(users);
         })
    }, [currentUser.id])


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
            const res = await axios.post("/messages", message)
            setMessages([...messages, res.data])
            setNewMessage("")
        }catch(e){
            console.log(e)
        }
    }


    useEffect(() => {
        const getConversations = async () => {
            try{
                const res = await axios.get(`/conversation/${currentUser.id}`)
                setConversations(res.data)
            }catch(e){
                console.log(e)
            }
        }
        getConversations()
    }, [currentUser.id, currentChat])
  
    useEffect(() => {
        const getMessages = async () => {
            try{
                const res = await axios.get(`/messages/${currentChat.id}`)
                setMessages(res.data)
            }catch(e){
                console.log(e)
            }
        }
        getMessages()
    }, [currentChat])

    useEffect(() => {
        scrollRef.current?.scrollIntoView({behavior: "smooth"})
    }, [messages])

    useEffect(() => {
        const friendId = currentChat?.emisor_id === currentUser.id
        ? currentChat?.receptor_id
        : currentChat?.emisor_id

        const getImage = async () => {
            try{
                let response = await axios.get(`/users/${friendId}`);
                setCurrentImage(response?.data.image);
            }catch(e){
                console.log(e);
            }
        }
        getImage();
    }, [currentChat])

    return (
  
        <>
         <NavBar/>
            {
                <div className="messenger">
                <div className="chatMenu">
                    <div className="chatMenuWrapper">
                        <h3 className='headerChats'>Chats</h3>
                        {conversations?.map((c, i) => (
                            <div onClick={() => {
                                setCurrentChat(c)
                            }}>
                            <Conversation key={i} conversations={c} currentUser={currentUser} online={onlineUsers}/>
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
                                    <Message message={m} own={m.sender === currentUser.id} current={currentUser} friendImage={currentImage}/>
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
                {currentChat ? (<ProfessionalPreview id={currentChat.receptor_id === currentUser.id ? currentChat.emisor_id : currentChat.receptor_id}
                />) : ''}
            </div>
            }
        </>
    )
}

export default Chat