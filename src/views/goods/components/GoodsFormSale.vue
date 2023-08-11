<script setup lang="ts">
import type { SaleProperties } from '@/types/goods'

defineProps<{
  properties?: SaleProperties[] | null
}>()
</script>

<template>
  <div class="goods-form-sale">
    <a-form :labelCol="{ span: 3 }">
      <a-form-item :label="item.name" v-for="item in properties" :key="item.id">
        <p class="form-text">正确填写属性值可增加搜索/导购机会</p>
        <div class="attrs"></div>
      </a-form-item>
      <a-form-item label="一口价" required>
        <a-input placeholder="请输入"></a-input>
      </a-form-item>
      <a-form-item label="SPU" required>
        <a-input placeholder="请输入"></a-input>
      </a-form-item>
    </a-form>
  </div>
</template>

<style lang="scss" scoped>
.goods-form-sale {
  max-width: 1000px;
  padding: 20px 60px;

  .attrs {
    border: 1px solid #eaeaea;
    background-color: #f9f9f9;
  }
}
</style>
