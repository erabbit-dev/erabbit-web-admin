import { State } from '@/types/enums'
import type {
  Attribution,
  ClassifyTree,
  GoodsItem,
  GoodsProperties,
  GoodsSearchParams
} from '@/types/goods'
import { requestDelete, requestGet, requestPost, requestPut } from '@/utils/request'
import type { Key } from 'ant-design-vue/es/table/interface'

export const getGoodsPageService = (params: Partial<GoodsSearchParams>) =>
  requestPost<{
    counts: number
    pageSize: number
    pages: number
    page: number
    items: GoodsItem[]
  }>(`/goods/page`, params)

export const getClassifyTreeService = () => requestGet<ClassifyTree>('/classification/backend/tree')

export const batchDeleteGoodsService = (ids: Key[]) => requestDelete('/goods/batch', ids)

export const batchDownGoodsService = (ids: Key[]) =>
  requestPut('/goods/shelf/batch', { ids, state: State.InWarehouse })

export const updateGoodsStateService = (id: Key, state: State.OnSale | State.InWarehouse) =>
  requestPut(`/goods/${id}/shelf`, { state })

export const getClassifyListService = (classifyId: string = '') =>
  requestGet<Attribution[]>('/goods/attribution', { backendId: classifyId })

export const getGoodsService = (id: string) => requestGet<GoodsItem>(`/goods/v2/${id}`)

export const saveGoodsService = (data: Record<string, any>) => requestPost('/goods', data)

export const getPropertiesService = (backendId: string) =>
  requestGet<GoodsProperties>('/goods/v2/properties', { backendId })
