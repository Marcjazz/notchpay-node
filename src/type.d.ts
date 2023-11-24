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
