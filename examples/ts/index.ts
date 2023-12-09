import { randomUUID } from 'crypto'
import dotenv from 'dotenv'
import express, { Request, Response } from 'express'
import NotchPay, { InitializePaymentPayload } from '../../src'

// Load environment variables from .env file
dotenv.config()
const port = process.env.APP_PORT
const publicKey = process.env.NOTCHPAY_PUBLIC_KEY as string
const privateKey = process.env.NOTCHPAY_PRIVATE_KEY as string

const app = express()
app.use(express.json())

const notchPay = new NotchPay({
  publicKey,
  secretKey: privateKey,
  endpoint: 'api.notchpay.co',
})

app.get('/payments', async (req: Request, res: Response) => {
  const { perpage, page } = req.query as { perpage?: number; page?: number }
  const payments = await notchPay.payments.findAll(perpage, page)
  res.status(200).json({ message: 'Payments retrieved', data: payments })
})

app.post('/payments/new', async (req: Request, res: Response) => {
  const { amount, currency, phone, email } =
    req.body as InitializePaymentPayload
  if (!phone && !email)
    res.status(422).json({
      code: '422',
      status: 'Unprocessable Content',
      message:
        'The email field is required when phone is not present. (and 2 more errors)',
    })
  // We will skip validation as this is not a real server
  try {
    const payment = await notchPay.payments.initialize({
      email,
      amount,
      currency,
      phone: phone as string,
      reference: randomUUID(),
    })
    res.status(201).json({ message: 'Payment created', data: payment })
  } catch (error) {
    const notchPayError = error?.response?.data
    return res.status(500).json(notchPayError)
  }
})

app.post('/webhooks', (req: Request, res: Response) => {
  const completePaymentCallback = (eventId: string, data: any) => {
    console.log(`✔️ NotchPay event ${eventId} was received`)
    if (data.status === 'complete')
      console.log(
        `✅ The payment of ${data.amount} ${data.currency} with reference ${data.reference}, 
              was successfully initiated at ${data.initiated_at} and completed at ${data.updated_at}`
      )
  }

  const failedPaymentCallback = (eventId: string, data: any) => {
    console.log(`✔️ NotchPay event ${eventId} was received`)
    if (data.status === 'failed')
      console.log(
        `❌ The payment of ${data.amount} ${data.currency} with reference ${data.reference}, 
              was not successfully terminated !`
      )
  }

  return notchPay.webhooks.handleEvent(req, res, {
    'payment.complete': completePaymentCallback,
    'payment.failed': failedPaymentCallback,
  })
})

app.listen(port, () => {
  console.log(`🚀 Server listening at http://localhost:${port}`)
})
