class FragmentObserved extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `<div>observed fragment exists</div>`;
  }
}
const fragmentObservedTag = "observed-fragment";

if (!customElements.get(fragmentObservedTag)) {
  window.customElements.define(fragmentObservedTag, FragmentObserved);
}

export {};
