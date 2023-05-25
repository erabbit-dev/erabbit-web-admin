<script setup lang="ts">
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue'
import { ref } from 'vue'
import LayoutHeader from './components/LayoutHeader.vue'
import LayoutMenu from './components/LayoutMenu.vue'
import LayoutPage from './components/LayoutPage.vue'

const collapsed = ref(true)
</script>

<template>
  <a-layout class="er-layout">
    <a-layout-sider :collapsed="collapsed" collapsedWidth="56" width="160">
      <div class="er-logo"></div>
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
      <a-layout-footer class="er-footer">
        {{ $t('app.sys') }} ©2023 Created by {{ $t('app.company') }}
      </a-layout-footer>
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
      width: 40px;
      height: 40px;
      margin: 12px auto 40px;
      background: url('@/assets/logo.png') no-repeat center / 36px;
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

  .er-footer {
    background-color: var(--er-background);
    color: var(--er-text2);
    text-align: center;
  }

  .ant-layout-content {
    box-sizing: border-box;
    min-height: calc(100% - 126px);
    padding: 16px 16px 0;
  }
}
</style>
