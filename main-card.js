class MainCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          --space-small: 10px;
          --space-medium: 20px;

          --font-family-monospace: monospace;
          --font-size-small: 12px;
          --font-size-medium: 16px;
          --font-size-large: 20px;

          display: flex;
          justify-content: center;
          align-items: center;      /* desktop keskitys */
          width: 100%;
          min-height: 100vh;        /* host = sivun korkeus */
          box-sizing: border-box;
          padding: 20px;
        }

        /* ------------ DESKTOP ------------ */
        .app-card {
          width: 100%;
          max-width: 600px;
          min-height: 600px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;             /* venyy kun host antaa tilaa */
          box-sizing: border-box;

          /* EI height-määrittelyä */
        }

        /* ------------ MOBILE ------------ */
        @media (max-width: 767px) {
          :host {
            align-items: flex-start; /* alkaa heti ylhäältä */
            padding: 0;              /* ei välejä */
          }

          .app-card {
            width: 100%;             /* täysi leveys */
            max-width: none;
            min-height: auto;        /* EI 100vh */
            flex-grow: 0;            /* kortti kasvaa sisällön mukaan */
          }
        }

        /* --- inner layout --- */

        .grid-container {
          display: flex;
          flex-direction: column;
          /* EI height määrittelyä */
        }

        .grid {
          display: flex;
          flex-direction: column;
          position: relative;
          border: 1px solid #ccc;
          /* EI height:100% */
        }

        .grid-content {
          padding: var(--space-medium);
          gap: var(--space-medium);
          display: flex;
          flex-direction: column;
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