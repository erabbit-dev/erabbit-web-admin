<script setup lang="ts">
import { getPropertiesService } from '@/service/goods'
import type { OtherProperties } from '@/types/goods'
import { Modal } from 'ant-design-vue'
import type { AnchorContainer } from 'ant-design-vue/es/anchor/Anchor'
import { onMounted, ref } from 'vue'
import { onBeforeRouteLeave } from 'vue-router'
import type { ClassifyDataItem } from './ClassifySelect.vue'
import GoodsFormAfterSale from './GoodsFormAfterSale.vue'
import GoodsFormBasic from './GoodsFormBasic.vue'
import GoodsFormImage from './GoodsFormImage.vue'
import GoodsFormLogistics from './GoodsFormLogistics.vue'
import GoodsFormPay from './GoodsFormPay.vue'
import GoodsFormSale from './GoodsFormSale.vue'
import { computed } from 'vue'

const props = defineProps<{
  classifyData: ClassifyDataItem[]
}>()

const otherProperties = ref<OtherProperties[]>([])
onMounted(async () => {
  const backendId = props.classifyData[2].item?.id
  if (backendId) {
    const res = await getPropertiesService(backendId)
    otherProperties.value = res.data.otherProperties || []
  }
})

const anchorItems = computed(() => [
  {
    key: '1',
    href: '#goods-form-basic',
    title: '基础信息',
    component: GoodsFormBasic,
    props: {
      classifyData: props.classifyData,
      properties: otherProperties.value
    }
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
])

const onGetContainer = () => document.querySelector('.er-section') as AnchorContainer

const itemRefs = ref([])

const emit = defineEmits<{
  backClassify: []
}>()
const onBackClassify = () => {
  Modal.confirm({
    title: '温馨提示',
    content: '您确认要放弃填写商品信息，返回选择商品类目吗？',
    onOk: () => {
      emit('backClassify')
    },
    okText: '确认'
  })
}
onBeforeRouteLeave((to, from, next) => {
  Modal.confirm({
    title: '温馨提示',
    content: '您确认要放弃填写商品信息，离开此页面吗？',
    onOk: () => {
      next()
    },
    okText: '确认'
  })
})
</script>

<template>
  <div class="goods-form">
    <a-page-header title="发布商品" sub-title="请填写商品信息" @back="onBackClassify">
      <a-anchor
        direction="horizontal"
        :getContainer="onGetContainer"
        :items="anchorItems"
        :targetOffset="60"
      />
      <div class="form" v-for="item in anchorItems" :key="item.key">
        <h3 :id="item.href.substring(1)">{{ item.title }}</h3>
        <Component :is="item.component" ref="itemRefs" :="{ ...item.props }"></Component>
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
    background-color: var(--er-white);

    .ant-anchor {
      &-link {
        padding: 12px 24px;
      }
    }
  }
}
</style>
