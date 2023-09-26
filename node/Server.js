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

let board = Array(9).fill(null);
let currentPlayer = 'X';
let winner = null;

io.on("connection", (socket) => {

    socket.on("get_rooms", () => {
        let availableRooms = []
        socket.adapter.rooms.forEach((value, roomKey) => {
            // console.log("value", value)
            if (roomKey.search("room/") >= 0) {
                availableRooms.push(roomKey.slice(5));
            }
        });
        socket.broadcast.emit('rooms', availableRooms);
    });

    socket.on("join_room", async (data) => {

        await socket.join(`room/${data.room}`);

        // name = data.user;
        // room = data.room;
    });

    socket.on("addOrder", (data) => {
        console.log(data);socket.broadcast.emit("receiveOrder", data);
    });

    socket.emit('updateBoard', board);

    socket.on('move', ({ board: newBoard, player }) => {
    if (!winner && currentPlayer === player) {
        board = newBoard;
        socket.emit('updateBoard', board);
        socket.broadcast.emit('updateBoard', board);

        if (checkWinner()) {
        winner = currentPlayer;
        socket.emit('gameOver', winner);
        socket.broadcast.emit('gameOver', winner);
        } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
    });

    socket.on('disconnect', () => {
    console.log('A user disconnected');
    });
    
    //   socket.on('disconnect', () => {
    //     console.log('A user disconnected');
    //   });


    // socket.on("disconnect", () => {
    //     console.log(`Disconnect user: ${socket.id}`);
    //     socket.to(`room/${room}`).emit("receive_message", {
    //         author: 'server',
    //         message: `${name} left the room`
    //     });
    // });
});

function checkWinner() {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
  
    for (let line of lines) {
      const [a, b, c] = line;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return true;
      }
    }
    return false;
  }

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
