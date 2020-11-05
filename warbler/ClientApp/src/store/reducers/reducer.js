import * as actionTypes from "../actions/actionTypes";

const initialState = {
    gameBoard: [
        [-1, -1, -1],
        [-1, -1, -1],
        [-1, -1, -1]
    ],
    currentGameId: null,
    currentPlayerId: null,
    playerId: null
};

const updateGameBoard = (state, payload) => {
    if (payload.newBoard) {
        return [
            payload.newBoard.slice(0, 3),
            payload.newBoard.slice(3, 6),
            payload.newBoard.slice(6)
        ]
    }

    const newArr = state.gameBoard.map((row, index) => {
        if (index === +payload.index[0]) {
            const copy = [...row];
            copy[+payload.index[1]] = payload.currentPlayer
            return copy;
        }
        return row;
    });

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
        default:
            return state;
    }
}

export default reducer;