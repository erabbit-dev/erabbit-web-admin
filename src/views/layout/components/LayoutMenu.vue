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
      <RouterLink to="/dashboard">{{ $t('menu.dashboard') }}</RouterLink>
    </a-menu-item>
    <a-menu-item key="/goods">
      <template #icon>
        <ShopOutlined />
      </template>
      <RouterLink to="/goods">{{ $t('menu.goods') }}</RouterLink>
    </a-menu-item>
    <a-menu-item key="/goods/add">
      <template #icon>
        <SkinOutlined />
      </template>
      <RouterLink to="/goods/add">{{ $t('menu.goods/add') }}</RouterLink>
    </a-menu-item>
    <a-menu-item key="/attrs">
      <template #icon>
        <TagOutlined />
      </template>
      <RouterLink to="/attrs">{{ $t('menu.attrs') }}</RouterLink>
    </a-menu-item>
    <a-menu-item key="/attrs/group">
      <template #icon>
        <TagsOutlined />
      </template>
      <RouterLink to="/attrs/group">{{ $t('menu.attrs/group') }}</RouterLink>
    </a-menu-item>
    <a-menu-item key="/category/backend">
      <template #icon>
        <ClusterOutlined />
      </template>
      <RouterLink to="/category/backend">{{ $t('menu.category/backend') }}</RouterLink>
    </a-menu-item>
    <a-menu-item key="/category/frontend">
      <template #icon>
        <PartitionOutlined />
      </template>
      <RouterLink to="/category/frontend">{{ $t('menu.category/frontend') }}</RouterLink>
    </a-menu-item>
  </a-menu>
</template>

<style lang="scss" scoped>
.ant-menu {
  flex: 1;
  overflow: auto;
  background-color: transparent;

  :deep(.ant-menu-item) {
    width: 100%;
    height: 50px;
    margin: 0;
    margin-bottom: 8px;
    border-radius: 0;
    background-color: transparent !important;
    line-height: 50px;
  }

  :deep(.ant-menu-item-selected) {
    background-image: linear-gradient(-90deg, var(--er-primary-8), var(--er-layout-background));
  }
}
</style>
