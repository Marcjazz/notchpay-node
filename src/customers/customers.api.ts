import { AxiosInstance } from 'axios'
import { CreateCustomerPayload, Customer, CustomerResponse } from './customers'

export class CustomersApi {
  constructor(private readonly axiosInstance: AxiosInstance) {}

  async create<T extends object>(payload: CreateCustomerPayload<T>) {
    const resp = await this.axiosInstance.post<CustomerResponse<T>>(
      '/customers',
      payload
    )
    return { ...resp.data, code: Number(resp.data.code) }
  }
}
