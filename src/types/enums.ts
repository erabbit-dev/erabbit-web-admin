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

/**
 * 是否备注，0为备注，1为不备注
 */
export enum IsRemark {
  Yes = 0,
  No = 1
}
/**
 * 是否传图，0为否，1为是
 */
export enum ValueHasPicture {
  No = 0,
  Yes = 1
}
