import { css, htmlPage } from "./page-view";

class FragmentOnPage extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `${css()}${htmlPage()}`;
  }
}
const fragmentOnPageTag = "page-fragment";

if (!customElements.get(fragmentOnPageTag)) {
  window.customElements.define(fragmentOnPageTag, FragmentOnPage);
}

