class CookieBanner extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.accept = this.accept.bind(this);
    this.decline = this.decline.bind(this);
    this.hideBanner = this.hideBanner.bind(this);
  }

  hideBanner() {
    this.style.pointerEvents = "auto";
    this.style.display = "none";
    requestAnimationFrame(() => this.remove());
  }

  accept() {
    localStorage.setItem("cookie-consent", "accepted");
    this.hideBanner();
  }

  decline() {
    localStorage.setItem("cookie-consent", "declined");
    this.hideBanner();
  }

  connectedCallback() {
    const choice = localStorage.getItem("cookie-consent");
    if (choice) return;

    this.shadowRoot.innerHTML = `
      <style>

        :host {
          position: fixed;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          box-sizing: border-box;
          padding: 20px;
          z-index: 20;
          background: #fff;
        }

        .card {
          width: 100%;
          max-width: 900px;
          height: 780px;
          border: 1px solid #cccccc;
          padding: 20px;
          margin: 0;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 20px;
          position: relative;
          background: #fff;
        }

        @media (max-width: 980px) {
          .card {
            height: 100%;
          }
        }

        /* Kulmakoristeet */
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

        /* Typography like original */
        h1 {
          margin: 0;
          font-family: monospace;
          font-size: 22px;
          font-weight: 600;
        }

        .card-content {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        p {
          font-family: monospace;
          font-size: 16px;
          margin: 0;
        }

        .buttons {
          display: flex;
          gap: 10px;
        }

        button {
          padding: 10px 20px;
          font-family: monospace;
          border: 1px solid #000;
          background: #eee;
          cursor: pointer;
        }

        button:hover {
          background: #ddd;
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

        <header class="card-header">
          <h1>// cookies</h1>
        </header>

        <div class="card-content">
          <p>This website uses cookies to enhance your experience.</p>

          <div class="buttons">
            <button id="accept" onclick="this.getRootNode().host.accept()">Accept</button>
            <button id="decline" onclick="this.getRootNode().host.decline()">Decline</button>
          </div>
        </div>

      </div>
    `;
  }
}

customElements.define("cookie-banner", CookieBanner);