import type { Ref } from 'vue'
import { isRef, onBeforeUnmount, onMounted, unref, watch } from 'vue'

export function useEventListener(
  target: Ref<EventTarget | null> | EventTarget,
  event: string,
  handler: (e: Event) => unknown,
) {
  if (!isRef(target)) {
    onMounted(() => {
      target.addEventListener(event, handler)
    })
  }
  else {
    watch(target, (value, oldValue) => {
      oldValue?.removeEventListener(event, handler)
      value?.addEventListener(event, handler)
    })
  }
  onBeforeUnmount(() => {
    unref(target)?.removeEventListener(event, handler)
  })
}
