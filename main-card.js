class MainCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {

    this.shadowRoot.innerHTML = `
      <style>
        /******************************************
         * HOST: ei mitään mittoja, ei korkeuksia
         ******************************************/
        :host {
          display: flex;
          justify-content: center;
          align-items: center;      /* desktop-keskitys */
          box-sizing: border-box;
          width: 100%;
          padding: 20px;
        }

        /******************************************
         * DESKTOP: varsinainen kortti, kaikki mitat
         ******************************************/
        .app-card {
          display: flex;
          flex-direction: column;
          box-sizing: border-box;

          width: 100%;
          max-width: 600px;    /* desktop max width */
          min-height: 600px;   /* desktop min height */

          border: 1px solid transparent; /* layout-stabiloija */
        }

        /******************************************
         * MOBILE: EI keskitystä + vie koko leveyden
         *         KASVAA sisällön mukaan
         ******************************************/
        @media (max-width: 767px) {
          :host {
            align-items: flex-start;   /* EI keskitystä ylhäällä */
            padding: 0;                /* ei ylimääräistä tilaa */
          }

          .app-card {
            width: 100%;               /* mobiilileveys */
            max-width: none;
            min-height: auto;          /* EI pakotettua korkeutta */
          }
        }

        /******************************************
         * Inner layout (mikä sinulla jo toimii)
         ******************************************/
        .grid-container {
          display: flex;
          flex-direction: column;
        }

        .grid {
          position: relative;
          display: flex;
          flex-direction: column;
          border: 1px solid #ccc;
        }

        .grid-content {
          padding: var(--space-medium);
          display: flex;
          flex-direction: column;
          gap: var(--space-medium);
        }

        .grid-content-header h1 {
          margin: 0;
          font-size: var(--font-size-large);
          font-family: var(--font-family-monospace);
        }

        .grid-content-body {
          display: flex;
          flex-direction: column;
        }

        .cross {
          position: absolute;
          width: var(--space-medium);
          height: var(--space-medium);
          z-index: 10;
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
          width: var(--space-small);
          height: var(--space-medium);
          border-right-width: 1px;
        }

        .cross-line-horizontal {
          width: var(--space-medium);
          height: var(--space-small);
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

              <header class="grid-content-header">
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