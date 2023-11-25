import NotchPayApi from '../src/index'

const notchPayApi = new NotchPayApi({
  endpoint: 'api.notchpay.co',
  publicKey: 'sb.MplYCLvoRMzeY1xRjAXtV7jt1mnrcVmS',
  secretKey: 'sb.MplYCLvoRMzeY1xRjAXtV7jt1mnrcVmS',
})

test('Should return `HelloResponse`', async () => {
  const data = await notchPayApi.getHello()
  expect(data).toEqual({
    env: expect.any(String),
    code: expect.any(Number),
    message: expect.any(String),
    merchant: expect.any(String),
    greeting: expect.any(String),
  })
  expect(data.greeting).toBe('Hello from Notch Pay')
})

test('Should initialize payment', async () => {
  const data = await notchPayApi.payments.initialize({
    amount: 500,
    currency: 'XAF',
    phone: '+237691622731',
  })
  expect(data).toHaveProperty('code', 201)
  expect(data).toHaveProperty('transaction')
  expect(data).toHaveProperty('status', 'Accepted')
  expect(data).toHaveProperty('message', 'Payment initialized')
})

test('Should get all payments', async () => {
  const data = await notchPayApi.payments.getPayments(10, 1)
  expect(data).toHaveProperty('code', 200)
  expect(data).toHaveProperty('status', 'OK')
  expect(data).toHaveProperty('message', 'Payments retrieved')
  expect(data).toHaveProperty('totals')
  expect(data).toHaveProperty('last_page')
  expect(data).toHaveProperty('current_page', 1)
  expect(Array.isArray(data.items)).toBeTruthy()
})

test('Should complete initialized payment', async () => {
  const { items } = await notchPayApi.payments.getPayments(1, 1)
  const paymentRef = items.find((item) => item.status === 'pending')?.reference
  if (paymentRef) {
    const data = await notchPayApi.payments.completePayment(paymentRef, {
      channel: 'cm.orange',
      data: { phone: '+237691622731' },
    })
    expect(data).toHaveProperty('code', 202)
    expect(data).toHaveProperty('action', 'confirm')
    expect(data).toHaveProperty('status', 'Accepted')
    expect(data).toHaveProperty(
      'message',
      'Confirm your transaction by dialing #150#'
    )
  }
})

test('Should cancel payment', async () => {
  const { items } = await notchPayApi.payments.getPayments()
  const paymentRef = items.find((item) => item.status !== 'complete')?.reference
  if (paymentRef) {
    const data = await notchPayApi.payments.cancelPayment(paymentRef)
    expect(data).toHaveProperty('code', 202)
    expect(data).toHaveProperty('message', 'Your transaction has been canceled')
  }
})
