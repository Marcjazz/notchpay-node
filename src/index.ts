import axios, { AxiosInstance } from 'axios'
import * as crypto from 'crypto'
import { Request } from 'express'
import { MiscellaneousApi } from './miscellaneous/miscellaneous.api'
import { PaymentsApi } from './payments/payments.api'
import TransferApi from './transfers/transfers.api'
import { HelloResponse, NotchPayConfig, NotchPayEvent } from './types'

export type * from './types'

let axiosInstance: AxiosInstance
export default class NotchPayApi {
  payments: PaymentsApi
  transfers: TransferApi
  miscellaneous: MiscellaneousApi

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

  /**
   * Verify incoming request to confirmed they were fowarded to you by notch pay server
   * @param request Express request object
   * @param secretKey Notch pay merchant secret key
   * @returns Notch pay verified event object or undefined
   */
  verifySignature<T>(request: Request, secretKey?: string) {
    const merchantSecretKey =
      secretKey ??
      (axiosInstance.defaults.headers['Grant-Authorization'] as string)
    if (!merchantSecretKey) throw new Error('Merchant Secret key is required')
    const signature = crypto
      .createHmac('sha256', merchantSecretKey)
      .update(JSON.stringify(request.body))
      .digest('hex')
    if (signature === request.headers['x-noth-signature']) {
      return request.body as NotchPayEvent<T>
    }
  }
}
