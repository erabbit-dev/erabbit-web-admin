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
      <a-layout-content :style="{ margin: '16px 16px 0' }">
        <LayoutPage></LayoutPage>
      </a-layout-content>
      <a-layout-footer class="er-footer"> Erabbit Admin ©2023 Created by ITCAST </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<style lang="scss" scoped>
.er-layout {
  height: 100%;
  width: 100%;
  background-color: var(--er-background);

  .ant-layout-sider {
    background: var(--er-layout-background) url(@/assets/menu-bg.png) no-repeat right bottom / 300px
      auto;

    :deep(.ant-layout-sider-children) {
      display: flex;
      flex-direction: column;
    }
    .er-logo {
      width: 40px;
      height: 40px;
      background: url(@/assets/logo.png) no-repeat center / 36px;
      margin: 12px auto 40px;
    }

    .er-toggle {
      font-size: 16px;
      color: #f5f5f5;
      text-align: center;
      height: 56px;
      line-height: 56px;
    }
  }
  .er-section {
    background-color: var(--er-background);
    color: var(--er-color);
  }
  .er-footer {
    background-color: var(--er-background);
    text-align: center;
    color: var(--er-color);
  }
}
</style>
