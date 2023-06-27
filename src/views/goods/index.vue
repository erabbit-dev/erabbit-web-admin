<script setup lang="tsx">
import { State } from '@/enums'
import {
  batchDeleteGoodsService,
  batchDownGoodsService,
  getClassifyTreeService,
  getGoodsPageService,
  updateGoodsStateService
} from '@/service/goods'
import {
  type ClassifyTree,
  type GoodsItem,
  type GoodsSearchParams,
  type StateMap
} from '@/types/goods'
import { DownOutlined, UpOutlined } from '@ant-design/icons-vue'
import { Modal, message } from 'ant-design-vue'
import type { ColumnsType, TablePaginationConfig } from 'ant-design-vue/es/table'
import type { Key, TableRowSelection } from 'ant-design-vue/es/table/interface'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

// 搜索区域展示

const expand = ref(true)

const stateMap: StateMap = {
  0: '全部',
  1: '出售中',
  2: '仓库中',
  3: '已售罄',
  4: '回收站',
  5: '历史宝贝'
}

const defParams = {
  id: undefined,
  name: undefined,
  backendId: undefined,
  minPrice: undefined,
  maxPrice: undefined,
  minSalesCount: undefined,
  maxSalesCount: undefined,
  state: State.All,

  page: 1,
  pageSize: 10
}
const params = ref<Partial<GoodsSearchParams>>({ ...defParams })

const activeKey = computed({
  get: () => String(params.value.state),
  set: (val) => {
    params.value.state = Number(val)
  }
})

const classifyOptions = ref<ClassifyTree>([])
const classifyFieldNames = {
  label: 'name',
  value: 'id'
}
const getClassifyTree = async () => {
  const res = await getClassifyTreeService()
  classifyOptions.value = res.data
}
const classifyIds = ref<string[]>()

const onSearch = () => {
  params.value.page = 1
  params.value.backendId = classifyIds.value?.[classifyIds.value.length - 1]
  getGoodsPage()
}
const onRest = () => {
  params.value.page = 1
  params.value = { ...defParams }
  classifyIds.value = []
  getGoodsPage()
}

// 表格数据展示

const avatar = 'https://avatar.vercel.sh/allen.svg?text=暂无图片'

const router = useRouter()

const getBtnText = (state: State) => {
  let btnText = ''
  if (state === State.InWarehouse) btnText = '上架'
  if (state === State.OnSale) btnText = '下架'
  return btnText
}

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
    width: 120,
    fixed: 'right',
    customRender: ({ record }: { record: GoodsItem }) => {
      const btnText = getBtnText(record.state)
      return (
        <>
          <a-button type="link" size="small" onClick={() => router.push(`/goods/${record.id}`)}>
            编辑
          </a-button>
          {btnText && (
            <a-button
              type="link"
              size="small"
              onClick={() => onUpdateStateGoods(record.id, record.state)}
            >
              {btnText}
            </a-button>
          )}
        </>
      )
    }
  }
]

const total = ref(0)
const pagination = computed(() => ({
  total: total.value,
  current: params.value.page,
  pageSize: params.value.pageSize
}))

const goodsList = ref<GoodsItem[]>([])
const loading = ref(false)
const getGoodsPage = async () => {
  loading.value = true
  const res = await getGoodsPageService(params.value)
  goodsList.value = res.data.items
  total.value = res.data.counts
  loading.value = false
}

const onPageChange = (result: TablePaginationConfig) => {
  params.value.page = result.current
  params.value.pageSize = result.pageSize
  getGoodsPage()
}

onMounted(() => {
  getGoodsPage()
  getClassifyTree()
})

// 操作
const goodsIds = ref<Key[]>([])

const rowSelection: TableRowSelection<GoodsItem> = {
  selectedRowKeys: goodsIds as unknown as Key[],
  onChange: (selectedRowKeys: Key[]) => {
    goodsIds.value = selectedRowKeys
  }
}

const onBatchDeleteGoods = () => {
  Modal.confirm({
    title: '温馨提示',
    content: '您您确认删除所选择的商品吗？',
    onOk() {
      return batchDeleteGoodsService(goodsIds.value).then(() => {
        message.success('批量删除成功')
        goodsIds.value = []
        getGoodsPage()
      })
    },
    okText: '确认'
  })
}

const onBatchDownGoods = () => {
  Modal.confirm({
    title: '温馨提示',
    content: '您确认下架所选择的商品吗？',
    onOk() {
      return batchDownGoodsService(goodsIds.value).then(() => {
        message.success('批量下架成功')
        goodsIds.value = []
        getGoodsPage()
      })
    },
    okText: '确认'
  })
}

const onUpdateStateGoods = (id: string, state: State) => {
  const text = getBtnText(state)
  Modal.confirm({
    title: '温馨提示',
    content: `您确认${text}该商品吗？`,
    onOk() {
      return updateGoodsStateService(
        id,
        state === State.OnSale ? State.InWarehouse : State.OnSale
      ).then(() => {
        message.success(`${text}成功`)
        getGoodsPage()
      })
    },
    okText: '确认'
  })
}
</script>

<template>
  <div class="goods-page">
    <a-card class="search">
      <a-form>
        <a-row :gutter="24">
          <a-col :span="8">
            <a-form-item label="商品编号：">
              <a-input v-model:value="params.id"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="商品名称：">
              <a-input v-model:value="params.name"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="8" v-if="expand">
            <a-form-item label="所属类目：">
              <a-cascader
                v-model:value="classifyIds"
                :options="classifyOptions"
                :fieldNames="classifyFieldNames"
              ></a-cascader>
            </a-form-item>
          </a-col>
          <a-col :span="8" v-if="expand">
            <a-form-item label="价格区间：">
              <div class="range">
                <a-input-number
                  v-model:value="params.minPrice"
                  placeholder="最低价格"
                ></a-input-number>
                <span>-</span>
                <a-input-number
                  v-model:value="params.maxPrice"
                  placeholder="最高价格"
                ></a-input-number>
              </div>
            </a-form-item>
          </a-col>
          <a-col :span="8" v-if="expand">
            <a-form-item label="累计销量：">
              <div class="range">
                <a-input-number
                  v-model:value="params.minSalesCount"
                  placeholder="最低销量"
                ></a-input-number>
                <span>-</span>
                <a-input-number
                  v-model:value="params.maxSalesCount"
                  placeholder="最高销量"
                ></a-input-number>
              </div>
            </a-form-item>
          </a-col>
          <a-col :span="8" class="optional">
            <a-space>
              <a-button type="primary" ghost @click="onSearch" :loading="loading">搜索</a-button>
              <a-button @click="onRest">重置</a-button>
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
      <a-tabs v-model:activeKey="activeKey" @change="onSearch">
        <a-tab-pane v-for="(v, k) in stateMap" :key="k" :tab="v"></a-tab-pane>
        <template #rightExtra>
          <a-button type="primary">发布商品</a-button>
        </template>
      </a-tabs>
      <transition name="fade">
        <a-alert class="alert" v-if="goodsIds.length" :message="`已选择 ${goodsIds.length} 项`">
          <template #action>
            <a-space>
              <a-button size="small" type="link" ghost @click="onBatchDeleteGoods">
                批量删除
              </a-button>
              <a-button size="small" type="link" ghost @click="onBatchDownGoods">批量下架</a-button>
            </a-space>
          </template>
        </a-alert>
      </transition>
      <a-table
        row-key="id"
        :columns="columns"
        :data-source="goodsList"
        :row-selection="rowSelection"
        :scroll="{ x: 1200 }"
        :pagination="pagination"
        :loading="loading"
        @change="onPageChange"
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

    .range {
      display: flex;
      align-items: center;

      .ant-input-number {
        flex: 1;
      }

      span {
        padding: 0 10px;
      }
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

  .alert {
    margin-bottom: 16px;
    padding: 16px;
  }
}
</style>
