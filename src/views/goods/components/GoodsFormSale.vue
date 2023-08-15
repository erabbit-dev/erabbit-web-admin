<script setup lang="ts">
import type { SaleProperties } from '@/types/goods'
import { message } from 'ant-design-vue'
import { ref, watch } from 'vue'
import type { PropertyItem } from '../types'
import GoodsFormSaleAttr from './GoodsFormSaleAttr.vue'
import GoodsFormSaleTable from './GoodsFormSaleTable.vue'

const props = defineProps<{
  properties?: SaleProperties[] | null
}>()

const propertyList = ref<PropertyItem[]>([])

watch(
  () => props.properties,
  (newValue) => {
    if (!newValue) return
    propertyList.value =
      props.properties?.map((item) => ({ propertyName: item.name, values: [] })) || []
  }
)

const onDelAttrValue = (i: number, j: number) => {
  const propertyItem = propertyList.value?.[i]
  if (!propertyItem) return

  propertyItem.values.splice(j, 1)
}

const onAddAttrValue = (i: number) => {
  const propertyItem = propertyList.value?.[i]
  console.log(propertyItem)
  if (!propertyItem) return

  if (propertyItem.values.includes('')) return message.warn('属性值不能为空')
  propertyItem.values.push('')
}

const onUpdateAttrValue = (i: number, j: number, value: string) => {
  const propertyItem = propertyList.value?.[i]
  if (!propertyItem) return

  if (propertyItem.values.includes(value) && value !== '') {
    message.warn('属性值不能重复')
    propertyItem.values[j] = ''
    return
  }
  propertyItem.values[j] = value
}
</script>

<template>
  <div class="goods-form-sale">
    <a-form :labelCol="{ span: 3 }">
      <a-form-item :label="item.name" v-for="(item, i) in properties" :key="item.id">
        <p class="form-text">正确填写属性值可增加搜索/导购机会</p>
        <div class="attrs">
          <template v-if="propertyList[i]?.values.length">
            <GoodsFormSaleAttr
              v-for="(v, j) in propertyList[i].values"
              :key="j"
              :property="item"
              :value="propertyList[i].values[j]"
              :selectedValues="propertyList[i].values"
              @on-del="onDelAttrValue(i, j)"
              @on-change="onUpdateAttrValue(i, j, $event.value)"
            />
          </template>
          <div class="attrs-item">
            <a-button type="link" size="small" @click="onAddAttrValue(i)"> 添加属性值 </a-button>
          </div>
        </div>
      </a-form-item>
      <a-form-item label="价格" required>
        <GoodsFormSaleTable />
      </a-form-item>
      <a-form-item label="一口价" required>
        <a-input placeholder="请输入"></a-input>
      </a-form-item>
      <a-form-item label="SPU" required>
        <a-input placeholder="请输入"></a-input>
      </a-form-item>
    </a-form>
  </div>
</template>

<style lang="scss" scoped>
.goods-form-sale {
  max-width: var(--er-max-width);
  padding: 20px 60px;

  .attrs {
    padding: 10px 20px;
    border: 1px solid #eaeaea;
    background-color: #f9f9f9;

    .ant-btn-link {
      color: var(--er-primary);
    }
  }
}
</style>
