<script setup lang="ts">
import type { AnchorContainer } from 'ant-design-vue/es/anchor/Anchor'

const onGetContainer = () => document.querySelector('.er-section') as AnchorContainer
</script>

<template>
  <div class="goods-form">
    <a-page-header title="发布商品" sub-title="请填写商品信息" @back="() => $router.back()">
      <a-anchor
        direction="horizontal"
        :getContainer="onGetContainer"
        :items="[
          {
            key: '1',
            href: '#goods-basic-info',
            title: '基础信息'
          },
          {
            key: '2',
            href: '#goods-text-image',
            title: '图文表述'
          },
          {
            key: '3',
            href: '#goods-sale-info',
            title: '销售信息'
          },
          {
            key: '4',
            href: '#goods-pay-info',
            title: '支付信息'
          },
          {
            key: '5',
            href: '#goods-logistics-info',
            title: '物流信息'
          },
          {
            key: '6',
            href: '#goods-after-sale-info',
            title: '售后信息'
          }
        ]"
      />
      <div class="form">
        <h3 id="goods-basic-info">基础信息</h3>
      </div>
      <div class="form">
        <h3 id="goods-text-image">图文表述</h3>
      </div>
      <div class="form">
        <h3 id="goods-sale-info">销售信息</h3>
      </div>
      <div class="form">
        <h3 id="goods-pay-info">支付信息</h3>
      </div>
      <div class="form">
        <h3 id="goods-logisticsis-info">物流信息</h3>
      </div>
      <div class="form">
        <h3 id="goods-after-sale-info">售后信息</h3>
      </div>
    </a-page-header>
  </div>
</template>

<style lang="scss" scoped>
.form {
  min-height: 300px;
}
</style>
