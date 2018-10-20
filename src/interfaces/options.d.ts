import { TransitionEvent } from "./transition-event";

export interface Options extends TransitionEvent {
  el?: HTMLElement | string;
  property?: string | Array<string>;
  transition?: string;
  hideOverflow?: boolean;
  debug?: boolean;
}