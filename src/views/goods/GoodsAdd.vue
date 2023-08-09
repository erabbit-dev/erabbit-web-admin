<script setup lang="ts">
import { useClassifyData } from './composables'
import ClassifySelect from './components/ClassifySelect.vue'
import GoodsForm from './components/GoodsForm.vue'
import type { ClassifyDataItem } from './types'

const { classifyData, setClassifyData } = useClassifyData()
console.log(classifyData.value)

const onBackClassify = () => setClassifyData([])
const onNext = (data: ClassifyDataItem[]) => setClassifyData(data)
</script>

<template>
  <div class="goods-add-page">
    <GoodsForm v-if="classifyData.length" @back-classify="onBackClassify" />
    <ClassifySelect v-else @next="onNext" />
  </div>
</template>

<style lang="scss" scoped></style>
