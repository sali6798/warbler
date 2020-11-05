import * as actionTypes from "./actionTypes";
import API from "../../utils/API"

export const saveIds = (gameId, playerId) => {
    return {
        type: actionTypes.STORE_IDS,
        payload: { gameId: gameId, playerId: playerId }
    }
};

export const storeIds = (...args) => {
    return async dispatch => {
        try {
            let response;

            if (args[0] === "create") {
                response = await API.startGame();
            }
            else {
                response = await API.joinGame(args[1]);
            }

            dispatch(saveIds(response.gameId, response.playerId));
        } catch (error) {
            console.log(error);
        }
    }
};

export const updateCurrentPlayer = id => {
    return {
        type: actionTypes.UPDATE_CURRENT_PLAYER,
        currentPlayer: id
    }
};

export const updateGameBoard = (...args) => {
    if (args.length === 2) {
        return {
            type: actionTypes.UPDATE_GAME_BOARD,
            payload: {
                currentPlayer: args[0],
                index: args[1]
            }
        }
    }
    
    return {
        type: actionTypes.UPDATE_GAME_BOARD,
        payload: {
            newBoard: args[0]
        }
    }
}