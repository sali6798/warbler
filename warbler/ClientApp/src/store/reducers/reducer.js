import * as actionTypes from "../actions/actionTypes";

const initialState = {
    currentGameId: null,
    currentPlayerId: null,
    gameBoard: [
        [-1, -1, -1],
        [-1, -1, -1],
        [-1, -1, -1]
    ],
    hasGameFinished: false,
    playerId: null
};


const updateGameBoard = (state, payload) => {
    let newArr;

    if (payload.newBoard) {
        newArr = [
            payload.newBoard.slice(0, 3),
            payload.newBoard.slice(3, 6),
            payload.newBoard.slice(6)
        ]
    }
    else {
        newArr = state.gameBoard.map((row, index) => {
            if (index === +payload.index[0]) {
                const copy = [...row];
                copy[+payload.index[1]] = payload.currentPlayer
                return copy;
            }
            return row;
        });
    }

    return newArr;
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.STORE_IDS:
            return {
                ...state,
                currentGameId: action.payload.gameId,
                playerId: action.payload.playerId
            }
        case actionTypes.UPDATE_CURRENT_PLAYER:
            return {
                ...state,
                currentPlayerId: action.currentPlayer
            }
        case actionTypes.UPDATE_GAME_BOARD:
            return {
                ...state,
                gameBoard: updateGameBoard(state, action.payload)
            }
        case actionTypes.END_GAME:
            return {
                ...state,
                gameBoard: updateGameBoard(state, action.payload),
                hasGameFinished: true
            }
        default:
            return state;
    }
}

export default reducer;