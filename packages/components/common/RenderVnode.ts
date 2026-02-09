import { defineComponent } from 'vue'

const RenderVnode = defineComponent({
  props: {
    vnode: {
      type: [Object, String],
      required: true,
    },
  },
  setup(props) {
    return () => props.vnode
  },
})

export default RenderVnode
