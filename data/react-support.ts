import * as React from "react";

type ComponentProperties = keyof React.Component | "initialState";

type MixedInProperties<T> = {
  [K in keyof T]: K extends ComponentProperties
    ? never
    : T[K] extends Function
    ? K
    : never
}[keyof T];

export type MixedIn<T> = Pick<T, MixedInProperties<T>>;

export function mixin(...mixins) {
  return function(dest) {
    return dest;
  };
}

export function reactComponent(dest) {
  mixin(dest);
}

export function reactMixin<T>(target: T) {}

export const mixedIn = <T>(target: T, key: keyof T) => {};
