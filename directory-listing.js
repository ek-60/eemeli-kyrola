class DirectoryListing extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const dataAttr = this.getAttribute("data");
    let data = {};

    try {
      data = JSON.parse(dataAttr || "{}");
    } catch (e) {
      console.error("directory-listing: invalid JSON in data attribute");
    }

    this.shadowRoot.innerHTML = `
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600&family=Space+Mono:wght@400&display=swap');

        :host {
          display: block;

          --space-small: 10px;
          --space-medium: 20px;

          --font-family-monospace: 'Space Mono', monospace;
          --font-family-sans-serif: 'Space Grotesk', sans-serif;
          --font-size-small: 12px;
          --font-size-medium: 16px;
          --font-weight-bold: bold;
          --font-color: #000000;
        }

        h2, h3 {
          font-size: var(--font-size-medium);
          font-family: var(--font-family-sans-serif);
          font-weight: var(--font-weight-bold);
          color: var(--font-color);
        }

        .directory-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: var(--space-medium);
        }

        .folder-name {
          margin-bottom: var(--space-small);
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

        .file-list a,
        .file-list span {
          font-family: var(--font-family-monospace);
          font-size: var(--font-size-small);
          text-decoration: none;
          color: var(--font-color);
        }

        .file-list a:hover,
        .file-list a:focus-visible {
          text-decoration: underline;
        }
      </style>

      <ul class="directory-list">
        ${Object.entries(data)
          .map(
            ([folderName, files]) => `
            <li class="directory-folder">
              <h2 class="folder-name">${folderName}</h2>
              <ul class="file-list">
                ${files
                  .map((file) => {
                    // *** TÄRKEIN MUUTOS TÄSSÄ ***
                    if (!file.href) {
                      return `
                        <li>
                          <span>${file.label}</span>
                        </li>
                      `;
                    }

                    return `
                      <li>
                        <a href="${file.href}" target="${file.target || "_self"}">
                          ${file.label}${file.target === "_blank" ? " ↗" : ""}
                        </a>
                      </li>
                    `;
                  })
                  .join("")}
              </ul>
            </li>
          `
          )
          .join("")}
      </ul>
    `;
  }
}

customElements.define("directory-listing", DirectoryListing);