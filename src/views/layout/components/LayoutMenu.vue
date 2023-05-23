<script setup lang="ts">
import {
  SkinOutlined,
  ShopOutlined,
  DashboardOutlined,
  TagsOutlined,
  TagOutlined,
  PartitionOutlined,
  ClusterOutlined
} from '@ant-design/icons-vue'
</script>

<template>
  <a-menu mode="inline" theme="dark" :selected-keys="[$route.path]">
    <a-menu-item key="/dashboard">
      <template #icon>
        <DashboardOutlined />
      </template>
      <RouterLink to="/dashboard">据看板</RouterLink>
    </a-menu-item>
    <a-menu-item key="/goods">
      <template #icon>
        <ShopOutlined />
      </template>
      <RouterLink to="/goods">商品管理</RouterLink>
    </a-menu-item>
    <a-menu-item key="/goods/add">
      <template #icon>
        <SkinOutlined />
      </template>
      <RouterLink to="/goods/add">商品录入</RouterLink>
    </a-menu-item>
    <a-menu-item key="/attrs">
      <template #icon>
        <TagOutlined />
      </template>
      <RouterLink to="/attrs">属性管理</RouterLink>
    </a-menu-item>
    <a-menu-item key="/attrs/group">
      <template #icon>
        <TagsOutlined />
      </template>
      <RouterLink to="/attrs/group">属性组管理</RouterLink>
    </a-menu-item>
    <a-menu-item key="/category/backend">
      <template #icon>
        <ClusterOutlined />
      </template>
      <RouterLink to="/category/backend">后台类目</RouterLink>
    </a-menu-item>
    <a-menu-item key="/category/frontend">
      <template #icon>
        <PartitionOutlined />
      </template>
      <RouterLink to="/category/frontend">前台类目</RouterLink>
    </a-menu-item>
  </a-menu>
</template>

<style lang="scss" scoped>
.ant-menu {
  flex: 1;
  background-color: transparent;

  :deep(.ant-menu-item) {
    background-color: transparent !important;
    height: 50px;
    line-height: 50px;
    margin-bottom: 0;
  }

  :deep(.ant-menu-item-selected) {
    background-image: linear-gradient(-90deg, var(--ant-primary-8), var(--er-layout-background));
  }
}
</style>
