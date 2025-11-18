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
          --font-family-sans-serif: sans-serif;
          --font-size-small: 12px;
          --font-size-medium: 16px;
          --font-size-large: 20px;
          --font-color: #000000;

          display: flex;
          justify-content: center;
          align-items: center;

          width: 100%;
          min-height: 100vh;       /* host voi täyttää ruudun */
          box-sizing: border-box;
          
          padding: 20px;
        }

        /* --- DESKTOP --- */
        .app-card {
          width: 100%;
          max-width: 600px;        /* max 600 leveä */
          min-height: 600px;       /* vähintään 600 korkea */
          display: flex;
          box-sizing: border-box;
        }

        /* --- MOBILE --- */
        @media (max-width: 767px) {
          .app-card {
            width: 100%;           /* leveys 100% */
            max-width: 600px;      /* ei ylitä */
            min-height: 600px;     /* min-korkeus sama */
            height: auto;          /* EI 100vh */
          }
        }

        .grid-container {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .grid {
          flex: 1;
          position: relative;
          border: 1px solid #cccccc;
          display: flex;
          flex-direction: column;
        }

        .grid-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          padding: var(--space-medium);
          gap: var(--space-medium);
          box-sizing: border-box;
        }

        .grid-content-header h1 {
          font-size: var(--font-size-large);
          font-family: var(--font-family-monospace);
          color: var(--font-color);
          margin: 0;
        }

        .grid-content-body {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .cross {
          position: absolute;
          width: var(--space-medium);
          height: var(--space-medium);
          z-index: 10;
        }

        .cross-top-left {
          top: -11px;
          left: -11px;
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