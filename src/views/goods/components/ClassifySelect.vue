<script setup lang="ts">
import { getClassifyListService } from '@/service/goods'
import { computed, onMounted, ref } from 'vue'
import ClassifySelectItem from './ClassifySelectItem.vue'
import type { ClassifyDataItem, OptionType } from '../types'

const classifyData = ref<ClassifyDataItem[]>([])

onMounted(async () => {
  loadData()
})

const loadData = async (id?: string) => {
  classifyData.value.push({ loading: true, options: [] })
  const res = await getClassifyListService(id)
  const item = classifyData.value[classifyData.value.length - 1]
  item.loading = false
  item.options = res.data
}

const onSelected = async (index: number, item: OptionType) => {
  if (index < 4) {
    classifyData.value.splice(index)
    loadData(item.id)
  }
  classifyData.value[index - 1].item = item
}

const selectedText = computed(() => {
  return classifyData.value.map((item) => item.item?.name).join(' > ')
})

const disabled = computed(() => {
  return classifyData.value.filter((item) => item.item).length !== 4
})

const emit = defineEmits<{
  next: [ClassifyDataItem[]]
}>()
const onNext = () => {
  if (classifyData.value[3].item) {
    emit('next', classifyData.value)
  }
}
</script>

<template>
  <div class="classify-select">
    <div class="tip">
      发布须知：准确选择类目有利于商品曝光，促进转化；若错放类目将会导致审核不通过、流量降权或下架整改。
    </div>
    <div class="card">
      <ClassifySelectItem
        v-for="i in 4"
        :key="i"
        :placeholder="i === 4 ? '品牌' : '类目'"
        :options="classifyData[i - 1]?.options || []"
        :show-arrow="i < 4"
        @selected="onSelected(i, $event)"
        :loading="classifyData[i - 1]?.loading"
      />
    </div>
    <div class="selected">{{ selectedText && `已选择类目：${selectedText}` }}</div>
    <div class="footer">
      <a-button type="primary" @click="onNext" :disabled="disabled">下 一 步</a-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.classify-select {
  width: 100%;
  max-width: var(--er-max-width);
}

.tip {
  height: 40px;
  margin-bottom: 16px;
  padding-left: 16px;
  border: 1px solid #ffe1b3;
  border-radius: 2px;
  background: #fff4e4;
  color: #e19a30;
  font-size: 12px;
  line-height: 40px;
}

.card {
  display: flex;
  align-items: stretch;
  height: 440px;
  border: 1px solid var(--er-border-color);
  border-right: none;
  border-radius: 2px;
  background-color: var(--er-white);
}

.selected {
  height: 40px;
  padding-left: 16px;
  color: var(--er-primary);
  line-height: 40px;
}

.footer {
  text-align: right;
}
</style>
