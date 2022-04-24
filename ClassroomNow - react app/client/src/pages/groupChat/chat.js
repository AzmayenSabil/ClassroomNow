import { useContext } from "react";
import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import { Context } from "../../context/Context";
import axios from "axios";


function Chat({ socket, username, room, setShowChat1 }) {
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);

    const sendMessage = async () => {
    if (currentMessage !== "") {
        const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
            new Date(Date.now()).getHours() +
            ":" +
            new Date(Date.now()).getMinutes(),
        };

        await socket.emit("send_message", messageData);
        setMessageList((list) => [...list, messageData]);
        setCurrentMessage("");

        // try {
        //     await axios.post("http://localhost:5000/chats", {messageData}, {headers:{"Content-Type" : "application/json"}});
        // }catch(error){
        //     console.log(error);
        // }
    }
};

    useEffect(() => {
        socket.on("receive_message", (data) => {
        setMessageList((list) => [...list, data]);
    });
}, [socket]);

    return (
        <div className="chat-window">
        <div className="chat-header">
        <p>Live Chat
        <button onClick={() => setShowChat1(false)}>Go Back</button> 
        </p>
        </div>
        <div className="chat-body">
        <ScrollToBottom className="message-container">
            {messageList.map((messageContent) => {
            return (
                <div
                className="message"
                id={username === messageContent.author ? "you" : "other"}
                >
                <div>
                    <div className="message-content">
                    <p>{messageContent.message}</p>
                    </div>
                    <div className="message-meta">
                    <p id="time">{messageContent.time}</p>
                    <p id="author">{messageContent.author}</p>
                    </div>
                </div>
                </div>
            );
            })}
        </ScrollToBottom>
        </div>
        <div className="chat-footer">
        <input
            type="text"
            value={currentMessage}
            placeholder="Hey..."
            onChange={(event) => {
            setCurrentMessage(event.target.value);
            }}
            onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
            }}
        />
        <button onClick={sendMessage}>&#9658;</button>
        </div>
    </div>
);
}

export default Chat;
