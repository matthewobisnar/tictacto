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
