import NotchPayApi from '../src'
describe('Hello NotchPay Test', () => {
  let notchPayApi: NotchPayApi

  test('should use environment variables', () => {
    const publicKey = process.env.NOTCHPAY_PUBLIC_KEY
    const privateKey = process.env.NOTCHPAY_PRIVATE_KEY

    expect(publicKey).toBeDefined()
    expect(privateKey).toBeDefined()
    notchPayApi = new NotchPayApi({
      endpoint: 'api.notchpay.co',
      publicKey: publicKey as string,
      secretKey: privateKey as string,
    })
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
})
