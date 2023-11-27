export type MiscellaneousApiResponse<T> = {
  code: number
  status: string
  message: string
  data: T[]
}

export type Currency = {
  name: string
  code: string
  fraction: number
  symbol: string
}

export type Country = {
  name: string
  code: string
}

export type CountryApiResponse = MiscellaneousApiResponse<Country>
export type CurrencyApiResponse = MiscellaneousApiResponse<Currency>
