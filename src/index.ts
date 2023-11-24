import axios, { AxiosInstance } from 'axios'
import { HelloResponse, NotchPayConfig } from './type'

export default class NotchPayApi {
  axiosInstance: AxiosInstance
  constructor(config: NotchPayConfig) {
    this.axiosInstance = axios.create({
      baseURL: `https://${config.endpoint}`,
      headers: {
        Authorization: config.publicKey,
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
}
