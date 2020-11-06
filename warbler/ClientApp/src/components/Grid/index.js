import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./style.css";
import Cell from "../Cell";
import { updateGameBoard } from "../../store/actions/game";

export default function Grid(props) {
    const dispatch = useDispatch();
    const currentGameId = useSelector(state => state.currentGameId)
    const currentPlayerId = useSelector(state => state.currentPlayerId);
    const gameBoard = useSelector(state => state.gameBoard);
    const hasGameFinished = useSelector(state => state.hasGameFinished);
    const playerId = useSelector(state => state.playerId);
    const [isChangedGame, setIsChangedGame] = useState(false);
    
    useEffect(() => {
        if (isChangedGame) {
            const hasWon = checkForWinner(gameBoard.flat());

            if (!hasWon) {
                props.connection.invoke("PlayerAction", currentGameId, currentPlayerId, gameBoard.flat())
                setIsChangedGame(false);
            }
            else {
                props.connection.invoke("GameWon", currentGameId, currentPlayerId, gameBoard.flat());
            }
        }
        
    }, [gameBoard, isChangedGame, hasGameFinished])

    const checkForWinner = updatedGameBoard => {
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
    
        for (let i = 0; i < winningCombinations.length; i++) {
            const [a, b, c] = winningCombinations[i];
    
            if (updatedGameBoard[a] > -1 
                && updatedGameBoard[a] === updatedGameBoard[b] 
                && updatedGameBoard[a] === updatedGameBoard[c]) {
                return true;
            }
        }
        
        return false;
    }

    const handleClick = (value, index) => {
        if (!hasGameFinished && playerId === currentPlayerId && value === -1) {
            dispatch(updateGameBoard(currentPlayerId, index));
            setIsChangedGame(true);
        }
    }

    return (
        <div className="Grid">
            {hasGameFinished 
                ? <h1>Player {currentPlayerId} is the winner!</h1>
                : (playerId === currentPlayerId
                ? <h1>It is your move!</h1>
                : <h1>Waiting for the other player's move...</h1>)
            }
        

            {gameBoard.map((row, rowIndex) => (
                <div key={rowIndex} className="row no-gutters">
                    {row.map((cell, index) => (
                        <Cell
                            key={`${rowIndex}${index}`}
                            id={`${rowIndex}${index}`}
                            value={cell}
                            handleClick={handleClick}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
}