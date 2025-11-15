class ItemList extends HTMLElement {
  static get observedAttributes() {
    return ["title", "data", "list-style"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const template = document.createElement("template");
    template.innerHTML = `
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400&display=swap');

        :host {
          display: block;
          margin-top: 30px;
        }

        .wrapper {
          font-family: 'Space Mono', monospace;
          font-size: 14px;
          line-height: 1.65;
          white-space: pre-wrap;
        }

        ul, ol {
          margin: 0;
          padding-left: 20px;
        }

        /* Dash-lista */
        .dash-list {
          list-style: none;
          padding-left: 0;
        }
        .dash-list li::before {
          content: "- ";
        }
      </style>

      <div class="wrapper">
        <div class="title"></div>
        <div class="list-container"></div>
      </div>
    `;

    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.titleEl = this.shadowRoot.querySelector(".title");
    this.listContainer = this.shadowRoot.querySelector(".list-container");
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  parseItems() {
    const raw = this.getAttribute("data") || "[]";
    try {
      const data = JSON.parse(raw);
      return Array.isArray(data) ? data : [];
    } catch (e) {
      console.warn("item-list: invalid JSON", e);
      return [];
    }
  }

  render() {
    const title = this.getAttribute("title") || "items";
    const items = this.parseItems();
    const type = this.getAttribute("list-style") || "dash";

    this.titleEl.textContent = `${title}:`;

    this.listContainer.innerHTML = ""; // tyhjennä

    let list;

    if (type === "number") {
      list = document.createElement("ol");
    } else if (type === "bullet") {
      list = document.createElement("ul");
    } else {
      // dash oletus
      list = document.createElement("ul");
      list.classList.add("dash-list");
    }

    items.forEach(item => {
      const li = document.createElement("li");
      li.textContent = item;
      list.appendChild(li);
    });

    this.listContainer.appendChild(list);
  }
}

customElements.define("item-list", ItemList);