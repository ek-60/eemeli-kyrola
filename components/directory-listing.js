class DirectoryListing extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  getData() {
    const raw = this.getAttribute("data") || "{}";
    try {
      return JSON.parse(raw);
    } catch {
      console.error("directory-listing: invalid JSON");
      return {};
    }
  }

  renderDescription(text) {
    if (!text) return "";
    return `<div class="description">${text}</div>`;
  }

  renderFile(file) {
    if (!file.href) {
      return `
        <li>
          <span>${file.label}</span>
          ${this.renderDescription(file.description)}
        </li>
      `;
    }

    return `
      <li>
        <a href="${file.href}" target="${file.target || "_self"}">
          ${file.label}${file.target === "_blank" ? " ↗" : ""}
        </a>
        ${this.renderDescription(file.description)}
      </li>
    `;
  }

  renderFolder(folderName, files) {
    return `
      <li class="directory-folder">
        <h2 class="folder-name">${folderName}</h2>
        <ul class="file-list">
          ${files.map((file) => this.renderFile(file)).join("")}
        </ul>
      </li>
    `;
  }

  render() {
    const data = this.getData();

    this.shadowRoot.innerHTML = `
      <style>

        :host {
          display: block;

          --space-small: 10px;
          --space-medium: 20px;

          --font-family-monospace: monospace;
          --font-family-sans-serif: sans-serif;
          --font-size-small: 12px;
          --font-size-medium: 16px;
          --font-weight-bold: bold;

          --color-text: #000000;
          --color-link: #0366d6;
        }

        h2 {
          font-size: var(--font-size-medium);
          font-family: var(--font-family-sans-serif);
          font-weight: var(--font-weight-bold);
          color: var(--color-text);
        }

        .directory-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: var(--space-medium);
        }

        .file-list {
          list-style: none;
          padding-left: var(--space-medium);
          margin: var(--space-small) 0 0 var(--space-small);
        }

        .file-list li {
          margin-bottom: var(--space-small);
          position: relative;
          padding-left: var(--space-small);
        }

        .file-list li::before {
          content: '';
          position: absolute;
          left: -15px;
          top: 0;
          width: 1px;
          height: 100%;
          background-color: #ccc;
        }

        .file-list li:last-child::before {
          height: var(--space-small);
        }

        .file-list li::after {
          content: '';
          position: absolute;
          left: -15px;
          top: var(--space-small);
          width: var(--space-small);
          height: 1px;
          background-color: #ccc;
        }

        .file-list a {
          font-family: var(--font-family-monospace);
          font-size: var(--font-size-small);
          color: var(--color-link);
          text-decoration: none;
        }

        .file-list a:hover {
          text-decoration: underline;
        }
        
        .file-list a:visited {
          color: #551a8b;
        }

        .file-list span {
          font-family: var(--font-family-monospace);
          font-size: var(--font-size-small);
          color: var(--color-text);
        }

        .description {
          font-family: var(--font-family-monospace);
          font-size: var(--font-size-small);
          color: #444;
          padding-left: var(--space-small);
          margin-top: 4px;
          border-left: 1px dashed #ccc;
          line-height: 1.4;
        }
      </style>

      <ul class="directory-list">
        ${Object.entries(data)
          .map(([folder, files]) => this.renderFolder(folder, files))
          .join("")}
      </ul>
    `;
  }
}

customElements.define("directory-listing", DirectoryListing);