import { AxiosInstance } from 'axios'
import {
    CompletePaymentPayload,
    CompletePaymentResponse,
    InitializePaymentPayload,
    PaymentResponse,
    PaymentsResponse,
} from './payment'

export class PaymentsApi {
  constructor(private readonly axiosInstance: AxiosInstance) {}

  async initialize(
    payload: InitializePaymentPayload
  ): Promise<PaymentResponse> {
    const resp = await this.axiosInstance.post<PaymentResponse>(
      '/payments/initialize',
      payload
    )
    return resp.data
  }

  async findOne(
    paymentRef: string,
    currency?: string
  ): Promise<PaymentResponse> {
    const resp = await this.axiosInstance.get<PaymentResponse>(
      `/payments/${paymentRef}`,
      { params: { currency } }
    )
    return resp.data
  }

  async findAll(perpage?: number, page?: number) {
    const resp = await this.axiosInstance.get<PaymentsResponse>(`/payments`, {
      params: { perpage, page },
    })
    return resp.data
  }

  async complete(paymentRef: string, payload: CompletePaymentPayload) {
    const resp = await this.axiosInstance.put<CompletePaymentResponse>(
      `/payments/${paymentRef}`,
      payload
    )
    return resp.data
  }

  async cancel(paymentRef: string) {
    const resp = await this.axiosInstance.delete<{
      code: number
      message: string
    }>(`/payments/${paymentRef}`)
    return resp.data
  }
}
