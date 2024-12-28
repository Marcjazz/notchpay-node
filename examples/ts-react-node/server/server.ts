import { randomUUID } from 'crypto'
import dotenv from 'dotenv'
import express, { Request, Response } from 'express'
import NotchPay from 'notchpay-api'
import cors from 'cors'
import Joi from 'joi'

// Load environment variables from .env file
dotenv.config()
const port = process.env.APP_PORT || 8080
const publicKey = process.env.NOTCHPAY_PUBLIC_KEY as string
const privateKey = process.env.NOTCHPAY_PRIVATE_KEY as string

if (!publicKey || !privateKey) {
  throw new Error('NotchPay keys are missing in environment variables')
}

const app = express()
app.use(
  cors({
    origin: 'http://localhost:3000', // React server URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    credentials: true, // Allow cookies if needed
  })
)
// parse application/json
app.use(express.json())

const notchPay = new NotchPay({
  publicKey,
  secretKey: privateKey,
  endpoint: 'api.notchpay.co',
})

app.get('/api/payments/:paymentRef', async (req: Request, res: Response) => {
  const { paymentRef } = req.params
  try {
    const payment = await notchPay.payments.findOne(paymentRef)
    res.status(200).json({ message: 'Payment retrieved', data: payment })
  } catch (error: any) {
    const notchPayError = error?.response?.data
    res.status(500).json(notchPayError)
  }
})

app.get('/api/payments', async (req: Request, res: Response) => {
  const { perpage, page } = req.query as { perpage?: number; page?: number }
  try {
    const payments = await notchPay.payments.findAll(perpage, page)
    res.status(200).json({ message: 'Payments retrieved', data: payments })
  } catch (error: any) {
    const notchPayError = error?.response?.data
    res.status(500).json(notchPayError)
  }
})

app.post('/api/payments/new', async (req: Request, res: Response) => {
  const paymentSchema = Joi.object({
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    amount: Joi.number().required(),
    currency: Joi.string().required(),
    callback: Joi.string().required(),
  })

  const result = paymentSchema.validate(req.body ?? {})
  if (result.error) {
    res.status(422).json({ message: result.error.details[0].message })
    return
  }

  const { amount, currency, phone, email, callback } = req.body
  // We will skip validation as this is not a real server
  try {
    const payment = await notchPay.payments.initialize({
      email,
      amount,
      currency,
      phone,
      callback,
      reference: randomUUID(),
    })
    res.status(201).json({ message: 'Payment created', data: payment })
  } catch (error: any) {
    const notchPayError = error?.response?.data
    res.status(500).json(notchPayError)
  }
})

app.post('/api/webhooks', (req, res) => {
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

  notchPay.webhooks.handleEvent(req as any, res as any, {
    'payment.complete': completePaymentCallback,
    'payment.failed': failedPaymentCallback,
  })
})

app.listen(port, () => {
  console.log(`🚀 Server listening at http://localhost:${port}`)
})
