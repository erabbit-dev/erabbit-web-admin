<script setup lang="tsx">
import { getGoodsPageService } from '@/service/goods'
import type { GoodsItem, GoodsSearchParams, StateMap } from '@/types/goods'
import { DownOutlined, UpOutlined } from '@ant-design/icons-vue'
import type { ColumnsType } from 'ant-design-vue/es/table'
import { onMounted } from 'vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import avatar from '@/assets/avatar.png'
import { computed } from 'vue'

const expand = ref(true)
const stateMap: StateMap = {
  0: '全部',
  1: '出售中',
  2: '仓库中',
  3: '已售罄',
  4: '回收站',
  5: '历史宝贝'
}

const params = ref<Partial<GoodsSearchParams>>({
  state: 0,
  page: 1,
  pageSize: 10,
  backendId: ''
})

const router = useRouter()

const columns: ColumnsType = [
  {
    title: '商品编号',
    align: 'center',
    dataIndex: 'id',
    width: 200,
    fixed: 'left'
  },
  {
    title: '商品名称',
    align: 'left',
    dataIndex: 'name',
    width: 330,
    customRender: ({ record }: { record: GoodsItem }) => (
      <>
        <a-image width={100} height={100} src={record.picture || avatar} fallback={avatar} />
        <span style={{ marginLeft: '10px' }}>{record.name}</span>
      </>
    )
  },
  {
    title: '提交人',
    align: 'center',
    dataIndex: 'creator',
    width: 150,
    customRender: ({ record }: { record: GoodsItem }) => record.creator.name
  },
  {
    title: '价格',
    align: 'center',
    dataIndex: 'price',
    width: 150
  },
  {
    title: '库存',
    align: 'center',
    dataIndex: 'inventory',
    width: 100
  },
  {
    title: '累计销量',
    align: 'center',
    dataIndex: 'salesCount',
    width: 100
  },
  {
    title: '商品状态',
    align: 'center',
    dataIndex: 'state',
    width: 100,
    customRender: ({ record }: { record: GoodsItem }) => stateMap[record.state]
  },
  {
    title: '创建时间',
    align: 'center',
    dataIndex: 'createTime',
    width: 150
  },
  {
    title: '发布时间',
    align: 'center',
    dataIndex: 'publishTime',
    width: 150,
    customRender: ({ record }: { record: GoodsItem }) => record.publishTime || '-'
  },
  {
    title: '操作',
    align: 'center',
    width: 150,
    fixed: 'right',
    customRender: ({ record }: { record: GoodsItem }) => {
      const btnText = record.state === 1 ? '上架' : '下架'
      return (
        <>
          <a-button
            type="link"
            size="small"
            onClick={() => router.push(`/goods/add/moreinfo/${record.id}`)}
          >
            编辑
          </a-button>
          <a-button type="link" size="small">
            {btnText}
          </a-button>
        </>
      )
    }
  }
]
const rowSelection = {}

const total = ref(0)
const pagination = computed(() => ({
  total: total.value,
  current: params.value.page,
  pageSize: params.value.pageSize
}))

const goodsList = ref<GoodsItem[]>([])
const getGoodsPage = async () => {
  const res = await getGoodsPageService(params.value)
  goodsList.value = res.data.items
  total.value = res.data.counts
}
onMounted(() => getGoodsPage())
</script>

<template>
  <div class="goods-page">
    <a-card class="search">
      <a-form>
        <a-row :gutter="24">
          <a-col :span="8">
            <a-form-item label="商品编号：">
              <a-input></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="商品名称：">
              <a-input></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="8" v-if="expand">
            <a-form-item label="所属类目：">
              <a-input></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="8" v-if="expand">
            <a-form-item label="价格区间：">
              <a-input></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="8" v-if="expand">
            <a-form-item label="累计销量：">
              <a-input></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="8" class="optional">
            <a-space>
              <a-button type="primary" ghost>搜索</a-button>
              <a-button>重置</a-button>
              <a class="expand" href="javascript:;" @click="expand = !expand">
                {{ expand ? '收起' : '展开' }}
                <UpOutlined v-if="expand" />
                <DownOutlined v-else />
              </a>
            </a-space>
          </a-col>
        </a-row>
      </a-form>
    </a-card>
    <a-card class="result">
      <a-tabs v-model:activeKey="params.state">
        <a-tab-pane v-for="(v, k) in stateMap" :key="k" :tab="v"></a-tab-pane>
        <template #rightExtra>
          <a-button type="primary">发布商品</a-button>
        </template>
      </a-tabs>
      <a-table
        :columns="columns"
        :data-source="goodsList"
        :row-selection="rowSelection"
        :scroll="{ x: 1200 }"
        :pagination="pagination"
      >
      </a-table>
    </a-card>
  </div>
</template>

<style lang="scss" scoped>
.goods-page {
  .search {
    .optional {
      display: flex;
      align-items: flex-start;
      justify-content: flex-end;
    }

    .expand {
      color: var(--er-primary);
    }

    :deep(.ant-card-body) {
      padding-bottom: 0;
    }
  }

  .result {
    margin-top: 16px;

    :deep(.ant-card-body) {
      padding-top: 10px;
    }

    :deep(.ant-image-img) {
      width: 100px;
      height: 100px;
    }

    :deep(.ant-btn-link) {
      color: var(--er-primary);
    }
  }
}
</style>
