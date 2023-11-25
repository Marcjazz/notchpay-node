import { AxiosInstance } from 'axios'
import { NotchPayErrorResponse } from '../type'
import {
  CompletePaymentPayload,
  CompletePaymentResponse,
  InitializePaymentPayload,
  PaymentResponse,
  PaymentsResponse,
} from './payment'

export class PaymentsApi {
  constructor(private readonly axiosInstance: AxiosInstance) {}

  async initialize(payload: InitializePaymentPayload) {
    const resp = await this.axiosInstance
      .post<PaymentResponse>('/payments/initialize', payload)
      .catch((error) => error.response as NotchPayErrorResponse)
    return { ...resp.data, code: Number(resp.data.code) }
  }

  async findOne(paymentRef: string, currency?: string) {
    const resp = await this.axiosInstance.get<PaymentResponse>(
      `/payments/${paymentRef}`,
      { params: { currency } }
    )
    return { ...resp.data, code: Number(resp.data.code) }
  }

  async findAll(perpage?: number, page?: number) {
    const resp = await this.axiosInstance.get<PaymentsResponse>(`/payments`, {
      params: { perpage, page },
    })
    return { ...resp.data, code: Number(resp.data.code) }
  }

  async complete(paymentRef: string, payload: CompletePaymentPayload) {
    const resp = await this.axiosInstance
      .put<CompletePaymentResponse>(`/payments/${paymentRef}`, payload)
      .catch((error) => error.response as NotchPayErrorResponse)
    return { ...resp.data, code: Number(resp.data.code) }
  }

  async cancel(paymentRef: string) {
    const resp = await this.axiosInstance
      .delete<{
        code: number
        message: string
      }>(`/payments/${paymentRef}`)
      .catch((error) => error.response as NotchPayErrorResponse)
    return { ...resp.data, code: Number(resp.data.code) }
  }
}
