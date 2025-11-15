class BackButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {

    this.shadowRoot.innerHTML = `
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400&display=swap');

        a {
          font-family: 'Space Mono', monospace;
          font-size: 14px;
          text-decoration: none;
          color: #000;
        }

        a:hover {
          text-decoration: underline;
        }
      </style>

      <a href="/">← back</a>
    `;
  }
}

customElements.define("back-button", BackButton);