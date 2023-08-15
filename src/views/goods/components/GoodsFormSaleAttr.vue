<script setup lang="ts">
import { IsRemark, ValueHasPicture } from '@/types/enums'
import type { SaleProperties } from '@/types/goods'
import { MinusCircleOutlined } from '@ant-design/icons-vue'
import { computed, reactive, ref, toRaw, watch } from 'vue'

const props = defineProps<{
  property?: SaleProperties
  hasAdd?: boolean
  selectedValues?: string[]
  value?: string
}>()

type PropertyValueItem = {
  value: string
  remark?: string
  picture?: string
}

const propertyValueItem: PropertyValueItem = reactive({
  value: ''
})

watch(
  () => props.value,
  (newValue) => {
    propertyValueItem.value = newValue || ''
  }
)

const options = computed(() => {
  return props.property?.values
    .map((v) => ({ value: v.valueName }))
    .filter((v) => !props.selectedValues?.includes(v.value))
})

const emit = defineEmits<{
  'on-del': [PropertyValueItem]
  'on-change': [PropertyValueItem]
}>()

const onDelAttrValue = () => {
  emit('on-del', toRaw(propertyValueItem))
}

watch(propertyValueItem, (newValue) => {
  emit('on-change', toRaw(newValue))
})

const imgUrl = ref('')
</script>

<template>
  <div class="attrs-item">
    <MinusCircleOutlined class="minus" @click="onDelAttrValue" />
    <a-auto-complete
      v-model:value.tirm="propertyValueItem.value"
      :filterOption="false"
      :options="options"
      placeholder="请选择或填写属性值"
      class="w200"
    />
    <a-input
      v-model:value="propertyValueItem.remark"
      class="w200"
      placeholder="请填写备注"
      v-if="property?.isRemark === IsRemark.Yes"
    ></a-input>
    <template v-if="property?.valueHasPicture === ValueHasPicture.Yes">
      <div class="choose-image" v-if="propertyValueItem.picture">
        <img :src="imgUrl" alt="" />
      </div>
      <div class="choose-image" v-else>+</div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.attrs {
  &-item {
    display: flex;
    align-items: center;
    padding: 10px 0;

    .minus {
      transition: all 0.3s;
      color: #eaeaea;
      font-size: 18px;
      cursor: pointer;

      &:hover {
        color: var(--er-primary);
      }
    }

    .w200 {
      width: 200px;
      margin-left: 10px;
    }

    .choose-image {
      width: 60px;
      height: 60px;
      margin-left: 10px;
      border: 1px dashed #eaeaea;
      background-color: var(--er-white);
      color: #999;
      font-size: 24px;
      font-weight: 100;
      line-height: 60px;
      text-align: center;
      cursor: pointer;

      img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
}
</style>
