const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors());

const PORT = 3002;

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    }
});
io.on("connection", (socket) => {
    let name = "";
    let room = "";
    console.log(`"Connected user: ${socket.id}`);
    // socket.join(`room/test`);
    // console.log(socket.rooms.keys())
    // console.log(socket.adapter.sids)
    // console.log(socket.adapter.rooms)
    // console.log(socket.adapter.rooms.keys())

    // var availableRooms = [];
    // // if (rooms) {
    //     for (var rm in io.sockets.adapter.rooms) {
    //         availableRooms.push(rm);
    //     }
    // // }
    // console.log(socket.rooms)
    // console.log(Object.keys(io.sockets.adapter.rooms))
    // socket.on('getRooms', () => {
    //     socket.emit('rooms', io.sockets.adapter.rooms);
    // });
    // for (var rm in socket.adapter.rooms) {
    //     console.log(rm)
    //     // if (!rooms[room].hasOwnProperty(room)) {
    //     //     availableRooms.push(room);
    //     // }
    // }
    socket.on("get_rooms", () => {
        let availableRooms = []
        console.log(socket.adapter.rooms)
        socket.adapter.rooms.forEach ((value, roomKey) => {
            // console.log("value", value)
            if(roomKey.search("room/") >= 0){
                availableRooms.push(roomKey.slice(5));
            }
        });
        socket.broadcast.emit('rooms', availableRooms);
    });

    socket.on("join_room", async(data) => {
        await socket.join(`room/${data.room}`);
        console.log(`User ID of ${socket.id} joined room ${data.room}`);
        socket.to(`room/${data.room}`).emit("receive_message", {
            author: 'server',
            message: `${data.user} joined the room`
        });

        name = data.user;
        room = data.room;
    });

    socket.on("send_message", (data) => {
        socket.to(`room/${data.room}`).emit("receive_message", data);
    });

    socket.on("disconnect", () => {
        console.log(`Disconnect user: ${socket.id}`);
        socket.to(`room/${room}`).emit("receive_message", {
            author: 'server',
            message: `${name} left the room`
        });
    });
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
