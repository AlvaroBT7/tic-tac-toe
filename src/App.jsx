import * as f from "util";
import { useState, useEffect } from "react";
import xImg from "../public/imgs/x-img.png";
import OImg from "../public/imgs/0-img.png";
import "./App.css";

// working functions

const checkChar = (char) => {
  return ["x", "0"].includes(char);
};

const checkWin = (board) => {
  let winner = null;
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  winningCombinations.forEach((combination) => {
    const [a, b, c] = combination;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      winner = board[a];
    }
  });
  return winner;
};

const resetGame = (boardLength = 9) => {
  const newBoard = Array(boardLength).fill(null);
  return newBoard;
};

// components

const WinnerMarker = ({ children }) => {
  return (
    <div className="winner-marker-container">
      <div className="winner-marker">
        <p className="winner-marker-text">{`Congratulations ${children}!`}</p>
      </div>
    </div>
  );
};

const TurnMarker = ({ children }) => {
  const img = children === "x" ? xImg : OImg;
  return (
    <div className="turn-marker-container">
      <div className="turn-marker">
        <img src={img} alt={`${children}-img`} className="turn-marker-img" />
        <p className="turn-marker-text">{`Turn of ${children}`}</p>
      </div>
    </div>
  );
};

const Slot = ({ children, action = () => console.log("hello world") }) => {
  return (
    <div onClick={action} className="Slot">
      {children}
    </div>
  );
};

const Board = ({ boardToRender, updateBoard, turn, setTurn }) => {
  return (
    <ul className="Board">
      {boardToRender.map((char, index) => {
        return (
          <Slot
            action={() => {
              if (!checkChar(char)) {
                let newBoard = [...boardToRender];
                newBoard[index] = turn;
                setTurn(turn === "x" ? "0" : "x");
                updateBoard(newBoard);
              }
            }}
            key={index}
          >
            {checkChar(char) ? (
              <img
                src={char === "x" ? xImg : OImg}
                alt={`${char}-img`}
                className="Slot-img"
              />
            ) : null}
          </Slot>
        );
      })}
    </ul>
  );
};

const App = () => {
  const [turn, setTurn] = useState("x");
  const [board, setBoard] = useState(resetGame());

  useEffect(() => {
    const winner = checkWin(board);
    if (winner) {
      setTimeout(() => {
        if (window.confirm(`Wanna reset the game ?`)) {
          setBoard(resetGame());
        }
      }, 3000);
    }
  }, [board]);

  return (
    <div className="app">
      <div className="game-container">
        <h1 className="game-title">Tic Tac Toe</h1>
        <WinnerMarker>{checkWin(board) || "... no winner yet"}</WinnerMarker>
        <Board
          boardToRender={board}
          updateBoard={setBoard}
          turn={turn}
          setTurn={setTurn}
        />
        <TurnMarker>{turn}</TurnMarker>
      </div>
    </div>
  );
};

export default App;