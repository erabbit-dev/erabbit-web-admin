<script setup lang="ts">
import ClassifySelect from './components/ClassifySelect.vue'
import GoodsForm from './components/GoodsForm.vue'
</script>

<template>
  <div class="goods-add-page">
    <GoodsForm v-if="$route.query.classifyId && $route.query.brandId" />
    <ClassifySelect v-else />
  </div>
</template>

<style lang="scss" scoped></style>
