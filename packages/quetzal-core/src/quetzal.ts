// The basic structure of a Quetzal Element begins with a Stateful Web Component.
// There can be stateful and static web components. Static Web Components can be used when state is disabled, and can be used for displaying static info such as markdown rendering for instance.
// Stateful Web Components, however, can hold state and can be used for components where state is needed.
export interface StatefulInterface {};

export interface StaticInterface {};

export class StatefulElement extends HTMLElement implements StatefulInterface {};

export class StaticElement extends HTMLElement implements StaticInterface {};

export interface QuetzalBaseInterface {};

export class QuetzalBaseElement extends StatefulElement implements QuetzalBaseInterface {};

export class QuetzalElement extends QuetzalBaseElement {};

