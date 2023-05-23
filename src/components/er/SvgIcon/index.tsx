import { computed } from 'vue'
import { defineComponent } from 'vue'
import './index.scss'
import { ref } from 'vue'

const erSvgIconProps = {
  prefix: {
    type: String,
    default: 'icon'
  },
  name: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: '#666666'
  },
  hoverColor: {
    type: String,
    default: 'var(--ant-primary-color)'
  }
}

export default defineComponent({
  name: 'ErSvgIcon',

  props: erSvgIconProps,

  setup(props) {
    const symbolId = computed(() => `#${props.prefix}-${props.name}`)
    const hover = ref(false)

    return () => (
      <svg
        aria-hidden="true"
        class="er-svg-icon"
        onMouseenter={() => (hover.value = true)}
        onMouseleave={() => (hover.value = false)}
      >
        <use href={symbolId.value} fill={hover.value ? props.hoverColor : props.color} />
      </svg>
    )
  }
})
