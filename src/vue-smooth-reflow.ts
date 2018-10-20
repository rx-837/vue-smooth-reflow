/**
 * The general flow is:
 *
 * 1. Save element DOM state in beforeUpdate()
 * 2. Get element DOM state in updated()
 * 3. Animate the diff in doSmoothReflow()
 * 4. Listen for transitionend event in endListener().
 * 5. If the event matches the user's event filters, Go back to #1
 */

import { SmoothElement } from "./classes"
import { IOptions } from "./interfaces"
import { findRegisteredEl, flushRemoved, registerElement, unregisterElement } from "./utils"

if (!Element.prototype.matches) {
  Element.prototype.matches = (Element.prototype as any).msMatchesSelector
}

export default {
  methods: {
    $smoothReflow(options: IOptions | Array<IOptions>) {
      const _registerElement = registerElement.bind(this)
      if (Array.isArray(options)) {
        options.forEach(_registerElement)
      } else {
        _registerElement(options)
      }
    },
    $unsmoothReflow(options: IOptions | Array<IOptions>) {
      const _unregisterElement = unregisterElement.bind(this)
      if (Array.isArray(options)) {
        options.forEach(_unregisterElement)
      } else {
        _unregisterElement(options)
      }
    }
  },
  beforeMount() {
    this._smoothElements = []

    this._endListener = (event) => {
      for (const smoothEl of (this._smoothElements as Array<SmoothElement>)) {
        smoothEl.endListener(event)
      }
    }
  },
  mounted() {
    this.$el.addEventListener("transitionend", this._endListener, {passive: true})
  },
  destroyed() {
    this.$el.removeEventListener("transitionend", this._endListener, {passive: true})
  },
  beforeUpdate() {
    // The component $el can be null during mounted, if it's hidden by a falsy v-if
    // Duplicate event listeners are ignored, so it's safe to add this listener multiple times.
    this.$el.addEventListener("transitionend", this._endListener, {passive: true})
    flushRemoved(this)
    // Retrieve component element on demand
    // It could have been hidden by v-if/v-show
    for (const smoothEl of (this._smoothElements as Array<SmoothElement>)) {
      const $smoothEl = findRegisteredEl(this.$el, smoothEl.getElement())
      smoothEl.setSmoothElement($smoothEl)
      smoothEl.setBeforeValues()
    }
  },
  updated() {
    this.$nextTick(() => {
      // Retrieve component element on demand
      // It could have been hidden by v-if/v-show
      for (const smoothEl of (this._smoothElements as Array<SmoothElement>)) {
        const $smoothEl = findRegisteredEl(this.$el, smoothEl.getElement())
        smoothEl.setSmoothElement($smoothEl)
        smoothEl.doSmoothReflow()
      }
      flushRemoved(this)
    })
  }
}
