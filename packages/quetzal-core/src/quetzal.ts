// The basic structure of a Quetzal Element begins with a Stateful Web Component.
// There can be stateful and static web components. Static Web Components can be used when state is disabled, and can be used for displaying static info such as markdown rendering for instance.
// Stateful Web Components, however, can hold state and can be used for components where state is needed.

export interface StatefulInterface {}

export interface StaticInterface {}

export class StatefulElement extends HTMLElement implements StatefulInterface {
  constructor() {
    super();
    // More Code...
  }
}

export class StaticElement extends HTMLElement implements StaticInterface {
  constructor() {
    super();
    // More Code...
  }
}

/**
 * The base interface implementation of all Quetzal-Type Elements
 */
export interface QuetzalBaseInterface {
  /**
   * Code executed when a given element is created
   * @returns {void}
   */
  created(): void;

  /**
   * Code executed before a quetzal element is fully created
   */
  beforeCreated(): void;

  /**
   * Code executed when a given element is mounted to the DOM
   */
  mounted(): void;

  /**
   * Code executed when the given element is removed or destroyed
   * @returns {void}
   */
  unmounted(): void;

  /**
   * Styles to use in the given component
   * @type {string}
   */
  styles: string;

  /**
   * Render function to render code for the given web component
   * @returns {string}: The generated output
   *
   * TODO: Choose a different output for later versions.
   */
  render(): string;
}

/**
 * The Base Class Implementation for all Quetzal-Type Elements
 *
 * This could either be the core `QuetzalElement` used in all implementations,
 * or the `QuetzalExtElement` used mainly in the JS Implementation and ported to the Dart Implementation
 */
export abstract class QuetzalBaseElement extends StatefulElement
  implements QuetzalBaseInterface {
  beforeCreated() {}
  created() {}
  mounted() {}
  unmounted() {}
  abstract render(): string;
  styles: string = "";

  private static _build(src: string): Node {
    const tmpl = document.createElement("template");
    tmpl.innerHTML = src;
    return tmpl.content.cloneNode(true);
  }

  private static _buildStyle(src: string): Node {
    const tmpl = document.createElement("template");
    tmpl.innerHTML = `<style>${src}</style>`;
    return tmpl.content.cloneNode(true);
  }

  connectedCallback() {
    this.mounted();
  }
  disconnectedCallback() {
    this.unmounted();
  }

  /**
   * Generates a new Quetzal Element
   */
  constructor() {
    super();
    (async () => {
      await Promise.resolve(this.beforeCreated()).then(e => {
        const shadowRoot = this.attachShadow({ mode: "open" });
        const element = QuetzalBaseElement._build(this.render());
        element.appendChild(QuetzalBaseElement._buildStyle(this.styles));
        shadowRoot.append(element);
        this.created();
      })
    })()
  }
}

/**
 * A base Quetzal Element
 */
export class QuetzalElement extends QuetzalBaseElement {
  render(): string {
    return "";
  }
}
