import { SmoothElement } from "../classes";
import { Options } from "../interfaces";

// 'this' is vue component
export function registerElement(option: Options = {}) {
  this._smoothElements.push(new SmoothElement(option));
}
