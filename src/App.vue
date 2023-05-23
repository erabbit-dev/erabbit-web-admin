<script setup lang="ts">
import { ConfigProvider } from 'ant-design-vue'

ConfigProvider.config({
  theme: { primaryColor: '#27BA9B' }
})
</script>

<template>
  <ConfigProvider prefix-cls="ant">
    <RouterView />
  </ConfigProvider>
</template>

<style lang="scss" scoped></style>
