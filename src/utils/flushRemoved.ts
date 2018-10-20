export function flushRemoved(vm) {
  let i = vm._smoothElements.length
  while (i--) {
    const smoothEl = vm._smoothElements[i]
    if (smoothEl.isRemoved) {
      smoothEl.stopTransition()
      vm._smoothElements.splice(i, 1)
    }
  }
}
