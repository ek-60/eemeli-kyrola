class MainCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {

    const showBack = window.location.pathname !== "/";

    this.shadowRoot.innerHTML = `
      <style>

        :host {
          display: flex;
          width: 100%;
          height: auto;
          min-height: 100svh;
          box-sizing: border-box;
          background: #fff;
        }

        .card {
          margin: 20px;
          padding: 20px;
          box-sizing: border-box;
          position: relative;
          border: 1px solid #cccccc;
          display: flex;
          flex-direction: column;
          gap: 20px;

          /* mobiili oletus */
          width: calc(100% - 40px);
        }

        @media (min-width: 980px) {
          :host {
            justify-content: center;
            align-items: center;
          }
          .card {
            width: 900px;
            height: 780px;
          }
        }

        .back-link {
          font-family: monospace;
          font-size: 12px;
          color: #000;
          text-decoration: none;
        }

        .back-link:hover { text-decoration: underline; }

        .cross {
          position: absolute;
          width: 20px;
          height: 20px;
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

        .cross-line-vertical { width: 10px; height: 20px; border-right-width: 1px; }
        .cross-line-horizontal { width: 20px; height: 10px; border-bottom-width: 1px; }

        header.card-header h1 {
          margin: 0;
          font-family: sans-serif;
          font-size: 20px;
          font-weight: 600;
        }

        .card-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .card-footer {
          font-family: monospace;
          font-size: 12px;
        }

      </style>

      <div class="card">

        <div class="cross cross-top-left">
          <div class="cross-line cross-line-vertical"></div>
          <div class="cross-line cross-line-horizontal"></div>
        </div>

        <div class="cross cross-bottom-right">
          <div class="cross-line cross-line-vertical"></div>
          <div class="cross-line cross-line-horizontal"></div>
        </div>

        ${showBack ? `<a class="back-link" href="/">← back</a>` : ``}

        <header class="card-header">
          <h1>// eemeli kyrola</h1>
          
        </header>

        <div class="card-content">
          <slot name="body"></slot>
        </div>

        <footer class="card-footer">
          <p>© 2025 eemeli kyrola</p>
          <cookie-banner></cookie-banner>
        </footer>

      </div>
    `;
  }
}

customElements.define("main-card", MainCard);
