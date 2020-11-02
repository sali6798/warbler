import jquery from "jquery";
const BASE_URL = `https://${window.location.host}/api/`;

export default {
    startGame: function() {
        return jquery.post(BASE_URL + "games");
    },
    joinGame: function(gameId) {
        return jquery.ajax({ 
            url: BASE_URL + "games/joingame?id=" + gameId,
            type: "PUT"
        });
    }
}