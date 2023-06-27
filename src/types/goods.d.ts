import type { State } from '@/enums'

export type StateMap = Record<State, string>

export type GoodsSearchParams = {
  id: string
  name: string
  backendId: string
  minPrice: number
  maxPrice: number
  minSalesCount: number
  maxSalesCount: number
  state: State
  auditState: AuditState

  page: number
  pageSize: number
}

export type GoodsItem = {
  id: string
  name: string
  picture: string
  price: number
  inventory: number
  salesCount: number
  state: State
  createTime: string
  publishTime: string
  updateTime: string
  deleteTime: string
  creator: { id: string; name: string }
  spuCode: string
  auditState: AuditState
  editState: EditState
}

export type ClassifyTree = {
  id: string
  name: string
  children: {
    id: string
    name: string
    children: {
      id: string
      name: string
    }[]
  }[]
}[]
