<script setup lang="ts">
import { Modal } from 'ant-design-vue'
import type { AnchorContainer } from 'ant-design-vue/es/anchor/Anchor'
import { onBeforeRouteLeave } from 'vue-router'
import { useClassifyData } from '../composables'
import GoodsFormBasic from './GoodsFormBasic.vue'
import GoodsFormImage from './GoodsFormImage.vue'
import GoodsFormSale from './GoodsFormSale.vue'
import { ref } from 'vue'
import type { GoodsProperties } from '@/types/goods'
import { onMounted } from 'vue'
import { getPropertiesService } from '@/service/goods'
import { computed } from 'vue'

const { classifyData } = useClassifyData()

const anchorItems = [
  {
    key: 'goods-form-basic',
    href: '#goods-form-basic',
    title: '基础信息'
  },
  {
    key: 'goods-form-image',
    href: '#goods-form-image',
    title: '图文描述'
  },
  {
    key: 'goods-form-sale',
    href: '#goods-form-sale',
    title: '销售信息'
  },
  {
    key: 'goods-form-pay',
    href: '#goods-form-pay',
    title: '支付信息'
  },
  {
    key: 'goods-form-logistics',
    href: '#goods-form-logistics',
    title: '物流信息'
  },
  {
    key: 'goods-form-after-sale',
    href: '#goods-form-after-sale',
    title: '售后信息'
  }
]

const onGetContainer = () => document.querySelector('.er-section') as AnchorContainer

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

const properties = ref<GoodsProperties>()
const loading = ref(false)
onMounted(async () => {
  const backendId = classifyData.value[2]?.item?.id
  if (backendId) {
    try {
      loading.value = true
      const res = await getPropertiesService(backendId)
      properties.value = res.data
    } finally {
      loading.value = false
    }
  }
})

const selectedText = computed(() => {
  return classifyData.value.map((item) => item.item?.name).join(' > ')
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
      <div class="goods-form-card">
        <h3 class="goods-form-card-title" :id="anchorItems[0].key">基础信息</h3>
        <GoodsFormBasic
          :properties="properties?.otherProperties"
          :selected-text="selectedText"
          :loading="loading"
        />
      </div>
      <div class="goods-form-card">
        <h3 class="goods-form-card-title" :id="anchorItems[1].key">PC 端图文信息</h3>
        <GoodsFormImage />
      </div>
      <div class="goods-form-card">
        <h3 class="goods-form-card-title">APP 端图文信息</h3>
        <GoodsFormImage />
      </div>
      <div class="goods-form-card">
        <h3 class="goods-form-card-title" :id="anchorItems[2].key">销售信息</h3>
        <GoodsFormSale :properties="properties?.saleProperties" />
      </div>
      <a-form :labelCol="{ span: 3 }">
        <div class="goods-form-card">
          <h3 class="goods-form-card-title" :id="anchorItems[3].key">库存减扣</h3>
          <a-form-item label="库存扣减方式" class="p-20-60 w-1000">
            <a-radio-group>
              <a-radio class="leading-8" :value="1">拍下减库存</a-radio>
              <a-radio class="leading-8" :value="2">付款减库存</a-radio>
            </a-radio-group>
          </a-form-item>
        </div>
        <div class="goods-form-card">
          <h3 class="goods-form-card-title" :id="anchorItems[4].key">物流信息</h3>
          <a-form-item label="统一运费" required class="p-20-60 w-1000">
            <a-input></a-input>
          </a-form-item>
        </div>
        <div class="goods-form-card">
          <h3 class="goods-form-card-title" :id="anchorItems[5].key">售后信息</h3>
          <a-form-item class="p-20-60 w-1000">
            <a-checkbox-group>
              <a-checkbox class="leading-8" :value="1">7天无理由退货</a-checkbox>
              <a-checkbox class="leading-8" :value="2">假一赔十</a-checkbox>
              <a-checkbox class="leading-8" :value="3">支持换货</a-checkbox>
            </a-checkbox-group>
          </a-form-item>
        </div>
        <div class="goods-form-card">
          <h3 class="goods-form-card-title">上架时间</h3>
          <a-form-item class="p-20-60 mb-0 w-1000">
            <a-radio-group>
              <a-radio class="leading-8" :value="1">立刻上架</a-radio>
              <a-radio class="leading-8" :value="2">定时上架</a-radio>
              <a-radio class="leading-8" :value="3">放入仓库</a-radio>
            </a-radio-group>
          </a-form-item>
          <a-form-item class="p-20-60 w-1000" label="设定为">
            <a-date-picker format="YYYY-MM-DD HH:mm:ss" />
          </a-form-item>
        </div>
      </a-form>
      <a-space size="large" class="submit">
        <a-button size="large">保存草稿</a-button>
        <a-button size="large" type="primary">提交商品</a-button>
      </a-space>
    </a-page-header>
  </div>
</template>

<style lang="scss" scoped>
.goods-form {
  &-card {
    padding: 24px 0;
    border-bottom: 1px solid #eaeaea;

    &-title {
      position: relative;
      margin-top: 10px;
      padding-left: 16px;
      font-size: 16px;
      font-weight: 500;
      line-height: 50px;

      &::after {
        content: '';
        position: absolute;
        top: 15px;
        left: 0;
        width: 3px;
        height: 20px;
        background-color: var(--er-primary);
      }
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

  .submit {
    width: 100%;
    padding: 60px;
  }
}
</style>
