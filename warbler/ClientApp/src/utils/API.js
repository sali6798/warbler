import jquery from "jquery";
const BASE_URL = `https://${window.location.host}/api/`;

export default {
    startGame: function() {
        return jquery.post(BASE_URL + "games");
    },
    joinGame: function (gameId) {
        console.log(BASE_URL + "games/joingame?gameid=" + gameId)
        return jquery.ajax({ 
            url: BASE_URL + "games/joingame?gameid=" + gameId,
            type: "PUT"
        });
    }
}