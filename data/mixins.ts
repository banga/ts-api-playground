import * as React from "react";
import { reactMixin } from "./react-support";

@reactMixin
export abstract class NameMixin extends React.Component<any, any> {
  defaultName: string = "unknown";

  displayName(): string {
    return this.constructor.name || this.defaultName;
  }

  private foo_(): void {}

  private foo2: number;

  static bar(): void {}
}

@reactMixin
export abstract class DomMixin extends React.Component<any, any> {
  initialState() {}

  refDom(refName: string): React.ReactInstance {
    return this.refs[refName];
  }

  shouldComponentUpdate(): boolean {
    return false;
  }

  abstract getListenables(): object[];
}
