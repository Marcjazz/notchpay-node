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
}

export type Customer<T> = CreateCustomerPayload<T> & {
  id: string
  email: string
  sandbox: boolean
  blocked: boolean
  name: null | string
  phone: null | string
  description: null | string
  meta: null | T
}

export type CustomerResponse<T> = {
  code: number
  status: string
  message: string
  customer: Customer<T>
}

export type CustomersResponse<T> = FindAllResponse<Customer<T>>
