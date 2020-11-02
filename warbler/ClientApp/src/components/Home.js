import React, { useState, useEffect } from 'react';
import { HubConnectionBuilder } from "@microsoft/signalr";
import API from "../utils/API";

export default function Home() {
    const [connection, setConnection] = useState(null);
    // const [openGames, setOpenGames] = useState([]);
    const [openGames, setOpenGames] = useState();
    const [createdGameId, setCreatedGameId] = useState();

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
                        // console.log(openGames)
                        // console.log(id);
                        setOpenGames(id);
                        // setOpenGames([...openGames, id]);
                    })
                })
                .catch(e => console.log("Connection failed:", e))

        }
    }, [connection]);

    const handleClick = async event => {
        try {
            const { id } = event.target;

            if (id === "createButton") {
                const gameId = await API.startGame();
                // console.log(gameId)
                setCreatedGameId(gameId);
                // console.log(openGames)
                // setOpenGames([...openGames, gameId]);

                connection.invoke("InvitePlayers", gameId);
            }
            else {
                await API.joinGame(openGames);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className="row">
                <div className="col-6">
                    <input type="button" id="createButton" value="Create Game" onClick={handleClick} />
                </div>
                <div className="col-6">
                    {
                        createdGameId !== openGames
                        ? <input type="button" id="joinButton" value="Join Game" onClick={handleClick}/>
                        : null
                    /* {
                        openGames.map(openGame => <input type="button" key={openGame} value="Join Game" />)
                    } */
                    }
                </div>
            </div>
        </>
    );
}
