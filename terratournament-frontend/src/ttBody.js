import { LitElement, html, css } from 'lit-element';
import {sessionEstablish, removeSession, read, writeGameOptions, readGameOptions} from './storage.js';


const host = "http://localhost:8081";

export class ttBody extends LitElement {
    static get properties() {
        return {
            currentPage: { type: Number },
            displayEnterCode : { type: Boolean},
            displayJoin : { type: Boolean }
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
          
          
    `;
    }

    constructor() {
        super();
        this.currentPage = 0;
        this.displayEnterCode = false
        this.displayJoinAsGuest = true
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
            return html`
                THIS IS ROOM PAGE
            `
        }

    }

    _goToCreateOrJoin(event) {
        removeSession()
        sessionEstablish({username: "anonymous", durationInSeconds: 90, numberOfRounds: 3})
        this.currentPage = 4;
        this.dispatchEvent(new CustomEvent('page-update', { detail: 4 }));
    }

     _sendCodeToServer(event) {
        event.preventDefault();
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

            // SUBSCRIBE TO TOPIC
            console.log("ACUM FAC SUBSCRIBE LA TOPIC /topic/rooms/" + roomCode)
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