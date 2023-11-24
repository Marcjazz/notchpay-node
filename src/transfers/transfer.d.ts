import { Business, PaymentChannel } from '../type'

export type TransferChannel = Exclude<PaymentChannel, 'card'>
export type InitializeTransferPayload = {
  /** Currency of transaction. */
  currency: string
  /** Amount to be transferred. According to currency. */
  amount: number
  /** The reason of transfer. */
  description: string
  /** Payment channel to make a payment with.*/
  channel: TransferChannel
  /** Beneficiary parameters according to channel */
  beneficiary: {
    /** Orange money or MTN number to receive funds */
    phone: string
  }
  reference?: string
}

export type Channel = {
  name: string
  type: string
  id: TransferChannel
}

export type Receiver = {
  number: string
}

export type Beneficiary = {
  id: string
  phone: string
  name: null | string
  email: null | string
  country: string
  channel: Channel
  receiver: Receiver
}

export type Transfer = {
  amount: number
  amount_total: number
  fee: number
  converted_amount: number
  business: Business
  beneficiary: Beneficiary
  description: string
  reference: string
  status: string
  currency: string
  initiated_at: string
  updated_at: string
}

export type TransferResponse = {
  status: string
  message: string
  code: number
  transfer: Transfer
}
