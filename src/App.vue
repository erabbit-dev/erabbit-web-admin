<script setup lang="ts">
import { ConfigProvider } from 'ant-design-vue'
import zh from 'ant-design-vue/es/locale/zh_CN'
import en from 'ant-design-vue/es/locale/en_US'
import { ref } from 'vue'
import { watch } from 'vue'
import { useAppStore } from './stores'
import { theme } from 'ant-design-vue'

import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import 'dayjs/locale/en'
import { shallowRef } from 'vue'

const appStore = useAppStore()
const locale = ref(zh)
const localeObj = { zh, en }
watch(
  () => appStore.settings.lang,
  (newVal) => {
    locale.value = localeObj[newVal]
    dayjs.locale(newVal === 'zh' ? 'zh-cn' : 'en')
  },
  { immediate: true }
)

const algorithm = shallowRef()
watch(
  () => appStore.settings.dark,
  (newVal) => {
    algorithm.value = newVal ? theme.darkAlgorithm : null
  },
  { immediate: true }
)
</script>

<template>
  <ConfigProvider
    :theme="{ token: { colorPrimary: '#27BA9B', borderRadius: 2 }, algorithm }"
    :locale="locale"
  >
    <RouterView />
  </ConfigProvider>
</template>

<style lang="scss" scoped></style>
