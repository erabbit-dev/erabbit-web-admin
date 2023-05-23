<script setup lang="ts">
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

const dark = useDark({ storageKey: 'er-dark' })

const { isFullscreen, toggle } = useFullscreen()
</script>

<template>
  <a-layout-header class="er-layout-header">
    <a-breadcrumb>
      <a-breadcrumb-item href="/">
        <HomeOutlined />
      </a-breadcrumb-item>
      <a-breadcrumb-item href=""> Application List </a-breadcrumb-item>
      <a-breadcrumb-item>Application</a-breadcrumb-item>
    </a-breadcrumb>
    <a-space class="er-avatar" :align="'center'">
      <TranslationOutlined></TranslationOutlined>
      <a-divider style="font-size: 1em" type="vertical" />
      <BellOutlined></BellOutlined>
      <a-divider style="font-size: 1em" type="vertical" />
      <component :is="isFullscreen ? CompressOutlined : ExpandOutlined" @click="toggle"></component>
      <a-divider style="font-size: 1em" type="vertical" />
      <ErSvgIcon :name="dark ? 'moon' : 'sun'" @click="dark = !dark"></ErSvgIcon>
      <a-divider style="font-size: 1em" type="vertical" />
      <a-dropdown placement="bottomRight">
        <template #overlay>
          <a-menu>
            <a-menu-item> <SettingOutlined /> 系统设置 </a-menu-item>
            <a-menu-item> <LogoutOutlined /> 退出登录 </a-menu-item>
          </a-menu>
        </template>
        <a-avatar :size="28"> Z </a-avatar>
      </a-dropdown>
    </a-space>
  </a-layout-header>
</template>

<style lang="scss" scoped>
.er-layout-header {
  height: 56px;
  line-height: 56px;
  background-color: var(--er-white);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  .ant-avatar {
    background: var(--ant-primary-color);
    cursor: pointer;
  }
  .anticon {
    &:hover {
      color: var(--ant-primary-color);
    }
    cursor: pointer;
  }
  .er-svg-icon {
    font-size: 16px;
    cursor: pointer;
  }
}
</style>
