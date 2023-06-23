<script setup lang="ts">
import { useAppStore } from '@/stores'
import { TranslationOutlined } from '@ant-design/icons-vue'
import { useI18n } from 'vue-i18n'

const appStore = useAppStore()
// 语言
const { locale } = useI18n()
function onToggleLang(lang: string) {
  locale.value = lang
  appStore.setSettingsProperty('lang', lang)
}
</script>

<template>
  <a-dropdown placement="bottomRight">
    <template #overlay>
      <a-menu
        :selected-keys="[appStore.settings.lang]"
        @click="({ key }) => onToggleLang(key as string)"
      >
        <a-menu-item key="zh"> 中文 </a-menu-item>
        <a-menu-item key="en"> English </a-menu-item>
      </a-menu>
    </template>
    <TranslationOutlined></TranslationOutlined>
  </a-dropdown>
</template>

<style lang="scss" scoped></style>
