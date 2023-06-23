<script setup lang="ts">
import { onMounted } from 'vue'
import { Flip } from 'number-flip'

const props = defineProps<{
  value: number
}>()

onMounted(() => {
  const node = document.querySelector('.ant-statistic-content-value-int')
  node!.innerHTML = ''
  new Flip({
    node,
    from: ~~(Math.random() * 33333),
    to: props.value,
    separator: ',',
    duration: 1
  })
})
</script>

<template>
  <a-statistic />
</template>

<style lang="scss" scoped>
.ant-statistic {
  text-align: center;
}

:deep(.ant-statistic-content) {
  color: var(--er-primary);
}

:deep(.ant-statistic-content-value-int) {
  display: inline-block;
}
</style>
