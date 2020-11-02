import React, { useState } from 'react';
import { HubConnectionBuilder } from "@microsoft/signalr";


const Home = () => {
    const [connection, setConnection] = useState(null);

    useEffect(() => {
        const newConnection = new HubConnectionBuilder()
            .withUrl("https://loaclhost:5001/hubs/chart")
            .withAutomaticReconnect()
            .build();

        setConnection(newConnection);
    }, []);
}

export default Home;

/*export class Home extends Component {
    static displayName = Home.name;



    *//*handleClick(event) {
  
        //event.target.style.color = 
    }*/

  /*  componentDidMount() {
        var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

        connection.start().then(function () {
            document.getElementById("sendButton").disabled = false;
        }).catch(function (err) {
            return console.error(err.toString());
        });

    }*//*

  render () {
      return (
        <>
            <div className="container">
                <div className="row">&nbsp;</div>
                <div className="row">
                    <div className="col-2">User</div>
                    <div className="col-4"><input type="text" id="userInput" /></div>
                </div>
                <div className="row">
                    <div className="col-2">Message</div>
                    <div className="col-4"><input type="text" id="messageInput" /></div>
                </div>
                <div className="row">&nbsp;</div>
                <div className="row">
                      <div className="col-6">
                          <input type="button" id="sendButton" value="Send Message" onClick={this.handleClick} />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <hr />
                </div>
            </div>
            <div className="row">
                <div className="col-6">
                    <ul id="messagesList"></ul>
                </div>
             </div>
            <div className="row">
                  <div className="col-2">
                      <input type="button" id="joinButton" value="Join Game" />
                  </div>
            </div>
        </>
    );
  }
}*/
