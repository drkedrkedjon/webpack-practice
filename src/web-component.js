import { css, html, LitElement } from "lit";

export class WebComponentTitle extends LitElement {
  constructor() {
    super();
  }

  static styles = css`
    h1 {
      font-size: 3.5rem;
      font-weight: 900;
      padding: 1.5rem 0;
      
      margin: 0;
      color: var(--primary-color);
    }
  `;

  render() {
    return html`<h1>
      Guía de estilos de <br />
      The Vegan Restaurant
    </h1>`;
  }
}
window.customElements.define("web-component-title", WebComponentTitle);
