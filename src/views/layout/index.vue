<script setup lang="ts">
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue'
import { ref } from 'vue'
import LayoutHeader from './components/LayoutHeader.vue'
import LayoutMenu from './components/LayoutMenu.vue'
import LayoutPage from './components/LayoutPage.vue'
import LayoutFooter from './components/LayoutFooter.vue'
import { useUserStore } from '@/stores'
import { onMounted } from 'vue'

const collapsed = ref(false)

const userStore = useUserStore()
onMounted(() => userStore.getUser())
</script>

<template>
  <a-layout class="er-layout">
    <a-layout-sider :collapsed="collapsed" collapsedWidth="56" width="160">
      <div class="er-logo" :class="{ collapsed }"></div>
      <LayoutMenu></LayoutMenu>
      <div class="er-toggle" @click="collapsed = !collapsed">
        <MenuUnfoldOutlined v-if="collapsed" />
        <MenuFoldOutlined v-else />
      </div>
    </a-layout-sider>
    <a-layout class="er-section">
      <LayoutHeader />
      <a-layout-content>
        <LayoutPage></LayoutPage>
      </a-layout-content>
      <LayoutFooter></LayoutFooter>
    </a-layout>
  </a-layout>
</template>

<style lang="scss" scoped>
.er-layout {
  width: 100%;
  height: 100%;

  .ant-layout-sider {
    background: var(--er-layout-background) url('@/assets/menu-bg.png') no-repeat right bottom /
      300px auto;

    :deep(.ant-layout-sider-children) {
      display: flex;
      flex-direction: column;
    }

    .er-logo {
      width: 120px;
      height: 120px;
      margin: 28px auto;
      transition: all 0.3s ease;
      background: url('@/assets/logo2.png') no-repeat center / 90%;

      &.collapsed {
        width: 40px;
        height: 40px;
        margin: 12px auto 40px;
        background-image: url('@/assets/logo.png');
      }
    }

    .er-toggle {
      height: 56px;
      color: #f5f5f5;
      font-size: 16px;
      line-height: 56px;
      text-align: center;
    }
  }

  .er-section {
    display: block;
    height: 100%;
    overflow: auto;
    background-color: var(--er-background);
    color: var(--er-color);
  }

  .ant-layout-content {
    box-sizing: border-box;
    min-height: calc(100% - 126px);
    padding: 16px 16px 0;
  }
}
</style>
