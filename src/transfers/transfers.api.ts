import { AxiosInstance } from 'axios'
import { InitializeTransferPayload, TransferResponse } from './transfer'

export default class TranfersApi {
  constructor(private readonly axiosInstance: AxiosInstance) {}

  async initialize(
    payload: InitializeTransferPayload
  ): Promise<TransferResponse> {
    const resp = await this.axiosInstance.post<TransferResponse>(
      `/transfers/initialize`,
      payload
    )
    return resp.data
  }
}
