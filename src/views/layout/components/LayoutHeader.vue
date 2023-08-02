<script setup lang="ts">
import { useAppStore, useUserStore } from '@/stores'
import {
  BellOutlined,
  CompressOutlined,
  ExpandOutlined,
  HomeOutlined,
  LogoutOutlined,
  SettingOutlined
} from '@ant-design/icons-vue'
import { useDark, useFullscreen } from '@vueuse/core'
import { Modal, message } from 'ant-design-vue'
import { onMounted, watch } from 'vue'
import LayoutTranslate from './LayoutTranslate.vue'
import { useRouter } from 'vue-router'

const appStore = useAppStore()

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

// 退出
const userStore = useUserStore()
const router = useRouter()
function onLogout() {
  Modal.confirm({
    title: '温馨提示',
    content: '您确认退出小兔鲜管理平台吗？',
    onOk() {
      userStore.setToken('')
      userStore.delUser()
      router.push('/login')
    },
    okText: '确认'
  })
}
</script>

<template>
  <a-layout-header class="er-layout-header">
    <a-breadcrumb>
      <a-breadcrumb-item>
        <RouterLink to="/"><HomeOutlined /></RouterLink>
      </a-breadcrumb-item>
      <a-breadcrumb-item>
        {{ $t(`menu${$route.path.replace('/', '.')}`) }}
      </a-breadcrumb-item>
    </a-breadcrumb>
    <a-space class="er-avatar" :align="'center'">
      <LayoutTranslate></LayoutTranslate>
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
        :name="isDarkMode ? 'sun' : 'moon'"
        @click="isDarkMode = !isDarkMode"
      ></ErSvgIcon>
      <a-divider style="font-size: 1em" type="vertical" />
      <a-dropdown placement="bottomRight">
        <template #overlay>
          <a-menu>
            <a-menu-item> <SettingOutlined /> {{ $t('app.settings') }} </a-menu-item>
            <a-menu-item @click="onLogout"> <LogoutOutlined /> {{ $t('app.logout') }} </a-menu-item>
          </a-menu>
        </template>
        <a-avatar :size="28" :src="userStore.user?.avatar"> Z </a-avatar>
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
