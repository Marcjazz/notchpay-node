import { FindAllResponse } from '../types'

export type CreateCustomerPayload<T extends object = object> = {
  /**
   * The email address of the customer is prominently displayed within your dashboard,
   * and serves as a valuable tool for both search and tracking purposes.
   * Please note that this field allows for up to 512 characters.
   */
  email: string
  /**
   * The customer’s full name or business name.
   */
  name?: string
  /**
   * The customer’s phone number.
   */
  phone?: string
  /**
   * The customer description.
   * Please note that this field allows for up to 256 characters.
   */
  description?: string
  /**
   * A collection of key/value pairs that can be attached to a customer
   * for the purpose of storing additional information in a structured format.
   * @type can be predefined and passed as a generic type
   */
  meta?: T
  /**
   * The customer’s address.
   */
  address?: Address
  /**
   * The customer’s shipping information. Appears on invoices emailed to this customer.
   */
  shipping?: Address
}

export type Customer<T> = CreateCustomerPayload<T> & {
  id: string
  email: string
  /** This value is true when API is in test mode */
  sandbox: boolean
  /** Indicates wheter or not a customer is blocked
   *  @default false
   */
  blocked: boolean
  name: null | string
  phone: null | string
}

export type CustomerResponse<T> = {
  code: number
  status: string
  message: string
  customer: Customer<T>
}

export type CustomersResponse<T> = FindAllResponse<Customer<T>>

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
