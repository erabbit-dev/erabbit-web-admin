<script setup lang="ts">
import { computed } from 'vue'

const dataSource = computed(() => {
  return [
    {
      key: '1',
      saleableInventory: 0,
      marketPrice: 100,
      sellingPrice: 66,
      skuCode: '00001'
    },
    {
      key: '2',
      saleableInventory: 0,
      marketPrice: 100,
      sellingPrice: 66,
      skuCode: '00002'
    },
    {
      key: '3',
      saleableInventory: 0,
      marketPrice: 100,
      sellingPrice: 66,
      skuCode: '00003'
    }
  ]
})
const columns = computed(() => {
  return [
    {
      title: '颜色',
      dataIndex: '颜色',
      key: '颜色'
    },
    {
      title: '尺码',
      dataIndex: '尺码',
      key: '尺码'
    },
    {
      title: '季节',
      dataIndex: '季节',
      key: '季节'
    },
    {
      title: '可销售库存',
      dataIndex: 'saleableInventory',
      key: 'saleableInventory',
      width: 120
    },
    {
      title: '市场价',
      dataIndex: 'marketPrice',
      key: 'marketPrice',
      width: 120
    },
    {
      title: '售价',
      dataIndex: 'sellingPrice',
      key: 'sellingPrice',
      width: 120
    },
    {
      title: 'SKU编码',
      dataIndex: 'skuCode',
      key: 'skuCode',
      width: 120
    }
  ]
})
</script>

<template>
  <div class="sale-table">
    <div class="flex justify-between">
      <p class="text-gray-400 mr-2">在下方栏中选择内容进行批量填充</p>
      <a-button size="small" type="primary">批量填充</a-button>
    </div>
    <a-table :columns="columns" :dataSource="dataSource" bordered :pagination="false">
      <template #bodyCell="{ column, text }">
        <template
          v-if="['saleableInventory', 'marketPrice', 'sellingPrice', 'skuCode'].includes(column.key as string)"
        >
          <a-input :value="text"></a-input>
        </template>
      </template>
    </a-table>
  </div>
</template>

<style lang="scss" scoped>
.sale-table {
  padding: 20px;
  border: 1px solid #eaeaea;
  background-color: #f9f9f9;
}
</style>
