import { AxiosInstance } from 'axios'
import {
  InitializeTransferPayload,
  TransferResponse,
  TransfersResponse,
} from './transfer'

export default class TranfersApi {
  constructor(private readonly axiosInstance: AxiosInstance) {}

  async initialize(
    payload: InitializeTransferPayload,
    secretKey?: string
  ): Promise<TransferResponse> {
    const merchantSecretKey =
      secretKey ?? this.axiosInstance.defaults.headers['Grant-Authorization']
    if (!merchantSecretKey) throw new Error('Merchant Secret key is required')
    const resp = await this.axiosInstance.post<TransferResponse>(
      `/transfers/initialize`,
      payload,
      { headers: { 'Grant-Authorization': merchantSecretKey } }
    )
    return resp.data
  }

  async findOne(
    transferRef: string,
    currency?: string
  ): Promise<TransferResponse> {
    const resp = await this.axiosInstance.get<TransferResponse>(
      `/transfers/${transferRef}`,
      { params: { currency } }
    )
    return resp.data
  }

  async findAll(perpage?: number, page?: number): Promise<TransfersResponse> {
    const resp = await this.axiosInstance.get<TransfersResponse>(`/transfers`, {
      params: { perpage, page },
    })
    return resp.data
  }
}
