"use strict";

document.addEventListener("DOMContentLoaded", function (event) {

    var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

    //Disable send button until connection is established
    document.getElementById("sendButton").disabled = true;
    document.getElementById("joinButton").hidden = true;
   

    connection.on("ReceivedMessage", function (user, message) {
        var msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        var encodedMsg = user + " says " + msg;
        var li = document.createElement("li");
        li.textContent = encodedMsg;
        document.getElementById("messagesList").appendChild(li);
    });

    connection.start().then(function () {
        document.getElementById("sendButton").disabled = false;
    }).catch(function (err) {
        return console.error(err.toString());
    });

    document.getElementById("sendButton").addEventListener("click", function (event) {
        var user = document.getElementById("userInput").value;
        var message = document.getElementById("messageInput").value;
        //connection.invoke("SendMessage", user, message).catch(function (err) {
        connection.invoke("CreateGame").catch(function (err) {
            return console.error(err.toString());
        });
        event.preventDefault();
    });

    document.getElementById("joinButton").addEventListener("click", function (event) {
        //connection.invoke("SendMessage", user, message).catch(function (err) {
        connection.invoke("JoinGame", 0).catch(function (err) {
            return console.error(err.toString());
        });
        event.preventDefault();
    });

    connection.on("GameCreated", function (gameId) {
        document.getElementById("joinButton").hidden = false;
    }); 
});
