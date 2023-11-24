import { AxiosInstance } from 'axios'
import { InitializePaymentPayload, PaymentResponse } from './payment'

export class PaymentsApi {
  constructor(private readonly axiosInstance: AxiosInstance) {
    this.axiosInstance.defaults.baseURL = `${this.axiosInstance.defaults.baseURL}/payments`
  }

  async initialize(
    payload: InitializePaymentPayload
  ): Promise<PaymentResponse> {
    const {
      data: {
        transaction: { updated_at, initiated_at, ...transaction },
        ...data
      },
    } = await this.axiosInstance.post<PaymentResponse>('/initialize', payload)
    return {
      ...data,
      transaction: {
        ...transaction,
        updated_at: new Date(updated_at),
        initiated_at: new Date(initiated_at),
      },
    }
  }
}
