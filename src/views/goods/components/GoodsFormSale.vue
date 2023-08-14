<script setup lang="ts">
import type { SaleProperties } from '@/types/goods'
import { MinusCircleOutlined } from '@ant-design/icons-vue'
import { ref } from 'vue'
import type { PropertyItem } from '../types'
import { IsRemark, ValueHasPicture } from '@/types/enums'

defineProps<{
  properties?: SaleProperties[] | null
}>()

const propertyList = ref<PropertyItem[]>([])

const onDelAttrValue = (propertyName: string, j: number) => {
  const propertyItem = propertyList.value.find((item) => item.propertyName === propertyName)
  propertyItem && propertyItem.values.splice(j, 1)
  if (propertyItem?.values.length === 0) {
    propertyList.value = propertyList.value.filter((item) => item.propertyName !== propertyName)
  }
}

const onAddAttrValue = (propertyName: string) => {
  const propertyItem = propertyList.value.find((item) => item.propertyName === propertyName)
  if (!propertyItem) {
    propertyList.value.push({
      propertyName,
      values: ['']
    })
  } else {
    propertyItem.values.push('')
  }
}
</script>

<template>
  <div class="goods-form-sale">
    <a-form :labelCol="{ span: 3 }">
      <a-form-item :label="item.name" v-for="(item, i) in properties" :key="item.id">
        <p class="form-text">正确填写属性值可增加搜索/导购机会</p>
        <div class="attrs">
          <template v-if="propertyList[i]?.values">
            <div class="attrs-item" v-for="(val, j) in propertyList[i].values" :key="val">
              <MinusCircleOutlined class="minus" @click="onDelAttrValue(item.id, j)" />
              <a-auto-complete
                v-model:value="propertyList[i].values[j]"
                :options="item.values.map((v) => ({ value: v.valueName }))"
                placeholder="请选择或填写属性值"
                class="w200"
              />
              <a-input
                class="w200"
                placeholder="请填写备注"
                v-if="item.isRemark === IsRemark.Yes"
              ></a-input>
              <div class="choose-image" v-if="item.valueHasPicture === ValueHasPicture.Yes">+</div>
              <a-button
                type="link"
                v-if="propertyList[i].values.length - 1 === j"
                @click="onAddAttrValue(item.id)"
                >添加属性值</a-button
              >
            </div>
          </template>
          <div class="attrs-item" v-else>
            <p class="form-text">
              属性值：<a href="javascript:;" @click="onAddAttrValue(item.id)">添加属性值</a>
            </p>
          </div>
        </div>
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
  max-width: 1000px;
  padding: 20px 60px;

  .attrs {
    border: 1px solid #eaeaea;
    background-color: #f9f9f9;

    &-item {
      display: flex;
      align-items: center;
      padding: 10px 20px;

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
      }

      .ant-btn-link {
        color: var(--er-primary);
      }
    }
  }
}
</style>
