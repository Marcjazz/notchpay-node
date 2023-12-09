import axios, { AxiosInstance } from 'axios'

import MiscellaneousApi from './miscellaneous/miscellaneous.api'
import PaymentsApi from './payments/payments.api'
import TransferApi from './transfers/transfers.api'
import { HelloResponse, NotchPayConfig } from './types'
import { WebhooksService } from './webhooks/webhooks.service'

export type * from './types'

let axiosInstance: AxiosInstance
class NotchPay {
  payments: PaymentsApi
  transfers: TransferApi
  miscellaneous: MiscellaneousApi
  webhooks: WebhooksService

  constructor(config: NotchPayConfig) {
    axiosInstance = axios.create({
      baseURL: `https://${config.endpoint}`,
      headers: {
        Authorization: config.publicKey,
        'Grant-Authorization': config.secretKey,
      },
    })
    this.payments = new PaymentsApi(axiosInstance)
    this.transfers = new TransferApi(axiosInstance)
    this.miscellaneous = new MiscellaneousApi(axiosInstance)
    this.webhooks = new WebhooksService(axiosInstance)
  }

  /**
   * Ping Notch Pay server,
   * This endpoint allows you to retrieve your merchant information's.
   */
  async getHello(): Promise<HelloResponse> {
    const {
      data: { code, ...data },
    } = await axiosInstance.get<HelloResponse>('/')
    return { code: Number(code), ...data }
  }
}

export { NotchPay }
export default NotchPay
