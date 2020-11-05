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
    const playerId = useSelector(state => state.playerId);
    const [isChangedGame, setIsChangedGame] = useState(false);

    useEffect(() => {
        if (isChangedGame) {
            props.connection.invoke("PlayerAction", currentGameId, currentPlayerId, gameBoard.flat())
            setIsChangedGame(false);
        }
    }, [gameBoard, isChangedGame])

    const handleClick = (value, index) => {
        if (playerId === currentPlayerId && value === -1) {
            dispatch(updateGameBoard(currentPlayerId, index));
            setIsChangedGame(true);
        }
    }

    return (
        <div className="Grid">
            {playerId === currentPlayerId
                ? <h1>It is your move!</h1>
                : <h1>Waiting for the other player's move...</h1>
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