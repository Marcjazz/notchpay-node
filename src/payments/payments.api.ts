import { AxiosInstance } from 'axios'
import {
  InitializePaymentPayload,
  PaymentResponse,
  PaymentsResponse,
  Transaction,
} from './payment'

const formatTransaction = ({
  updated_at,
  initiated_at,
  ...transaction
}: Transaction) => {
  return {
    ...transaction,
    updated_at: new Date(updated_at),
    initiated_at: new Date(initiated_at),
  }
}

export class PaymentsApi {
  constructor(private readonly axiosInstance: AxiosInstance) {}

  async initialize(
    payload: InitializePaymentPayload
  ): Promise<PaymentResponse> {
    const {
      data: { transaction, ...data },
    } = await this.axiosInstance.post<PaymentResponse>(
      '/payments/initialize',
      payload
    )
    return {
      ...data,
      transaction: formatTransaction(transaction),
    }
  }

  async getPayment(
    paymentRef: string,
    currency?: string
  ): Promise<PaymentResponse> {
    const {
      data: { transaction, ...data },
    } = await this.axiosInstance.get<PaymentResponse>(
      `/payments/${paymentRef}`,
      { params: { currency } }
    )
    return {
      ...data,
      transaction: formatTransaction(transaction),
    }
  }

  async getPayments(perpage?: number, page?: number) {
    const {
      data: { items, ...data },
    } = await this.axiosInstance.get<PaymentsResponse>(`/payments`, {
      params: { perpage, page },
    })
    return {
      ...data,
      items: items.map((item) => formatTransaction(item)),
    }
  }
}
