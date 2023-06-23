/**
 * 商品状态，1为出售中，2为仓库中，3为已售罄，4为回收站，5为历史宝贝
 */
export enum State {
  All = 0,
  OnSale = 1,
  InWarehouse = 2,
  SoldOut = 3,
  Recycle = 4,
  History = 5
}

export type StateMap = Record<State, string>

/**
 * 编辑状态，0为草稿，1为提交
 */
export enum EditState {
  Draft = 0,
  Submit = 1
}

/**
 * 商品审核状态，1为待审核，2为审核通过，3为驳回
 */
export enum AuditState {
  Pending = 1,
  Pass = 2,
  Reject = 3
}

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
