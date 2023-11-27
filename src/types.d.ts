export type NotchPayConfig = {
  endpoint: 'api.notchpay.co'
  publicKey: string
  secretKey?: string
}

export type HelloResponse = {
  env: string
  code: number
  message: string
  greeting: string
  merchant: string
}

export type EventType =
  | 'payment.complete'
  | 'payment.failed'
  | 'payment.canceled'
  | 'payment.expired'
  | 'transfer.sent'
  | 'transfer.failed'
  | 'transfer.complete'

export type NotchPayEvent<T> = {
  id: string
  event: EventType
  data: T extends object ? T : unknown
}

export type Business = {
  id: string
  country: string
  email: string
  phone: string
  poster: null | string
  name: string
}

export type Customer = {
  id: string
  name: null | string
  email: string
  sandbox: boolean
  phone: null | string
  blocked: boolean
}

export type PaymentChannel =
  | 'cm.mtn'
  | 'cm.orange'
  | 'cm.mobile'
  | 'paypal'
  | 'card'

export type Channel = {
  name: string
  type: string
  id: TransferChannel
}
export type TransferChannel = Exclude<PaymentChannel, 'card'>

export type FindAllResponse<Item> = {
  code: number
  status: string
  message: string
  totals: number
  last_page: number
  current_page: number
  selected: number
  items: Item[]
}

export type NotchPayError = {
  code: 401 | 403 | 404 | 406 | 409 | 422
  status: string
  message: string
  errors: object
}

export type NotchPayErrorResponse = { data: NotchPayError }

export * from './miscellaneous/miscellaneous.js'
export * from './payments/payment.js'
export * from './transfers/transfer.js'
