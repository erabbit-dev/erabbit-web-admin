<script setup lang="ts">
import { ref } from 'vue'
import ClassifySelect, { type ClassifyDataItem } from './components/ClassifySelect.vue'
import GoodsForm from './components/GoodsForm.vue'

const classifyData = ref<ClassifyDataItem[]>([])
const onBackClassify = () => {
  classifyData.value = []
}
</script>

<template>
  <div class="goods-add-page">
    <GoodsForm
      v-if="classifyData.length"
      :classify-data="classifyData"
      @back-classify="onBackClassify"
    />
    <ClassifySelect v-else @next="classifyData = $event" />
  </div>
</template>

<style lang="scss" scoped></style>
