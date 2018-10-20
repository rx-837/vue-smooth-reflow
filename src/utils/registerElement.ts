import { SmoothElement } from "../classes"
import { IOptions } from "../interfaces"

// "this" is vue component
export function registerElement(option: IOptions = {}) {
  this._smoothElements.push(new SmoothElement(option))
}
