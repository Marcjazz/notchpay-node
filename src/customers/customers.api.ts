import { AxiosInstance } from 'axios'
import { CreateCustomerPayload, Customer, CustomerResponse, CustomersResponse } from './customers'

export class CustomersApi {
  constructor(private readonly axiosInstance: AxiosInstance) {}

  async create<T extends object>(payload: CreateCustomerPayload<T>) {
    const resp = await this.axiosInstance.post<CustomerResponse<T>>(
      '/customers',
      payload
    )
    return { ...resp.data, code: Number(resp.data.code) }
  }

  async update<T extends object>(payload: CreateCustomerPayload<T>) {
    const resp = await this.axiosInstance.put<CustomerResponse<T>>(
      '/customers',
      payload
    )
    return { ...resp.data, code: Number(resp.data.code) }
  }

  async findOne<T extends object>(customerId: string) {
    const resp = await this.axiosInstance.get<CustomerResponse<T>>(
      `/customers/${customerId}`
    )
    return { ...resp.data, code: Number(resp.data.code) }
  }

  async findAll<T extends object>(customerId: string) {
    const resp = await this.axiosInstance.get<CustomersResponse<T>>(
      `/customers/${customerId}`
    )
    return { ...resp.data, code: Number(resp.data.code) }
  }
}
