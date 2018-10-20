import { SmoothElement } from "../classes";
import { Options } from "../interfaces";
import { findRegisteredEl } from "./findRegisteredEl";

// 'this' is vue component
// If no 'el' was pass during registration, then we register the root element.
export function unregisterElement(option: Options = SmoothElement.defaultOptions) {
  const root = this.$el;
  const index = this._smoothElements.findIndex(smoothEl => {
    return findRegisteredEl(root, smoothEl.options.el) === findRegisteredEl(root, option.el);
  });
  if (index === -1) {
    console.error("VSR_ERROR: $unsmoothReflow failed due to invalid el option");
    return;
  }
  // Don't remove right away, as it might be in the middle of
  // a doSmoothReflow, and leave the element in a broken state.
  this._smoothElements[index].scheduleRemoval();
}
