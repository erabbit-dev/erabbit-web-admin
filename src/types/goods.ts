import type { AuditState, EditState, IsRemark, State, ValueHasPicture } from './enums'

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

export type Attribution = {
  dataType: 'backend' | 'frontend'
  id: string
  name: string
  logo: string
  nameEn: string
  relegationId: string
}

/**
 * 商品属性信息
 */
export type GoodsProperties = {
  otherProperties: OtherProperties[] | null
  saleProperties: SaleProperties[] | null
}
/**
 * 基础属性组信息
 */
export type OtherProperties = {
  id: string
  name: string
  properties: SaleProperties[]
}

/**
 * 属性信息
 */
export type SaleProperties = {
  id: string
  name: string
  groupName: string
  values: PropertyValue[]
  isRemark: IsRemark
  valueHasPicture: ValueHasPicture
}
/**
 * 属性值
 */
export type PropertyValue = {
  id: string
  valueName: string
  valuePicture?: { id: string; url: string }
  remark?: string
}
