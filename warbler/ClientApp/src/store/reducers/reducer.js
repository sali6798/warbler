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

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.STORE_IDS:
            return {
                ...state,
                currentGameId: action.payload.gameId,
                playerId: action.payload.playerId
            }

        default:
            return state;
    }
}

export default reducer;