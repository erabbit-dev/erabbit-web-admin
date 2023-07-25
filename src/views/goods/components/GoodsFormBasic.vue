<script setup lang="ts">
import type { OtherProperties } from '@/types/goods'
import { computed } from 'vue'
import type { ClassifyDataItem } from './ClassifySelect.vue'

const props = defineProps<{
  classifyData: ClassifyDataItem[]
  properties: OtherProperties[]
}>()

const selectedText = computed(() => {
  return props.classifyData.map((item) => item.item?.name).join(' > ')
})
</script>

<template>
  <div class="goods-form-basic">
    <a-form>
      <a-form-item label="商品分类">
        <p class="form-text">{{ selectedText }} <a href="#">切换类目</a></p>
      </a-form-item>
      <a-form-item label="商品名称">
        <a-input placeholder="请输入商品名称"></a-input>
      </a-form-item>
      <a-form-item label="商品属性">
        <p class="form-text">
          错误填写宝贝属性，可能会引起宝贝下架或搜索流量减少，影响您的正常销售，请认真准确填写！
        </p>
        <p class="form-text">没有合适的属性值？<a href="#">点击反馈</a></p>
        <div class="attrs" v-if="properties && properties.length">
          <div class="attrs-item" v-for="item in properties" :key="item.id">
            <div class="attrs-item-header">{{ item.name }}：</div>
            <div class="attrs-item-body">
              <a-row>
                <template v-for="prop in item.properties" :key="prop.id">
                  <a-col :span="3" style="text-align: right">{{ prop.name }}：</a-col>
                  <a-col :span="9">
                    <a-select>
                      <a-select-option v-for="val in prop.values" :value="val.id" :key="val.id">
                        {{ val.valueName }}
                      </a-select-option>
                    </a-select>
                  </a-col>
                </template>
              </a-row>
            </div>
          </div>
        </div>
        <div class="attrs" v-else>正在加载属性数据...</div>
      </a-form-item>
    </a-form>
  </div>
</template>

<style lang="scss" scoped>
.goods-form-basic {
  max-width: 1000px;
  padding: 20px 60px;

  :deep(.ant-form-item-label) {
    label {
      color: #848484;
    }
  }

  .form-text {
    margin: 0;
    padding: 0;
    color: #555;
    line-height: 32px;

    a {
      margin-left: 10px;
      color: var(--er-primary);
    }
  }

  .attrs {
    border: 1px solid #eaeaea;
    border-bottom: none;
    background-color: #f9f9f9;

    &-item {
      padding: 16px 16px 0;
      border-bottom: 1px solid #eaeaea;

      &-header {
        margin-bottom: 16px;
        color: #7c7c8a;
      }

      .ant-col {
        margin-bottom: 16px;

        &:nth-child(odd) {
          color: #7c7c8a;
          font-size: 12px;
          line-height: 32px;
        }
      }
    }
  }
}
</style>
