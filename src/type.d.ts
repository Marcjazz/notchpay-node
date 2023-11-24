export type NotchPayConfig = {
  endpoint: 'api.notchpay.co'
  publicKey: string
  secretKey?: string
}

export type HelloResponse = {
  env: string
  code: string
  message: string
  greeting: string
  merchant: string
}
