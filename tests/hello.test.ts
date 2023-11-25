import { notchPayApi } from './setup'

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


