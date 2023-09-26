import io from "socket.io-client";
import "./Game.scss";
import React, { useEffect, useState } from "react";
import nbaImage from './images/nba.jpeg';
import acvalhallaImage from './images/acvalhalla.jpeg';
import gta5Image from './images/gta5.jpg';
import hgImage from './images/hg.jpeg';
import spideyImage from './images/spidey.jpeg';

import { Button } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';
import { RiDeleteBinLine } from 'react-icons/ri';

const socket = io.connect("http://localhost:3002");


// const App = () => {
//     const [playerName, setPlayerName] = useState('');
//     const [board, setBoard] = useState(Array(9).fill(null));
//     const [currentPlayer, setCurrentPlayer] = useState('X');
//     const [players, setPlayers] = useState({});
  
//     useEffect(() => {
//       socket.on('playerJoined', (player) => {
//         setPlayerName(player);
//       });
  
//       socket.on('updateBoard', (data) => {
//         setBoard(data.board);
//         setCurrentPlayer(data.currentPlayer);
//       });
  
//       socket.on('playerLeft', (playerId) => {
//         const updatedPlayers = { ...players };
//         delete updatedPlayers[playerId];
//         setPlayers(updatedPlayers);
//       });
//     }, [players]);

//     const generateRandomString = (length) => {
//         let result = '';
//         const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//         for (let i = 0; i < length; i++) {
//             result += characters.charAt(Math.floor(Math.random() * characters.length));
//         }
//         return result;
//     }
  
//     const handleJoinGame = () => {
//       socket.emit('joinGame', generateRandomString(5));
//     };
  
//     const handleMakeMove = (index) => {
//       if (!board[index] && currentPlayer === playerName) {
//         const newBoard = [...board];
//         newBoard[index] = currentPlayer;
//         socket.emit('makeMove', { board: newBoard, currentPlayer });
//       }
//     };
  
//     return (
//       <div>
//         <h1>Tic Tac Toe</h1>
//         <div>
//           <h2>Welcome, {playerName}!</h2>
//           {board.map((cell, index) => (
//             <div key={index} className="square" onClick={() => handleMakeMove(index)}>
//               {cell}
//             </div>
//           ))}
//         </div>

//         <button onClick={handleJoinGame}>Join Game</button>
//       </div>
//     );
//   };
  
//   export default App;

// const TicTacToe = () => {
//     const [board, setBoard] = useState(Array(9).fill(null));
//     const [nextPlayer, setNextPlayer] = useState('X');
  
//     useEffect(() => {
//       // Listen for updates from the server
//       socket.on('updateBoard', ({ board, nextPlayer }) => {
//         setBoard(board);
//         setNextPlayer(nextPlayer);
//       }, []);
  
//       return () => {
//         socket.off('updateBoard');
//       };
//     });
  
//     const makeMove = (index) => {
//       if (board[index] === null && nextPlayer === 'X') {
//         socket.emit('makeMove', { index });
//       }
//     };
  
//     return (
//       <div>
//         <div className="board">
//           {board.map((value, index) => (
//             <div key={index} className="square" onClick={() => makeMove(index)}>
//               {value}
//             </div>
//           ))}
//         </div>
//         <div className="status">
//           {`Next player: ${nextPlayer}`}
//         </div>
//       </div>
//     );
//   }
  
//   export default TicTacToe;



const Game = () => {

    let [status, setStatus] = useState(null);
    let [board, setBoard] = useState(Array(9).fill(null));
    let [xIsNext, setXIsNext] = useState(true);

    

    const handleClick = (index) => {
        const newBoard = [...board];
        if (calculateWinner(newBoard) || newBoard[index]) {
          return;
        }
        newBoard[index] = xIsNext ? 'X' : 'O';
        setBoard(newBoard);
        setXIsNext(!xIsNext);
    };

    const renderSquare = (i) => {
        return (
          <button className="square" onClick={() => handleClick(i)}>
            {board[i]}
          </button>
        );
      };

    function calculateWinner(squares) {
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
      
        for (let i = 0; i < lines.length; i++) {
          const [a, b, c] = lines[i];
          if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
          }
        }
      
        return null;
    }

    const winner = calculateWinner(board);
    if (winner) {
        status = `Winner: ${winner}`;
    } else if (board.every((square) => square)) {
        status = 'It\'s a draw!';
    } else {
        status = `Next player: ${xIsNext ? 'X' : 'O'}`;
    }

    return (
        <div className="game">
        <div className="game-board">
            <div className="board-row">
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div className="board-row">
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div className="board-row">
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>
        </div>
        <div className="game-info">
            <div>{status}</div>
        </div>
    </div>
    );
};

export default Game;
