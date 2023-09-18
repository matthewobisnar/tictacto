import io from "socket.io-client";
import "./App.scss";
import React, { useEffect, useState } from "react";
import Chat from "./Chat";
import Popover from "@mui/material/Popover";

const socket = io.connect("http://localhost:3002");

const GROUP_ICON = (
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M12 5a3.5 3.5 0 00-3.5 3.5A3.5 3.5 0 0012 12a3.5 3.5 0 003.5-3.5A3.5 3.5 0 0012 5m0 2a1.5 1.5 0 011.5 1.5A1.5 1.5 0 0112 10a1.5 1.5 0 01-1.5-1.5A1.5 1.5 0 0112 7M5.5 8A2.5 2.5 0 003 10.5c0 .94.53 1.75 1.29 2.18.36.2.77.32 1.21.32.44 0 .85-.12 1.21-.32.37-.21.68-.51.91-.87A5.42 5.42 0 016.5 8.5v-.28c-.3-.14-.64-.22-1-.22m13 0c-.36 0-.7.08-1 .22v.28c0 1.2-.39 2.36-1.12 3.31.12.19.25.34.4.49a2.482 2.482 0 001.72.7c.44 0 .85-.12 1.21-.32.76-.43 1.29-1.24 1.29-2.18A2.5 2.5 0 0018.5 8M12 14c-2.34 0-7 1.17-7 3.5V19h14v-1.5c0-2.33-4.66-3.5-7-3.5m-7.29.55C2.78 14.78 0 15.76 0 17.5V19h3v-1.93c0-1.01.69-1.85 1.71-2.52m14.58 0c1.02.67 1.71 1.51 1.71 2.52V19h3v-1.5c0-1.74-2.78-2.72-4.71-2.95M12 16c1.53 0 3.24.5 4.23 1H7.77c.99-.5 2.7-1 4.23-1z" />
    </svg>
);

const App = () => {
    let [user, setUser] = useState({
        name: "",
        room: "",
        joined: false,
    });
    let [roomList, setRoomList] = useState({
        show: false,
        anchor: null,
        data: [],
    });

    useEffect(() => {

        socket.emit("get_rooms", null);
        socket.off("rooms");
        socket.on("rooms", (data) => {
            roomList.data = [...data];
            setRoomList(roomList);
        });
    }, [socket]);

    const inputChangedHandler = (value, input) => {
        if (input === "user") {
            user.name = value;
        } else {
            user.room = value;
        }
        setUser({ ...user });
    };

    const buttonClickedHandler = (event) => {
        event?.preventDefault();
        if (user.name && user.room) {
            socket.emit("join_room", { user: user.name, room: user.room });
            socket.emit('get_rooms', null);
            user.joined = true;
            setUser({ ...user });
        } else {
            alert("Name and Room ID field should not be empty!");
        }
    };

    const roomListButtonHandler = (event) => {
        if (roomList.anchor) {
            roomList.anchor = null;
            roomList.show = false;
        } else {
            roomList.show = true;
            roomList.anchor = event.target;
        }
        setRoomList({ ...roomList });
    };

    const selectRoomHandler = (room) => {
        roomList.anchor = null;
        roomList.show = false;
        setRoomList({ ...roomList });
        user.room = room;
        setUser({ ...user });
    }

    return (
        <div className="chat-app">
            {user.name && user.room && user.joined ? (
                <Chat user={user} socket={socket} />
            ) : (
                <div className="chat-form">
                    <h4>Join a Room</h4>
                    <div>
                        <label>Name: </label>
                        <input
                            type="text"
                            placeholder="Input Name..."
                            onChange={(event) => inputChangedHandler(event.target.value, "user")}
                            value={user.name}
                        />
                    </div>
                    <div>
                        <label>Room: </label>
                        <input
                            type="text"
                            className="input-room"
                            placeholder="Input Room ID..."
                            onChange={(event) => inputChangedHandler(event.target.value, "room")}
                            value={user.room}
                        />
                        <button className="btn-rooms" onClick={(event) => roomListButtonHandler(event)}>
                            {GROUP_ICON}
                        </button>
                    </div>
                    <div>
                        <button className="btn-join-room" onClick={(event) => buttonClickedHandler(event)}>
                            {" "}
                            Join Room
                        </button>
                    </div>
                    <Popover
                        id={"room-list"}
                        open={roomList.show}
                        anchorEl={roomList.anchor}
                        onClose={roomListButtonHandler}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "left",
                        }}
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'left',
                        }}>
                        <div className="room-list">
                            {roomList?.data?.constructor === Array && roomList?.data?.length > 0 ? (
                                <ul>
                                    {
                                        roomList.data.map((item, idx) => (
                                            <li key={idx} onClick={() => selectRoomHandler(item)}>Room: <b>{item}</b></li>
                                        ))
                                    }
                                </ul>
                            ) : (
                                <div>No available room.</div>
                            )}
                        </div>
                    </Popover>
                </div>
            )}
        </div>
    );
};

export default App;
