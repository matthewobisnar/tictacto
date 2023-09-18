import React, { useState, useEffect } from "react";

const Chat = ({ socket, user }) => {
    let [currentMessage, setCurrentMessage] = useState("");
    let [conversation, setConversation] = useState([]);
    useEffect(() => {
        if (socket) {
            socket.off("receive_message");
            socket.on("receive_message", (data) => {

                console.log(data);

                conversation = [...conversation, data];
                setConversation(conversation);
            });
        }
    }, [socket]);

    const inputChangedHandler = (value) => {
        setCurrentMessage(value);
    };

    const sendMessageButtonHandler = async (event) => {
        event?.preventDefault();
        if (currentMessage) {
            const data = {
                room: user.room,
                author: user.name,
                message: currentMessage,
                timeStamp: `${new Date(Date.now()).toDateString()} ${new Date(Date.now()).toLocaleTimeString("en-US")}`,
            };
            await socket.emit("send_message", data);
            conversation = [...conversation, data];
            setConversation(conversation);
            setCurrentMessage("");
        }
    };

    return (
        <div className="conversation">
            <div className="header">{user.room}</div>
            <div className="body">
                {conversation?.constructor === Array && conversation?.length > 0 ? (
                    conversation.map((item, idx) =>
                        item.author === 'server' ? (
                            <div key={`message-server-${idx}`} className="server-message">
                                {item.message}
                            </div>
                        ) : item.author === user.name ? (
                            <div key={`message-${item.timeStamp}`} className="send-message">
                                <label>{user.name}</label>
                                <p>{item.message}</p>
                                <span>{item.timeStamp}</span>
                            </div>
                        ) : (
                            <div key={`message-${item.timeStamp}`} className="received-message">
                                <label>{item.author}</label>
                                <p>{item.message}</p>
                                <span>{item.timeStamp}</span>
                            </div>
                        )
                    )
                ) : (
                    <div className="placeholder">No Conversation</div>
                )}
            </div>
            <div className="footer">
                <input
                    type="text"
                    placeholder="Message..."
                    value={currentMessage}
                    onChange={(event) => inputChangedHandler(event.target.value)}
                />
                <button onClick={(event) => sendMessageButtonHandler(event)}>Send</button>
            </div>
        </div>
    );
};

export default Chat;
