"use client";
import next from "next";
import Image from "next/image";
import React from "react";

function Square({ value, onSquareClick }) {
    return (
        <button
            className={`square ${value === "X" ? "xStyle" : "oStyle"}`}
            onClick={onSquareClick}
        >
            {value}
        </button>
    );
}

function Board({ xIsNext, squares, onPlay, isPlayable }) {
    function handleClick(i) {
        if (squares[i] || calculateWinner(squares)) {
            return;
        }
        const nextSquares = squares.slice();
        if (xIsNext) {
            nextSquares[i] = "X";
        } else {
            nextSquares[i] = "O";
        }
        onPlay(nextSquares, i, calculateWinner(nextSquares));
    }

    return (
        <div className={`board ${isPlayable ? "shadowTable" : ""}`}>
            <div className="board-row">
                <Square
                    onSquareClick={() => handleClick(0)}
                    value={squares[0]}
                />
                <Square
                    onSquareClick={() => handleClick(1)}
                    value={squares[1]}
                />
                <Square
                    onSquareClick={() => handleClick(2)}
                    value={squares[2]}
                />
            </div>
            <div className="board-row">
                <Square
                    onSquareClick={() => handleClick(3)}
                    value={squares[3]}
                />
                <Square
                    onSquareClick={() => handleClick(4)}
                    value={squares[4]}
                />
                <Square
                    onSquareClick={() => handleClick(5)}
                    value={squares[5]}
                />
            </div>
            <div className="board-row">
                <Square
                    onSquareClick={() => handleClick(6)}
                    value={squares[6]}
                />
                <Square
                    onSquareClick={() => handleClick(7)}
                    value={squares[7]}
                />
                <Square
                    onSquareClick={() => handleClick(8)}
                    value={squares[8]}
                />
            </div>
        </div>
    );
}

export default function Game() {
    const [currentMove, setCurrentMove] = React.useState(
        Array(9).fill(Array(9).fill(null))
    );
    const [finalTable, setFinalTable] = React.useState(Array(9).fill(null));
    const [xIsNext, setXIsNext] = React.useState(true);
    const [nextBoard, setNextBoard] = React.useState(4);
    const [hasFreeMove, setHasFreeMove] = React.useState(false);

    function handlePlay(board, nextSquares, square, winner) {
        if (board !== nextBoard && hasFreeMove === false) {
            return;
        }
        console.log(winner);
        if (winner !== null) {
            if (finalTable[board] !== null) {
                return;
            }
            const nextFinalTable = finalTable;
            nextFinalTable[board] = xIsNext ? "X" : "O";
            console.log("winner chicken dinner");
            if (calculateWinner(nextFinalTable) !== null) {
                console.log("Some motherfucker has won this damm game");
            }
            setFinalTable(nextFinalTable);
        }
        const nextMoves = currentMove.slice();
        nextMoves[board] = nextSquares;
        setCurrentMove(nextMoves);
        setXIsNext(!xIsNext);
        if (finalTable[square] !== null) {
            setHasFreeMove(true);
            console.log("has free move");
        } else {
            console.log("does not have free move");
            setHasFreeMove(false);
        }
        setNextBoard(square);
        console.log(square);
    }

    function calculateNextPossibleTables(table) {
        if (hasFreeMove === false) {
            if (nextBoard !== table) {
                return false;
            } else {
                return true;
            }
        } else {
            if (finalTable[table] !== null) {
                return false;
            } else {
                return true;
            }
        }
    }

    return (
        <div className="absolute left-0 right-0 top-0 bottom-0 m-auto game items-center justify-center">
            <div className="board-row">
                {finalTable[0] !== null ? (
                    <div className="finalTableSquare">
                        <div
                            className={`${
                                finalTable[0] === "X" ? "xStyle" : "oStyle"
                            }`}
                        >
                            {finalTable[0]}
                        </div>
                    </div>
                ) : (
                    <Board
                        onPlay={(nextSquares, square, winner) =>
                            handlePlay(0, nextSquares, square, winner)
                        }
                        squares={currentMove[0]}
                        xIsNext={xIsNext}
                        isPlayable={calculateNextPossibleTables(0)}
                    />
                )}

                {finalTable[3] !== null ? (
                    <div className="finalTableSquare">
                        <div
                            className={`${
                                finalTable[3] === "X" ? "xStyle" : "oStyle"
                            }`}
                        >
                            {finalTable[3]}
                        </div>
                    </div>
                ) : (
                    <Board
                        onPlay={(nextSquares, square, winner) =>
                            handlePlay(3, nextSquares, square, winner)
                        }
                        squares={currentMove[3]}
                        xIsNext={xIsNext}
                        isPlayable={calculateNextPossibleTables(3)}
                    />
                )}

                {finalTable[6] !== null ? (
                    <div className="finalTableSquare">
                        <div
                            className={`${
                                finalTable[6] === "X" ? "xStyle" : "oStyle"
                            }`}
                        >
                            {finalTable[6]}
                        </div>
                    </div>
                ) : (
                    <Board
                        onPlay={(nextSquares, square, winner) =>
                            handlePlay(6, nextSquares, square, winner)
                        }
                        squares={currentMove[6]}
                        xIsNext={xIsNext}
                        isPlayable={calculateNextPossibleTables(6)}
                    />
                )}
            </div>
            <div className="board-row">
                {finalTable[1] !== null ? (
                    <div className="finalTableSquare">
                        <div
                            className={`${
                                finalTable[1] === "X" ? "xStyle" : "oStyle"
                            }`}
                        >
                            {finalTable[1]}
                        </div>
                    </div>
                ) : (
                    <Board
                        onPlay={(nextSquares, square, winner) =>
                            handlePlay(1, nextSquares, square, winner)
                        }
                        squares={currentMove[1]}
                        xIsNext={xIsNext}
                        isPlayable={calculateNextPossibleTables(1)}
                    />
                )}

                {finalTable[4] !== null ? (
                    <div className="finalTableSquare">
                        <div
                            className={`${
                                finalTable[4] === "X" ? "xStyle" : "oStyle"
                            }`}
                        >
                            {finalTable[4]}
                        </div>
                    </div>
                ) : (
                    <Board
                        onPlay={(nextSquares, square, winner) =>
                            handlePlay(4, nextSquares, square, winner)
                        }
                        squares={currentMove[4]}
                        xIsNext={xIsNext}
                        isPlayable={calculateNextPossibleTables(4)}
                    />
                )}

                {finalTable[7] !== null ? (
                    <div className="finalTableSquare">
                        <div
                            className={`${
                                finalTable[7] === "X" ? "xStyle" : "oStyle"
                            }`}
                        >
                            {finalTable[7]}
                        </div>
                    </div>
                ) : (
                    <Board
                        onPlay={(nextSquares, square, winner) =>
                            handlePlay(7, nextSquares, square, winner)
                        }
                        squares={currentMove[7]}
                        xIsNext={xIsNext}
                        isPlayable={calculateNextPossibleTables(7)}
                    />
                )}
            </div>
            <div className="board-row">
                {finalTable[2] !== null ? (
                    <div className="finalTableSquare">
                        <div
                            className={`${
                                finalTable[2] === "X" ? "xStyle" : "oStyle"
                            }`}
                        >
                            {finalTable[2]}
                        </div>
                    </div>
                ) : (
                    <Board
                        onPlay={(nextSquares, square, winner) =>
                            handlePlay(2, nextSquares, square, winner)
                        }
                        squares={currentMove[2]}
                        xIsNext={xIsNext}
                        isPlayable={calculateNextPossibleTables(2)}
                    />
                )}

                {finalTable[5] !== null ? (
                    <div className="finalTableSquare">
                        <div
                            className={`${
                                finalTable[5] === "X" ? "xStyle" : "oStyle"
                            }`}
                        >
                            {finalTable[5]}
                        </div>
                    </div>
                ) : (
                    <Board
                        onPlay={(nextSquares, square, winner) =>
                            handlePlay(5, nextSquares, square, winner)
                        }
                        squares={currentMove[5]}
                        xIsNext={xIsNext}
                        isPlayable={calculateNextPossibleTables(5)}
                    />
                )}

                {finalTable[8] !== null ? (
                    <div className="finalTableSquare">
                        <div
                            className={`${
                                finalTable[8] === "X" ? "xStyle" : "oStyle"
                            }`}
                        >
                            {finalTable[8]}
                        </div>
                    </div>
                ) : (
                    <Board
                        onPlay={(nextSquares, square, winner) =>
                            handlePlay(8, nextSquares, square, winner)
                        }
                        squares={currentMove[8]}
                        xIsNext={xIsNext}
                        isPlayable={calculateNextPossibleTables(8)}
                    />
                )}
            </div>
        </div>
    );
}

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
        if (
            squares[a] &&
            squares[a] === squares[b] &&
            squares[a] === squares[c]
        ) {
            return squares[a];
        }
    }

    return null;
}
