class ItemList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const title = this.getAttribute("title") || "items";
    const raw = this.getAttribute("data") || "[]";

    let items = [];

    try {
      items = JSON.parse(raw);
    } catch (err) {
      console.error("item-list: invalid JSON", err);
    }

    this.shadowRoot.innerHTML = `
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400&display=swap');

        :host {
          display: block;
          margin-top: 30px;
        }

        pre {
          font-family: 'Space Mono', monospace;
          font-size: 14px;
          background: none;
          padding: 0;
          margin: 0;
          white-space: pre;
          line-height: 1.65;
        }
      </style>

      <pre>${title}:
${items.map(i => `  - ${i}`).join("\n")}
      </pre>
    `;
  }
}

customElements.define("item-list", ItemList);