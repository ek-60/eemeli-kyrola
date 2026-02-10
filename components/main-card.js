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

        .back-link {
          font-family: monospace;
          font-size: 12px;
          color: #000;
          text-decoration: none;
          width: fit-content;
        }

        .back-link:hover {
          text-decoration: underline;
        }

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
          text-transform: lowercase;
        }

        .card-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-direction: column;
          width: 100%;
          font-family: monospace;
          font-size: 12px;
        }

        .footer-button {
          font-family: monospace;
          font-size: 12px;
          color: #000;
          text-decoration: none;
          text-transform: uppercase;
          width: fit-content;
          border: 1px solid #000;

        }

        .footer-button:hover {
          background: #ddd;
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
          .card-footer {
            flex-direction: row;
          }
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
        </footer>

      </div>
    `;

    const cookieBtn = this.shadowRoot.getElementById('cookie-btn');
    cookieBtn.addEventListener('click', () => {
      // Remove existing cookie banner if it exists
      const existing = document.querySelector('cookie-banner');
      if (existing) {
        existing.remove();
      }
      // Clear cookie consent so banner will show
      localStorage.removeItem('cookie-consent');
      // Create and append a new cookie banner to body
      const newBanner = document.createElement('cookie-banner');
      document.body.appendChild(newBanner);
    });
  }
}

customElements.define("main-card", MainCard);
