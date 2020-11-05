import React, { useState, useEffect } from 'react';
import { HubConnectionBuilder } from "@microsoft/signalr";
import { useDispatch, useSelector } from "react-redux";
import Grid from "./Grid";
import { storeIds, updateCurrentPlayer, updateGameBoard } from "../store/actions/game";

const Home = () => {
    const [connection, setConnection] = useState(null);
    const [hasCreatedGame, setHasCreatedGame] = useState(false);
    const [openGames, setOpenGames] = useState();

    const dispatch = useDispatch();
    const currentGameId = useSelector(state => state.currentGameId);
    const currentPlayerId = useSelector(state => state.currentPlayerId);
    const playerId = useSelector(state => state.playerId);

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
                        dispatch(updateCurrentPlayer(player));
                    });

                    connection.on("PlayerAction", (...args) => {
                        dispatch(updateCurrentPlayer(args[1].currentPlayer));
                        dispatch(updateGameBoard(args[1].actions));
                    })
                })
                .catch(e => console.log("Connection failed:", e))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [connection]);


    useEffect(() => {
        if (currentGameId) {
            if (hasCreatedGame) {
                connection.invoke("InvitePlayers", currentGameId);
            }
            else {
                connection.invoke("PlayerJoined", currentGameId, playerId);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentGameId, playerId])


    const handleClick = event => {
        const { id } = event.target;

        if (id === "createButton") {
            setHasCreatedGame(true);
            dispatch(storeIds("create"));
        }
        else {
            dispatch(storeIds("join", openGames));
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
                            ? <input type="button" id="joinButton" value="Join Game" onClick={handleClick} />
                            : null
                        /* {
                            openGames.map(openGame => <input type="button" key={openGame} value="Join Game" />)
                        } */
                    }
                </div>
            </div>
            
            {currentPlayerId !== null && currentGameId ? <Grid connection={connection}/> : null}
        </>
    );
}

export default Home;

// const mapStateToProps = state => {
//     return {
//         connection: state.connection
//     };
// };

// const mapDispatchToProps = dispatch => {
//     return {
//         onConnection: () => dispatch({ type: actionTypes.START_GAME })
//     };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Home);

// const Home = () => {
//     const [connection, setConnection] = useState(null);
//     const [openGames, setOpenGames] = useState();
//     const [playerId, setPlayerId] = useState();
//     const [currentPlayerId, setCurrentPlayerId] = useState();
//     const [currentGameId, setCurrentGameId] = useState();

//     const [hasCreatedGame, setHasCreatedGame] = useState(false);
//     const [gameBoard, setGameBoard] = useState(
//         [
//             [-1, -1, -1],
//             [-1, -1, -1],
//             [-1, -1, -1]
//         ]
//     );

//     useEffect(() => {
//         const newConnection = new HubConnectionBuilder()
//             .withUrl("/chatHub")
//             .withAutomaticReconnect()
//             .build();

//         setConnection(newConnection);
//     }, []);

//     useEffect(() => {
//         if (connection) {
//             connection.start()
//                 .then(result => {
//                     console.log("Connected!");

//                     connection.on("GameAvailable", id => {
//                         setOpenGames(id);
//                     });

//                     connection.on("GameReady", (id, player) => {
//                         setCurrentPlayerId(player);
//                     });
//                 })
//                 .catch(e => console.log("Connection failed:", e))

//         }
//     }, [connection]);

//     const handleClick = async event => {
//         try {
//             const { id } = event.target;

//             if (id === "createButton") {
//                 setHasCreatedGame(true);

//                 const { gameId, playerId } = await API.startGame();
//                 setCurrentGameId(gameId);
//                 setPlayerId(playerId);

//                 connection.invoke("InvitePlayers", gameId);
//             }
//             else {
//                 const { gameId, playerId } = await API.joinGame(openGames);
//                 setCurrentGameId(gameId);
//                 setPlayerId(playerId);

//                 connection.invoke("PlayerJoined", gameId, playerId);
//             }
//         } catch (error) {
//             console.log(error);
//         }
//     }

//     return (
//         <>
//             <div className="row">
//                 <div className="col-6">
//                     {connection ? <input type="button" id="createButton" value="Create Game" onClick={handleClick} /> : null}
//                 </div>
//                 <div className="col-6">
//                     {
//                         !hasCreatedGame && openGames
//                         ? <input type="button" id="joinButton" value="Join Game" onClick={handleClick}/>
//                         : null
//                     /* {
//                         openGames.map(openGame => <input type="button" key={openGame} value="Join Game" />)
//                     } */
//                     }
//                 </div>
//             </div>
//             {currentGameId ? <Grid playerId={playerId} currentPlayerId={currentPlayerId}  /> : null}
//         </>
//     );
// }
