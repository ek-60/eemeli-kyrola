class MainCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const title = this.getAttribute("title") || "";

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          --space-small: 10px;
          --space-medium: 20px;
          --card-width: 900px;
          --card-height: 600px;

          --font-family-monospace: monospace;
          --font-family-sans-serif: sans-serif;
          --font-size-small: 12px;
          --font-size-medium: 16px;
          --font-size-large: 20px;
          --font-weight-bold: bold;
          --font-weight-normal: normal;
          --font-color: #000000;

          display: block;
          box-sizing: border-box;
        }

        .app-card {
          background-color: #ffffff;
          max-width: var(--card-width);
          min-height: var(--card-height);
          border: none;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          padding: 20px;
        }

        .grid-container {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-medium);
          flex-grow: 1;
        }

        .grid {
          display: flex;
          flex-grow: 1;
          width: 100%;
          position: relative;
          border: 1px solid #cccccc;
        }

        .grid-content {
          display: flex;
          flex-direction: column;
          width: 100%;
          flex-grow: 1;
          padding: var(--space-medium);
          gap: var(--space-medium);
        }

        .grid-content-header h1 {
          font-size: var(--font-size-large);
          font-family: var(--font-family-monospace);
          color: var(--font-color);
          margin: 0;
          padding: 0;
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
          left: 0;
          top: 0;
        }

        .cross-line-horizontal {
          width: var(--space-medium);
          height: var(--space-small);
          border-bottom-width: 1px;
          left: 0;
          top: 0;
        }

        /* Slotin marginaali sama kuin aiemmin directory-listing classissa */
        .slot-wrapper {
          margin-top: var(--space-medium);
          width: 100%;
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
              <header class="grid-content-header">
                <h1>${title}</h1>
              </header>

              <div class="grid-content-body">
                <slot name="body"></slot>
              </div>

              <div class="slot-wrapper">
                <slot></slot>
              </div>

            </div>
          </div>

        </div>
      </div>
    `;
  }
}

customElements.define("main-card", MainCard);