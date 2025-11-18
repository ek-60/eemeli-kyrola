class MainCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {

    this.shadowRoot.innerHTML = `
      <style>

        /********************************
         * HOST 
         ********************************/
        :host {
          display: flex;
          justify-content: center;
          align-items: center;     /* desktop keskitys */
          width: 100%;
          min-height: 100vh;       /* sivu venyy, kortti ei */
          box-sizing: border-box;
          padding: 20px;
        }

        /********************************
         * APP CARD (KORTTI)
         ********************************/
        .app-card {
          display: flex;
          flex-direction: column;
          box-sizing: border-box;

          width: 100%;
          max-width: 600px;      /* desktop max */
          min-height: 600px;     /* desktop min */

          flex-grow: 1;          /* TÄRKEÄ: venyy hostin sisällä */
        }

        /********************************
         * MOBILE FIX
         ********************************/
        @media (max-width: 767px) {

          :host {
            align-items: flex-start;    /* EI keskity mobiilissa */
            padding: 0;                /* EI ylimääräistä yläreunaa */
            min-height: auto;          /* EI pakotettua 100vh:ta */
          }

          .app-card {
            width: 100%;
            max-width: none;
            min-height: 100%;          /* venyy ympäristön mukaan */
            flex-grow: 1;              /* VENYÄ hostin täyteen */
          }
        }

        /********************************
         * INNER LAYOUT
         ********************************/
        .grid-container {
          flex: 1;                 
          display: flex;
          flex-direction: column;
          box-sizing: border-box;
        }

        .grid {
          flex: 1;
          display: flex;
          flex-direction: column;
          position: relative;
          border: 1px solid #ccc;
        }

        .grid-content {
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          flex-grow: 1;
        }

        .grid-content-body {
          flex-grow: 1;
        }

        /* crosses */
        .cross {
          position: absolute;
          width: 20px;
          height: 20px;
        }

        .cross-top-left { top: -11px; left: -11px; }
        .cross-bottom-right { bottom: -10px; right: -10px; }

        .cross-line {
          position: absolute;
          border-color: #999;
          border-style: solid;
          border-width: 0;
        }

        .cross-line-vertical {
          width: 10px;
          height: 20px;
          border-right-width: 1px;
        }

        .cross-line-horizontal {
          width: 20px;
          height: 10px;
          border-bottom-width: 1px;
        }

      </style>

      <div class="app-card">
        <div class="grid-container">

          <div class="grid">

            <div class="cross cross-top-left">
              <div class="cross-line cross-line-vertical"></div>
              <div class="cross-line cross-line-horizontal"></div>
            </div>

            <div class="cross cross-bottom-right">
              <div class="cross-line cross-line-vertical"></div>
              <div class="cross-line cross-line-horizontal"></div>
            </div>

            <div class="grid-content">
              <slot name="top"></slot>

              <header>
                <h1>// eemeli kyrola</h1>
              </header>

              <div class="grid-content-body">
                <slot name="body"></slot>
              </div>
            </div>

          </div>

        </div>
      </div>
    `;
  }
}

customElements.define("main-card", MainCard);