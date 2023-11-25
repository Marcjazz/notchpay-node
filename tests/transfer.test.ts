import { notchPayApi } from './setup'

test('Should initialize transfer', async () => {
  const data = await notchPayApi.transfers
    .initialize(
      {
        amount: 1500,
        currency: 'XAF',
        channel: 'cm.mobile',
        description: 'My first payout',
        beneficiary: {
          phone: '+237691622731',
        },
      },
      process.env.NOTCH_SECRET_KEY
    )
    .catch((error) => {
      console.log(error.response?.data)
    })
  expect(data).toBeDefined()
  expect(data).toHaveProperty('code', 201)
  expect(data).toHaveProperty('transfer')
  expect(data).toHaveProperty('status', 'Accepted')
  expect(data).toHaveProperty('message', 'Transfer initialized')
})

test('Should get all transfers', async () => {
  const data = await notchPayApi.transfers.findAll(10, 1).catch((error) => {
    console.log(error.response?.data)
  })
  expect(data).toBeDefined()
  expect(data).toHaveProperty('code', 200)
  expect(data).toHaveProperty('status', 'OK')
  expect(data).toHaveProperty('message', 'Transfers retrieved')
  expect(data).toHaveProperty('totals')
  expect(data).toHaveProperty('last_page')
  expect(data).toHaveProperty('current_page', 1)
  expect(Array.isArray(data?.items)).toBeTruthy()
})
