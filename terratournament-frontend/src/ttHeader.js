import { LitElement, html, css } from 'lit-element';


export class ttHeader extends LitElement {
    static get properties() {
        return {
            message: { type: String },
        };
    }

    static get styles() {
        return css`
          #container {
            color: white;
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            justify-content: space-between;
            align-items: stretch;
            align-content: stretch;
          }
          
          #logo {
            display: block;
            flex-grow: 0;
            flex-shrink: 1;
            flex-basis: auto;
            align-self: auto;
            order: 0;
            margin-left: 50px;
          }

          #logo:hover {
            cursor: pointer;
          }
          
          #menu {
            display: block;
            flex-grow: 0;
            flex-shrink: 0;
            flex-basis: auto;
            align-self: auto;
            order: 0;
            margin-right: 50px;
          }
          
          #menu ol li { 
            display: inline;
            padding: 12px 25px 12px 25px;
          }
          
          #menu ol li:hover {
            color: #5cbf2a;
            cursor: pointer;
          }
          
          #logoimage{
            display: inline-block;
            vertical-align: middle;
            height:50px;
            width:80px;
          }
          #logoname {
            display: inline-block;
            vertical-align: middle;
            font-size: 20px;
          }
    `;
    }

    constructor() {
        super();
        this.message = '';
    }

    render() {
        return html`
            <div id="container">
                <div id="logo" @click="${this._goToHomepage}">
                    <span id="logoname">TerraTournament</span>
                    <img id="logoimage" src="./src/logo.png">
                </div>
                
                <div id="menu">
                    <ol>
                        <li @click="${this._goToHelppage}"> Help </li>
                        <li @click="${this._goToLoginpage}"> Login </li>
                    </ol>
                </div>
            </div>
            
    `;
    }

    _goToHomepage() {
        console.log("Hello from child")
        this.dispatchEvent(new CustomEvent('change-page', { detail: 0 }));
    }

    _goToHelppage() {
        console.log("Hello from child")
        this.dispatchEvent(new CustomEvent('change-page', { detail: 2 }));
    }

    _goToLoginpage() {
        console.log("Hello from child")
        this.dispatchEvent(new CustomEvent('change-page', { detail: 1 }));
    }
}

window.customElements.define('tt-header', ttHeader);