<script setup lang="ts">
import type { AnchorContainer } from 'ant-design-vue/es/anchor/Anchor'
import { ref } from 'vue'
import GoodsFormAfterSale from './GoodsFormAfterSale.vue'
import GoodsFormBasic from './GoodsFormBasic.vue'
import GoodsFormImage from './GoodsFormImage.vue'
import GoodsFormLogistics from './GoodsFormLogistics.vue'
import GoodsFormPay from './GoodsFormPay.vue'
import GoodsFormSale from './GoodsFormSale.vue'

const anchorItems = [
  {
    key: '1',
    href: '#goods-form-basic',
    title: '基础信息',
    component: GoodsFormBasic
  },
  {
    key: '2',
    href: '#goods-form-image',
    title: '图文表述',
    component: GoodsFormImage
  },
  {
    key: '3',
    href: '#goods-form-sale',
    title: '销售信息',
    component: GoodsFormSale
  },
  {
    key: '4',
    href: '#goods-form-pay',
    title: '支付信息',
    component: GoodsFormPay
  },
  {
    key: '5',
    href: '#goods-form-logistics',
    title: '物流信息',
    component: GoodsFormLogistics
  },
  {
    key: '6',
    href: '#goods-form-after-sale',
    title: '售后信息',
    component: GoodsFormAfterSale
  }
]

const onGetContainer = () => document.querySelector('.er-section') as AnchorContainer

const itemRefs = ref([])
</script>

<template>
  <div class="goods-form">
    <a-page-header title="发布商品" sub-title="请填写商品信息" @back="() => $router.back()">
      <a-anchor direction="horizontal" :getContainer="onGetContainer" :items="anchorItems" />
      <div class="form" v-for="item in anchorItems" :key="item.key">
        <h3 :id="item.href.substring(1)">{{ item.title }}</h3>
        <Component :is="item.component" ref="itemRefs"></Component>
      </div>
    </a-page-header>
  </div>
</template>

<style lang="scss" scoped>
.goods-form {
  .form {
    min-height: 300px;

    h3 {
      margin: 20px 0;
      font-size: 16px;
      font-weight: 500;
    }
  }

  :deep(.ant-anchor-wrapper) {
    background-color: #fff;

    .ant-anchor {
      &-link {
        padding: 12px 24px;
      }
    }
  }
}
</style>
