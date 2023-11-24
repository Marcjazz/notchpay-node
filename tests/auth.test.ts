import NotchPayApi from '../src/index'

const notchPayApi = new NotchPayApi({
  endpoint: 'api.notchpay.co',
  publicKey: 'sb.MplYCLvoRMzeY1xRjAXtV7jt1mnrcVmS',
  secretKey: 'sb.MplYCLvoRMzeY1xRjAXtV7jt1mnrcVmS',
})

test('Should return `HelloResponse`', async () => {
  const data = await notchPayApi.getHello()
  expect(data).toHaveProperty('env')
  expect(data).toHaveProperty('code')
  expect(data).toHaveProperty('message')
  expect(data).toHaveProperty('greeting')
  expect(data).toHaveProperty('merchant')
  expect(data.greeting).toBe('Hello from Notch Pay')
})