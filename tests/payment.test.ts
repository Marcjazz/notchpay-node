import { notchPayApi } from './setup'

test('Should initialize payment', async () => {
  const data = await notchPayApi.payments
    .initialize({
      amount: 500,
      currency: 'XAF',
      phone: '+237691622731',
    })
    .catch((error) => console.log(error.response?.data))
  expect(data).toBeDefined()
  expect(data).toHaveProperty('code', 201)
  expect(data).toHaveProperty('transaction')
  expect(data).toHaveProperty('status', 'Accepted')
  expect(data).toHaveProperty('message', 'Payment initialized')
})

test('Should get all payments', async () => {
  const data = await notchPayApi.payments.findAll(10, 1)
  expect(data).toHaveProperty('code', 200)
  expect(data).toHaveProperty('status', 'OK')
  expect(data).toHaveProperty('message', 'Payments retrieved')
  expect(data).toHaveProperty('totals')
  expect(data).toHaveProperty('last_page')
  expect(data).toHaveProperty('current_page', 1)
  expect(Array.isArray(data.items)).toBeTruthy()
})

test('Should complete initialized payment', async () => {
  const initializePayment = await notchPayApi.payments
    .initialize({
      amount: 500,
      currency: 'XAF',
      phone: '+237691622731',
    })
    .catch((error) => {
      console.log(error.response?.data)
      return null
    })
  expect(initializePayment).not.toBeNull()
  const data = await notchPayApi.payments
    .complete(initializePayment?.transaction.reference as string, {
      channel: 'cm.mobile',
      data: { phone: '+237691622731' },
    })
    .catch((error) => console.log(error.response?.data))

  expect(data).toBeDefined()
  expect(data).toHaveProperty('code', 202)
  expect(data).toHaveProperty('action', 'confirm')
  expect(data).toHaveProperty('status', 'Accepted')
  expect(data).toHaveProperty(
    'message',
    'Confirm your transaction by dialing #150*50#'
  )
})

test('Should cancel payment', async () => {
  const { items } = await notchPayApi.payments.findAll()
  const paymentRef = items.find((item) => item.status !== 'complete')?.reference
  if (paymentRef) {
    const data = await notchPayApi.payments
      .cancel(paymentRef)
      .catch((error) => console.log(error.response?.data))
    expect(data).toBeDefined()
    expect(data).toHaveProperty('code', 202)
    expect(data).toHaveProperty('message', 'Your transaction has been canceled')
  }
})
