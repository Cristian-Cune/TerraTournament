import { LitElement, html, css } from 'lit-element';

import './ttHeader'
import './ttBody'


export class ttMain extends LitElement {
    static get properties() {
        return {
            message: { type: String },
            currentPage: { type: Number }
        };
    }

    static get styles() {
        return css`
          tt-header {
            display: block;
            background-color: rgba(25, 56, 82, 0.8);
            flex-grow: 0;
            flex-shrink: 1;
            flex-basis: auto;
            align-self: auto;
            order: 0;
          }
          
          tt-body {
            display: block;
            background-color: rgba(25, 56, 82, 0.8);
            flex-grow: 1;
            flex-shrink: 8;
            flex-basis: auto;
            align-self: auto;
            order: 0;
          }
    `;
    }

    constructor() {
        super();
        this.message = '';
        this.currentPage = 0
    }

    render() {
        console.log(this.currentPage)
        return html`
            <tt-header @change-page="${this._updateBodyFrame}"></tt-header>
            <tt-body @page-update="${this._pageUpdated}"  currentPage="${this.currentPage}"></tt-body>
    `;
    }

    _updateBodyFrame(event) {
        console.log("Am primit "+event.detail)
        this.currentPage = event.detail
    }

    _pageUpdated(event) {
        console.log("Am primit eveniment de schimbare din body "+event.detail)
        this.currentPage = event.detail
    }

}