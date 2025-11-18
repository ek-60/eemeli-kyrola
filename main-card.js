class MainCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <style>

        :host {
          display: block;
          width: 100%;
          height: auto;              /* kasvaa sisällön mukaan */
          min-height: 100svh;        /* mutta ei koskaan pienempi kuin näkymä */
          box-sizing: border-box;
          background: #fff;
        }

        .card {
          margin: 20px;
          padding: 20px;

          background: #1e3a8a;       /* sininen */
          color: white;

          box-sizing: border-box;

          min-height: calc(100svh - 40px);
          height: auto;              /* sisällön korkeus */
          display: flex;
          flex-direction: column;
        }

        .card-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
      </style>

      <div class="card">
        <div class="card-content">
          <slot></slot>
        </div>
      </div>
    `;
  }
}

customElements.define("main-card", MainCard);