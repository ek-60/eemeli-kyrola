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

          display: inline-block;
          box-sizing: border-box;
        }

        .app-card {
          background-color: #ffffff;
          border: none;
          display: inline-flex;
          flex-direction: column;
          position: relative;
          padding: 20px;
          box-sizing: border-box;
        }

        .grid-container {
          display: inline-flex;
          flex-direction: column;
          gap: var(--space-medium);
          align-items: flex-start;
        }

        .grid {
          display: inline-flex;
          position: relative;
          border: 1px solid #cccccc;
        }

        .grid-content {
          display: inline-flex;
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

        footer {
          font-family: var(--font-family-monospace);
          font-size: var(--font-size-small);
          color: #666;
          opacity: 0.9;
          text-align: right;
          width: 100%;
          border-top: 1px dashed #cccccc;
          padding-top: var(--space-small);
          padding-bottom: var(--space-small);
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