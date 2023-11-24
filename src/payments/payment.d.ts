export type Item = {
  /** Description of the item. Required param */
  description: string
  /** Price of the item account to currency format. Required param */
  price: number
  /** Image of the item*/
  image: string
}

export type Address = {
  /** Please provide the name of the city, district, suburb, town, or village.*/
  city: string
  /** Address line 1 (e.g., street, PO Box, or company name) */
  line1: string
  /** Address line 2 (e.g., apartment, suite, unit, or building) */
  line2: string
  /** State, county, province, or region. */
  state: string
  /**Please provide the two-letter country code in accordance with ISO 3166-1 alpha-2 (https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) standard. */
  country: string
  /** ZIP or postal code */
  postal_code: string
}

export type InitializePaymentPayload<T extends object = unknown> = {
  /**The email address of the customer is prominently displayed within your dashboard, and serves as a valuable tool for both search and tracking purposes.
   * Please note that this field allows for up to 512 characters. */
  email?: string
  /** Currency of transaction. */
  currency: string
  /** Amount to be charged for the payment. According to currency. */
  amount: number
  /** The customer’s full name or business name. */
  name?: string
  /** The customer’s phone number. */
  phone?: string
  /** Valid URL */
  callback?: string
  /** The currency with which the payment information will be displayed to your customer. */
  locked_currency?: string
  /** Only the payment methods available for this country will be available on the payment page. */
  locked_country?: string
  /** The customer description. Please note that this field allows for up to 256 characters. */
  description?: string
  /** Unique reference for your payments */
  reference?: string
  /** A collection of key/value pairs that can be attached to a customer for the purpose of storing additional information in a structured format. */
  customer_meta?: T
  /** The customer’s address. */
  address?: Address
  /** The customer’s shipping information. Appears on invoices emailed to this customer. */
  shipping?: Address
  /** A collection of objects containing the item image, price and description*/
  items?: Item[]
} & ({ email: string } | { phone: string })

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

export type Transaction = {
  amount: number
  amount_total: number
  sandbox: boolean
  fee: number
  converted_amount: number
  business: Business
  customer: Customer
  description: string
  reference: string
  merchant_reference: string
  status: string
  currency: string
  initiated_at: Date
  updated_at: Date
}

export type PaymentResponse = {
  status: string
  message: string
  code: number
  transaction: Transaction
  /** Authorization url is only returned for initialize payment */
  authorization_url?: string
}

export type PaymentsResponse = {
  code: number
  status: string
  message: string
  totals: number
  last_page: number
  current_page: number
  selected: number
  items: Transaction[]
}
