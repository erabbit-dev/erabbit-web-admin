<script setup lang="ts">
import type { OtherProperties } from '@/types/goods'
import { computed, ref } from 'vue'
import type { ClassifyDataItem } from './ClassifySelect.vue'
import { LoadingOutlined } from '@ant-design/icons-vue'
import { onMounted } from 'vue'
import { getPropertiesService } from '@/service/goods'

const props = defineProps<{
  classifyData: ClassifyDataItem[]
}>()

const properties = ref<OtherProperties[]>([])
const loading = ref(false)
onMounted(async () => {
  const backendId = props.classifyData[2].item?.id
  if (backendId) {
    try {
      loading.value = true
      const res = await getPropertiesService(backendId)
      properties.value = res.data.otherProperties || []
    } finally {
      loading.value = false
    }
  }
})

const selectedText = computed(() => {
  return props.classifyData.map((item) => item.item?.name).join(' > ')
})
</script>

<template>
  <div class="goods-form-basic">
    <a-form :labelCol="{ span: 3 }">
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
        <div class="attrs" v-if="!loading" :style="properties.length ? {} : { border: 'none' }">
          <div class="attrs-item" v-for="item in properties" :key="item.id">
            <div class="attrs-item-header">{{ item.name }}：</div>
            <div class="attrs-item-body">
              <a-row>
                <template v-for="prop in item.properties" :key="prop.id">
                  <a-col :span="3" :title="prop.name">{{ prop.name }}：</a-col>
                  <a-col :span="9">
                    <a-select style="width: 80%">
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
        <div class="attrs loading" v-else>
          <a-spin :indicator="LoadingOutlined" />
        </div>
      </a-form-item>
    </a-form>
  </div>
</template>

<style lang="scss" scoped>
.goods-form-basic {
  max-width: 1000px;
  padding: 20px 60px;

  .attrs {
    margin-top: 12px;
    border: 1px solid #eaeaea;
    border-bottom: none;
    background-color: #f9f9f9;

    &.loading {
      padding: 50px;
      border: 1px solid #eaeaea;
      text-align: center;
    }

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
          overflow: hidden;
          color: #7c7c8a;
          font-size: 12px;
          line-height: 32px;
          text-align: right;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
}
</style>
