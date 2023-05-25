<script setup lang="ts">
import { useAppStore } from '@/stores'
import {
  BellOutlined,
  CompressOutlined,
  ExpandOutlined,
  HomeOutlined,
  LogoutOutlined,
  SettingOutlined,
  TranslationOutlined
} from '@ant-design/icons-vue'
import { useDark, useFullscreen } from '@vueuse/core'
import { message } from 'ant-design-vue'
import { onMounted } from 'vue'
import { watch } from 'vue'
import { useI18n } from 'vue-i18n'

const appStore = useAppStore()
// 语言
const { locale } = useI18n()
function onToggleLang(lang: string) {
  locale.value = lang
  appStore.setSettingsProperty('lang', lang)
}

// 暗黑
const isDarkMode = useDark()
watch(isDarkMode, () => {
  appStore.setSettingsProperty('dark', isDarkMode.value)
})
onMounted(() => {
  isDarkMode.value = appStore.settings.dark
})

// 全屏
const { isSupported, toggle, isFullscreen } = useFullscreen()
function onToggleScreen() {
  if (!isSupported.value) return message.warn('浏览器不支持全屏')
  toggle()
}
</script>

<template>
  <a-layout-header class="er-layout-header">
    <a-breadcrumb>
      <a-breadcrumb-item>
        <RouterLink to="/"><HomeOutlined /></RouterLink>
      </a-breadcrumb-item>
      <a-breadcrumb-item href=""> Application List </a-breadcrumb-item>
      <a-breadcrumb-item>Application</a-breadcrumb-item>
    </a-breadcrumb>
    <a-space class="er-avatar" :align="'center'">
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
      <a-divider style="font-size: 1em" type="vertical" />
      <BellOutlined></BellOutlined>
      <a-divider style="font-size: 1em" type="vertical" />
      <component
        :is="isFullscreen ? CompressOutlined : ExpandOutlined"
        @click="onToggleScreen"
      ></component>
      <a-divider style="font-size: 1em" type="vertical" />
      <ErSvgIcon
        enable-hover
        :name="isDarkMode ? 'moon' : 'sun'"
        @click="isDarkMode = !isDarkMode"
      ></ErSvgIcon>
      <a-divider style="font-size: 1em" type="vertical" />
      <a-dropdown placement="bottomRight">
        <template #overlay>
          <a-menu>
            <a-menu-item> <SettingOutlined /> {{ $t('app.settings') }} </a-menu-item>
            <a-menu-item> <LogoutOutlined /> {{ $t('app.logout') }} </a-menu-item>
          </a-menu>
        </template>
        <a-avatar :size="28"> Z </a-avatar>
      </a-dropdown>
    </a-space>
  </a-layout-header>
</template>

<style lang="scss" scoped>
.er-layout-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 56px;
  padding: 0 24px;
  background-color: var(--er-white);
  line-height: 56px;

  .ant-avatar {
    background: var(--er-primary);
    cursor: pointer;
  }

  .anticon {
    cursor: pointer;

    &:hover {
      color: var(--er-primary);
    }
  }

  .er-svg-icon {
    font-size: 16px;
    cursor: pointer;
  }
}
</style>
