<script setup lang="ts">
import { LoadingOutlined } from '@ant-design/icons-vue'
import { computed } from 'vue'
import { ref } from 'vue'

export type OptionType = {
  id: string
  name: string
}
const props = defineProps<{
  placeholder?: string
  options: OptionType[]
  showArrow?: boolean
  loading?: boolean
}>()

const filterOptions = computed(() => {
  return props.options.filter((item) => item.name.includes(query.value))
})

const query = ref('')
const onSearch = (val: string) => {
  query.value = val
}

const emit = defineEmits<{
  (e: 'selected', item: OptionType): void
}>()

const selectedId = ref()
const onSelected = (item: OptionType) => {
  selectedId.value = item.id
  emit('selected', item)
}
</script>

<template>
  <div class="classify-select-item">
    <div class="head">
      <a-input-search :placeholder="placeholder" @search="onSearch" />
    </div>
    <div class="body">
      <a
        href="javascript:;"
        class="body-item"
        v-for="item in filterOptions"
        :key="item.id"
        @click="onSelected(item)"
        :class="{ active: selectedId === item.id }"
      >
        {{ item.name }} <span class="arrow" v-if="showArrow">></span>
      </a>
    </div>
    <div class="loading" v-if="loading">
      <LoadingOutlined />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.classify-select-item {
  position: relative;
  flex: 1;
  border-right: 1px solid var(--er-border-color);

  .head {
    padding: 16px;
  }

  .body {
    padding-bottom: 16px;

    &-item {
      display: block;
      position: relative;
      box-sizing: border-box;
      height: 36px;
      padding: 0 16px;
      transition: all 0.3s;
      color: var(--er-text);
      font-size: 13px;
      line-height: 36px;

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 3px;
        height: 100%;
        transition: all 0.3s;
        background-color: transparent;
      }

      .arrow {
        position: absolute;
        top: 0;
        right: 16px;
        transform: scale(1, 1.6);
        transition: all 0.3s;
        opacity: 0;
      }

      &.active,
      &:hover {
        background-color: var(--er-background);

        &::before {
          background-color: var(--er-primary);
        }

        .arrow {
          opacity: 1;
        }
      }
    }
  }

  .loading {
    display: flex;
    position: absolute;
    top: 0;
    left: 0;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    color: var(--er-primary);
    font-size: 20px;
  }
}
</style>
