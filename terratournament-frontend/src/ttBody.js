import { LitElement, html, css } from 'lit-element';
import {sessionEstablish, removeSession, read, writeGameOptions, readGameOptions} from './storage.js';


const host = "http://localhost:8081";

const mockState = {
    roomCode:"99075097",
    durationInSeconds:90,
    players:[
        {username:"tibi",score:11,completedRound:false},
        {username:"cristi",score:15,completedRound:false},
        {username:"andi",score:15,completedRound:false},
        {username:"gabi",score:15,completedRound:false}
    ],
    numberOfRounds:3,
    currentRound:0,
    leaderUsername:"anonymous"
}

export class ttBody extends LitElement {
    static get properties() {
        return {
            currentPage: { type: Number },
            displayEnterCode : { type: Boolean},
            displayJoin : { type: Boolean },
            leader: { type: Boolean},
            roomCode: {type: String}
        };
    }

    static get styles() {
        return css`
          #container, #containerhelp, #containerlogin, #containerjoinorcreate {
            color: white;
            display: flex;
            flex-direction: column;
            flex-wrap: nowrap;
            justify-content: center;
            align-items: center;
            align-content: center;
            height:100%;
          }

          #container #message, #containerlogin #message, #containerhelp #message, #containerjoinorcreate #message {
            display: block;
            flex-grow: 0;
            flex-shrink: 1;
            flex-basis: auto;
            align-self: auto;
            order: 0;
          }
          
          
          #organizer tr td {
            font-size: 25px;
            text-align:center;
            padding: 10px 25px 0px 25px;
          }

          #organizer tr td  button {
            box-shadow: 0px 0px 9px -1px #3dc21b;
            background-color: #44c767;
            border-radius: 21px;
            border: 2px solid #18ab29;
            display: inline-block;
            cursor: pointer;
            color: #ffffff;
            font-size: 20px;
            padding: 16px 31px;
            text-decoration: none;
            text-shadow: 0px 2px 2px #2f6627;
          }

          #organizer tr td  button:hover {
            background-color:#5cbf2a;
          }

          #organizer tr td  button:active {
            position: relative;
            top: 1px;
          }

          #codefield {
            padding: 8px 15px;
            text-align: center;
          }
          
          #enterbutton {
            box-shadow: 0px 0px 9px -1px #3dc21b;
            background-color: #44c767;
            border-radius: 21px;
            border: 2px solid #18ab29;
            display: inline-block;
            cursor: pointer;
            color: #ffffff;
            font-size: 20px;
            padding: 8px 15px;
            text-decoration: none;
            text-shadow: 0px 2px 2px #2f6627;
          }

        #containerroom {
          display: flex;
          flex-direction: row;
          flex-wrap: nowrap;
          justify-content: space-between;
          align-items: normal;
          align-content: normal;
          height:100%;
          width:100%;
        }       
          
        #playersmenu {
          display: block;
          flex-grow: 0;
          flex-shrink: 1;
          flex-basis: auto;
          align-self: auto;
          order: 0;
          width: 30%;
        }  
        #playersmenu table {
          background-color: rgba(25, 56, 82, 0.50);
          padding: 15px 80px 10px 80px;
        }  
          
        #gamemenu {
          display: block;
          color: white;
          font-size: 20px;
          flex-grow: 1;
          flex-shrink: 1;
          flex-basis: auto;
          align-self: auto;
          order: 0;
        }
          
          #gamemenu #container {
            width:100%;
            height:100%;
            display: flex;
            flex-direction: column;
            flex-wrap: nowrap;
            justify-content: flex-end;
            align-items: stretch;
            align-content: normal;
          }
          
          
          #gamemenu #container #up {
            display: block;
            flex-grow: 1;
            flex-shrink: 1;
            flex-basis: auto;
            align-self: auto;
            order: 0;
          }
          
          #gamemenu #container #down {
            display: block;
            flex-grow: 0;
            flex-shrink: 1;
            flex-basis: auto;
            align-self: auto;
            order: 0;
          }
        #playersmenu table td {
          text-align:center;
          font-size: 25px;
          color: white
        }
          
    `;
    }

    constructor() {
        super();
        this.currentPage = 0;
        this.displayEnterCode = false
        this.displayJoinAsGuest = true
        this.leader = true
        this.roomCode = "DEFAULT-CODE"
        writeGameOptions(mockState)
    }

    render() {
        // login page
        if (this.currentPage === 1) {
            return html`
                <div id="containerhelp">
                    <div id="message">
                        LOGIN
                    </div>
                </div>
            `
        }
        // help page
        if (this.currentPage === 2) {
            return html`
                <div id="containerlogin">
                    <div id="message">
                        TerraTournament is a game you can play with your friends to determine who is the geography master
                    </div>
                </div>
            `
        }
        // homepage
        if (this.currentPage === 0) {
            return html`
                <div id="container">
                    <div id="message">
                        <table id="organizer">
                            <tr>
                                <td>
                                    You are not logged in
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <button @click="${this._goToLoginPage}">
                                        Go to login page
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    or
                                </td>
                            </tr>
                            <tr>
                                    <td>
                                        <button @click="${this._goToCreateOrJoin}">
                                            Join as guest
                                        </button>
                                    </td>
                            </tr>
                        </table>
                    </div>
                </div>
            `;
        }

        // CreateOrJoin pane
        if (this.currentPage === 4) {
            return html`
                <div id="containerjoinorcreate">
                    <div id="message">
                        <table id="organizer">
                            <tr>
                                <td>
                                    <button @click="${this._createRoom}">
                                        Create a room
                                    </button>
                                </td>
                            </tr>
                            ${this.displayJoinAsGuest ?
                            html`<tr id="joinRow">
                                                <td>
                                                    <button @click="${this._showEnterCodeBox}">
                                                        Join a room
                                                    </button>
                                                </td>
                                            </tr>` : html``}
                            ${this.displayEnterCode ?
                            html`<tr id="enterCodeRow">
                                                <td>
                                                    <form @submit="${this._sendCodeToServer}">
                                                        <input id="codefield" type="text" placeholder="Code room" required name="code">
                                                        <input id="enterbutton" type="submit" value="Enter">
                                                    </form>
                                                </td>
                                            </tr>` : html``}
                        </table>
                    </div>
                </div>
            `;
        }

        // room page
        if (this.currentPage === 3) {

            let options = readGameOptions()


            let randomNumber = Math.floor(Math.random()*11) +1
            return html`
                <div id="containerroom">
                    <div id="playersmenu">
                        <table style="margin-left:auto; margin-right:auto;margin-top:50px;">
                            <tr>
                                <td>
                                    <img src="src/user${randomNumber}.png" height="100px">
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <span id="nume" style="color:white; font-size: 25px;">${read()[0]['username']}</span>
                                </td>
                            </tr>
                            
                            ${options['players'].map(
                                x => {
                                    let randomNumber = Math.floor(Math.random() * 11) + 1
                                    return html`<tr><td><img src="src/user${randomNumber}.png" height="50px"> ${x['username']} - ${x['score']} </td></tr>`
                                }
                            )}
                            
                        </table>
                    </div>
                    <div id="gamemenu">
                        
                        <div id="container">
                            ${this.leader ?
                                    html`
                                    <div id="up">
                                        <table>
                                            <tr>
                                                <td>You are the leader!</td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    Invite your friends using the room code, choose the game rules and have fun!
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <select>
                                                        <option value="" disabled selected>Rounds</option>
                                                        <option value="1">1</option>
                                                        <option value="3">3</option>
                                                        <option value="5">5</option>
                                                        <option value="8">8</option>
                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <select>
                                                        <option value="" disabled selected>Guessing time</option>
                                                        <option value="60">1 minute</option>
                                                        <option value="90">1:30 minutes</option>
                                                        <option value="120">2 minutes</option>
                                                    </select>
                                                </td>
                                            </tr>
                                        </table>
                                    </div>    
                                    <div id="down">
                                        <p> ROOM CODE: ${this.roomCode} </p>
                                    </div>
                                    
                                ` : html`
                                    <div id="up>"
                                    <table>
                                        <tr>
                                            <td>Wait for the leader to start the game</td>
                                        </tr>
                                    </table>
                                    </div>
                                `}
                        </div>
                        
                    </div>
                </div>
            `
        }

    }

    _goToCreateOrJoin(event) {
        removeSession()
        let random = Math.floor(Math.random() * 6000) + 1000;
        sessionEstablish({username: "Guest"+random, durationInSeconds: 90, numberOfRounds: 3})
        this.currentPage = 4;
        this.dispatchEvent(new CustomEvent('page-update', { detail: 4 }));
    }

     _sendCodeToServer(event) {
        event.preventDefault();
        this.leader = false
        let form = event.target
        let code = form.elements[0].value

         let url= host + "/validate-code?code=" + code
         console.log("FAC GET LA "+url)
         let response = fetch(url)
             .then(function(response) {
             return response.json();
         }).then(function(data) {
             console.log("Raspuns "+ data)
             // data = raspunsul de la server
             let codeValidated = data['codeValidated']
             console.log("codeValidated "+codeValidated)

            if (codeValidated) {
                this.leader = false
                // SUBSCRIBE TO TOPIC
                console.log("ACUM FAC SUBSCRIBE LA TOPIC /topic/rooms/" +code)
            } else {
                console.log("Cod room incorect")
            }

         }).catch(function() {
             console.log("Booo");
         });

         this.currentPage = 3;
         this.dispatchEvent(new CustomEvent('page-update', { detail: 3 }));
     }

    async _createRoom(event) {
        // SEND CREATE ROOM REQUEST TO BACKEND
        this.leader = true
        let url= host + "/create"
        console.log("FAC POST LA "+url)
        let response = fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(read()[0])
        }).then(function(response) {
            return response.json();
        }).then(function(data) {
            console.log("Raspuns "+ data)
            // data = raspunsul de la server
            writeGameOptions(data)

            let roomCode = data['roomCode']
            this.leader = true
            // SUBSCRIBE TO TOPIC
            console.log("ACUM FAC SUBSCRIBE LA TOPIC /topic/rooms/" + roomCode)
            // TODO SUBSCRIBE
        }).catch(function() {
            console.log("Booo");
        });

        this.currentPage = 3;
        this.dispatchEvent(new CustomEvent('page-update', { detail: 3 }));
    }


    _goToLoginPage(event) {
        this.currentPage = 1;
        this.dispatchEvent(new CustomEvent('page-update', { detail: 1 }));
    }

    _showEnterCodeBox(event) {
        this.displayEnterCode = true
        this.displayJoinAsGuest = false
    }
}

window.customElements.define('tt-body', ttBody);