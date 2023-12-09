import { createHmac, randomUUID } from 'crypto'
import { Request, Response } from 'express'
import NotchPay, { NotchPayCallback, NotchPayEvent, Transaction } from '../src'

describe('NotchPay Webhook Test', () => {
  let publicKey: string
  let privateKey: string
  let notchPayApi: NotchPay

  beforeAll(() => {
    publicKey = process.env.NOTCHPAY_PUBLIC_KEY as string
    privateKey = process.env.NOTCHPAY_PRIVATE_KEY as string
    expect(publicKey).toBeDefined()
    expect(privateKey).toBeDefined()

    notchPayApi = new NotchPay({
      publicKey,
      secretKey: privateKey,
      endpoint: 'api.notchpay.co',
    })
  })

  test('Should handle web hooks', async () => {
    const mockedEvent: NotchPayEvent<Transaction> = {
      id: randomUUID(),
      event: 'payment.complete',
      data: {
        amount: 200,
        currency: 'XAF',
        sandbox: true,
        status: 'complete',
        initiated_at: new Date(),
        updated_at: new Date(Date.now() * 3000),
        reference: randomUUID(),
      } as Transaction,
    }

    const req = {
        headers: {
          'x-noth-signature': createHmac('sha256', privateKey)
            .update(JSON.stringify(mockedEvent))
            .digest('hex'),
        } as Request['headers'],
        body: mockedEvent,
      } as Request,
      res = {
        status: jest.fn((code: number) => res) as Function,
        json: jest.fn() as Function,
      } as Response

    const myCallback: NotchPayCallback<Transaction> = jest.fn(
      (eventId, data) => {
        console.log(`✔️ NotchPay event ${eventId} was received`)
        if (data.status === 'complete')
          console.log(
            `✅ The payment of ${data.amount} ${data.currency} with reference ${data.reference}, 
            was successfully initiated at ${data.initiated_at} and completed at ${data.updated_at}`
          )
      }
    )

    await notchPayApi.webhooks.handleEvent(req, res, {
      'payment.complete': myCallback,
    })

    expect(res.json).toHaveBeenCalled()
    expect(res.status).toHaveBeenCalledWith(200)
    expect(myCallback).toHaveBeenCalledWith(mockedEvent.id, mockedEvent.data)
  })
})
