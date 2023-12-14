const express = require('express')
const dotenv = require('dotenv')
const { randomUUID } = require('crypto')
const { NotchPay } = require('../../cjs')

// Load environment variables from .env file
dotenv.config()
const port = process.env.APP_PORT
const publicKey = process.env.NOTCHPAY_PUBLIC_KEY
const privateKey = process.env.NOTCHPAY_PRIVATE_KEY

const app = express()
app.use(express.json())

const notchPay = new NotchPay({
  publicKey,
  secretKey: privateKey,
  endpoint: 'api.notchpay.co',
})
app.get('/payments', async (req, res) => {
  const { perpage, page } = req.query
  const payments = await notchPay.payments.findAll(perpage, page)
  res.status(200).json({ message: 'Payments retrieved', data: payments })
})

app.post('/payments/new', async (req, res) => {
  const { amount, currency, phone } = req.body
  //We will skip validation as this is not a real server
  try {
    const payment = await notchPay.payments.initialize({
      phone,
      amount,
      currency,
      reference: randomUUID(),
    })
    res.status(201).json({ message: 'Payment created', data: payment })
  } catch (error) {
    const notchPayError = error?.response.data
    return res.status(500).json(notchPayError)
  }
})

app.post('/webhooks', (req, res) => {
  const completePaymentCallback = (eventId, data) => {
    console.log(`✔️ NotchPay event ${eventId} was received`)
    if (data.status === 'complete')
      console.log(
        `✅ The payment of ${data.amount} ${data.currency} with reference ${data.reference}, 
              was successfully initiated at ${data.initiated_at} and completed at ${data.updated_at}`
      )
  }
  const failedPaymentCallback = (eventId, data) => {
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
