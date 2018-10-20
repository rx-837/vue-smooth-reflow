import Vue from "vue"
import { IOptions } from "./interfaces"

declare module "vue/types/vue" {
  interface Vue {
    $smoothReflow(options?: IOptions): void
    $unsmoothReflow(options?: IOptions): void
  }
}
