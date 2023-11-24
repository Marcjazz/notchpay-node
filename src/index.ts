import crypto from 'crypto'
import { Request } from 'express'
import axios, { AxiosInstance } from 'axios'
import { HelloResponse, NotchPayConfig, NotchPayEvent } from './type'
export default class NotchPayApi {
  axiosInstance: AxiosInstance
  constructor(private config: NotchPayConfig) {
    this.axiosInstance = axios.create({
      baseURL: `https://${config.endpoint}`,
      headers: {
        Authorization: config.publicKey,
        'Grant-Authorization': config.secretKey,
      },
    })
  }

  /**
   * Ping Notch Pay server,
   * This endpoint allows you to retrieve your merchant information's.
   */
  async getHello(): Promise<HelloResponse> {
    const resp = await this.axiosInstance.get('/')
    return resp.data
  }

  /**
   * Verify incoming request to confirmed they were fowarded to you by notch pay server
   * @param request Express request object
   * @param secretKey Notch pay merchant secret key
   * @returns Notch pay verified event object or undefined
   */
  verifySignature<T>(request: Request, secretKey?: string) {
    const merchantSecretKey = secretKey ?? this.config.secretKey
    if (!merchantSecretKey) throw new Error('Secret key must be provided')
    const signature = crypto
      .createHmac('sha256', merchantSecretKey)
      .update(JSON.stringify(request.body))
      .digest('hex')
    if (signature === request.headers['x-noth-signature']) {
      return request.body as NotchPayEvent<T>
    }
  }
}
