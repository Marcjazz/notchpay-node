import { AxiosInstance } from 'axios'
import { CountryApiResponse, CurrencyApiResponse } from './types'

export default class MiscellaneousApi {
  constructor(private readonly axiosInstance: AxiosInstance) {}

  async getCountries() {
    const resp = await this.axiosInstance.get<CountryApiResponse>(`/countries`)
    return resp.data
  }

  async getCurrencies() {
    const resp = await this.axiosInstance.get<CurrencyApiResponse>(
      `/currencies`
    )
    return resp.data
  }
}
