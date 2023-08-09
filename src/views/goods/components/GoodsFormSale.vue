<script setup lang="ts"></script>

<template>
  <div class="goods-form-sale">
    <a-form :labelCol="{ span: 3 }">
      <a-form-item label="尺寸"></a-form-item>
      <a-form-item label="SPU" required>
        <a-input></a-input>
      </a-form-item>
    </a-form>
  </div>
</template>

<style lang="scss" scoped>
.goods-form-sale {
  max-width: 1000px;
  padding: 20px 60px;
}
</style>
