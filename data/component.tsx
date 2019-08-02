import * as React from "react";
import { reactComponent, mixin, mixedIn, MixedIn } from "./react-support";
import { NameMixin, DomMixin } from "./mixins";

@reactComponent
@mixin(NameMixin, DomMixin)
export class Component extends React.Component<any, any>
  implements MixedIn<NameMixin>, MixedIn<DomMixin> {
  // DomMixin
  @mixedIn
  refDom: (refNameOrComponent: string | React.Component) => React.ReactInstance;

  @mixedIn
  displayName: () => string;

  getListenables() {
    return [];
  }

  render() {
    return <div />;
  }
}
