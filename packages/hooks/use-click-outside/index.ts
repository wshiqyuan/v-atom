import type { Ref } from 'vue'
import { onMounted, onUnmounted } from 'vue'

export function useClickOutside(elementRef: Ref<undefined | HTMLElement>, callback: (e: MouseEvent) => void) {
  const handler = (e: MouseEvent) => {
    if (elementRef.value && e.target) {
      if (!elementRef.value.contains(e.target as Node)) {
        callback(e)
      }
    }
  }
  onMounted(() => {
    document.addEventListener('click', handler)
  })
  onUnmounted(() => {
    document.removeEventListener('click', handler)
  })
}
