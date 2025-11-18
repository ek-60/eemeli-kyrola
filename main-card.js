class MainCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <style>

        :host {
          display: flex;
          width: 100%;
          height: auto;               /* kasvaa sisällön mukaan */
          min-height: 100svh;         /* ei koskaan pienempi kuin viewport */
          box-sizing: border-box;
          background: #fff;
        }

        .card {
        
          fex-grow: 1;
          
          margin: 20px;
          padding: 20px;

          background: #1e3a8a;        /* sininen tausta */
          color: white;
          box-sizing: border-box;

          position: relative;
          border: 1px solid #cccccc;  /* reunaviiva */

          display: flex;
          flex-direction: column;
        }

        /* Kulman viivat */
        .cross {
          position: absolute;
          width: 20px;
          height: 20px;
          z-index: 10;
        }

        .cross-top-left {
          top: -10px;
          left: -10px;
        }

        .cross-bottom-right {
          bottom: -10px;
          right: -10px;
        }

        .cross-line {
          position: absolute;
          border-color: #999999;
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

        .card-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

      </style>

      <div class="card">

        <!-- Vasemman yläkulman risti -->
        <div class="cross cross-top-left">
          <div class="cross-line cross-line-vertical"></div>
          <div class="cross-line cross-line-horizontal"></div>
        </div>

        <!-- Oikean alakulman risti -->
        <div class="cross cross-bottom-right">
          <div class="cross-line cross-line-vertical"></div>
          <div class="cross-line cross-line-horizontal"></div>
        </div>

        <div class="card-content">
          <!-- Tässä on nyt pyytämäsi body-slot -->
          <slot name="body"></slot>
        </div>

      </div>
    `;
  }
}

customElements.define("main-card", MainCard);