class MainCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <style>
        /* Koko komponentti: korkeus 100svh (mobile default) */
        :host {
          display: block;
          height: 100svh;
          min-height: 100svh;
        }

        /* Kortti, jolla on 20px marginaali reunoista */
        .card {
          box-sizing: border-box;
          margin: 20px;
          /* 100svh - ylä + ala margin (20 + 20) */
          min-height: calc(100svh - 40px);
          height: calc(100svh - 40px);

          background: #1e3a8a; /* sininen */
          color: white;
          display: flex;
          flex-direction: column;
        }

        /* Tämä ottaa kaiken kortin sisällä olevan tilan */
        .card-content {
          flex: 1;
          padding: 16px;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .card-header {
          font-weight: bold;
        }

        .card-body {
          flex: 1;
        }
      </style>

      <div class="card">
        <div class="card-content">
          <div class="card-header">
            <slot name="top"></slot>
          </div>
          <div class="card-body">
            <slot name="body"></slot>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define("main-card", MainCard);