import crypto from 'crypto'
import { Request } from 'express'
import axios, { AxiosInstance } from 'axios'
import { HelloResponse, NotchPayConfig, NotchPayEvent } from './type'
import { PaymentsApi } from './payments/payments.api'
import TransferApi from './transfers/transfers.api'
export default class NotchPayApi {
  payments: PaymentsApi
  transfers: TransferApi
  axiosInstance: AxiosInstance
  constructor(private config: NotchPayConfig) {
    this.axiosInstance = axios.create({
      baseURL: `https://${config.endpoint}`,
      headers: {
        Authorization: config.publicKey,
        'Grant-Authorization': config.secretKey,
      },
    })
    this.payments = new PaymentsApi(this.axiosInstance)
    this.transfers = new TransferApi(this.axiosInstance)
  }

  /**
   * Ping Notch Pay server,
   * This endpoint allows you to retrieve your merchant information's.
   */
  async getHello(): Promise<HelloResponse> {
    const {
      data: { code, ...data },
    } = await this.axiosInstance.get<HelloResponse>('/')
    return { code: Number(code), ...data }
  }

  /**
   * Verify incoming request to confirmed they were fowarded to you by notch pay server
   * @param request Express request object
   * @param secretKey Notch pay merchant secret key
   * @returns Notch pay verified event object or undefined
   */
  verifySignature<T>(request: Request, secretKey?: string) {
    const merchantSecretKey = secretKey ?? this.config.secretKey
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
