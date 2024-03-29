export type OptionType = {
  id: string
  name: string
}

export type ClassifyDataItem = {
  options: OptionType[]
  loading: boolean
  item?: OptionType
}

export type PropertyItem = {
  values: string[]
  propertyName: string
}
