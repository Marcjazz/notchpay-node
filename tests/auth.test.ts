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
    code: expect.any(String),
    message: expect.any(String),
    merchant: expect.any(String),
    greeting: expect.any(String),
  })
  expect(data.greeting).toBe('Hello from Notch Pay')
})
