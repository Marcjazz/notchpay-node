import * as crypto from 'crypto'
import { AxiosInstance } from 'axios'
import { Request, Response } from 'express'
import { EventType, NotchPayEvent } from '../types'
import { NotchPayCallback } from './webhook'

export class WebhooksService {
  constructor(private axiosInstance: AxiosInstance) {}

  /**
   * Verify incoming request to confirmed they were fowarded to you by notch pay server
   * @param request Express request object
   * @param secretKey Notch pay merchant secret key
   * @returns Notch pay verified event object or undefined
   */
  verifySignature<T>(request: Request, secretKey?: string) {
    const merchantSecretKey =
      secretKey ??
      (this.axiosInstance.defaults.headers['Grant-Authorization'] as string)
    if (!merchantSecretKey) throw new Error('Merchant Secret key is required')
    const signature = crypto
      .createHmac('sha256', merchantSecretKey)
      .update(JSON.stringify(request.body))
      .digest('hex')
    if (signature === request.headers['x-noth-signature']) {
      return request.body as NotchPayEvent<T>
    }
  }

  /**
   * Notch Pay event webhooks handler
   * @param request Express.js request
   * @param response Express.js response
   * @param callbacks Object of your callback functions
   * @param secretKey Your Notch Pay secret key
   * @returns Express.js response
   */
  async handleEvent<T>(
    request: Request,
    response: Response,
    callbacks: Partial<Record<EventType, NotchPayCallback<T>>>,
    secretKey?: string
  ) {
    const merchantSecretKey =
      secretKey ??
      (this.axiosInstance.defaults.headers['Grant-Authorization'] as string)
    if (!merchantSecretKey) throw new Error('Merchant Secret key is required')

    const eventObj = this.verifySignature<T>(request, merchantSecretKey)
    if (!eventObj) throw new Error('❌ Signature verification failed !!!')
    const { id, event, data } = eventObj
    const callback = callbacks[event]
    if (callback) await callback(id, data as T)
    return response.status(200).json({
      code: 200,
      status: 'OK',
      message: 'Webhook handled successfully.',
    })
  }
}
