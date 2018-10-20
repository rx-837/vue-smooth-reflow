import { TransitionEvent } from "./transition-event"

export interface IOptions extends TransitionEvent {
  el?: HTMLElement | string
  property?: string | Array<string>
  transition?: string
  hideOverflow?: boolean
  debug?: boolean
}
