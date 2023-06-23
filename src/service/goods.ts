import type { GoodsItem, GoodsSearchParams } from '@/types/goods'
import { requestPost } from '@/utils/request'

export const getGoodsPageService = (params: Partial<GoodsSearchParams>) =>
  requestPost<{
    counts: number
    pageSize: number
    pages: number
    page: number
    items: GoodsItem[]
  }>(`/goods/page`, params)
