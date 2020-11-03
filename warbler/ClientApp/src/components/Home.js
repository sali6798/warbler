import React, { useState, useEffect } from 'react';
import { HubConnectionBuilder } from "@microsoft/signalr";
import Grid from "./Grid";
import API from "../utils/API";

export default function Home() {
    const [connection, setConnection] = useState(null);
    const [openGames, setOpenGames] = useState();
    const [playerId, setPlayerId] = useState();
    const [currentPlayerId, setCurrentPlayerId] = useState();
    const [currentGameId, setCurrentGameId] = useState();

    const [hasCreatedGame, setHasCreatedGame] = useState(false);

    useEffect(() => {
        const newConnection = new HubConnectionBuilder()
            .withUrl("/chatHub")
            .withAutomaticReconnect()
            .build();

        setConnection(newConnection);
    }, []);

    useEffect(() => {
        if (connection) {
            connection.start()
                .then(result => {
                    console.log("Connected!");

                    connection.on("GameAvailable", id => {
                        setOpenGames(id);
                    });

                    connection.on("GameReady", (id, player) => {
                        setCurrentPlayerId(player);
                    });
                })
                .catch(e => console.log("Connection failed:", e))

        }
    }, [connection]);

    const handleClick = async event => {
        try {
            const { id } = event.target;

            if (id === "createButton") {
                setHasCreatedGame(true);

                const { gameId, playerId } = await API.startGame();
                setCurrentGameId(gameId);
                setPlayerId(playerId);

                connection.invoke("InvitePlayers", gameId);
            }
            else {
                const { gameId, playerId } = await API.joinGame(openGames);
                setCurrentGameId(gameId);
                setPlayerId(playerId);

                connection.invoke("PlayerJoined", gameId, playerId);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className="row">
                <div className="col-6">
                    {connection ? <input type="button" id="createButton" value="Create Game" onClick={handleClick} /> : null}
                </div>
                <div className="col-6">
                    {
                        !hasCreatedGame && openGames
                        ? <input type="button" id="joinButton" value="Join Game" onClick={handleClick}/>
                        : null
                    /* {
                        openGames.map(openGame => <input type="button" key={openGame} value="Join Game" />)
                    } */
                    }
                </div>
            </div>
            {currentGameId ? <Grid /> : null}
        </>
    );
}
