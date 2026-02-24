import type { VNode } from 'vue'

declare global {
  namespace JSX {
    type Element = VNode
    interface ElementClass {}

    interface IntrinsicElements {
      [elemName: string]: unknown
    }

    interface IntrinsicAttributes {
      [key: string]: unknown
    }
  }
}
