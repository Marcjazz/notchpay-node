# [![npm version](https://www.notchpay.co/favicon-32x32.png)](https://www.notchpay.co/favicon-32x32.png) Notchpay NPM Package 
Notch Pay JavaScript sdk for easy payment services integrations

This project serves as a Node Package Manager (NPM) Library designed for Notch Pay. The primary objective of this package is to accelerate the integration process of Notch payment APIs for Node developers. Our aim is to empower developers to concentrate on their end goals, while we handle the intricacies on their behalf.

## Installation

To install the Notch Pay Node.js package, use npm:

```bash
npm install notchpay-api
```
## Configurations
Configure your Notch Pay API keys easily either through environment variables or directly within your application.
```bash
export NOTCHPAY_PUBLIC_KEY=your_public_key
export NOTCHPAY_PRIVATE_KEY=your_private_key
```
## Features
This package offers a comprehensive solution for seamlessly integrating Notch Pay APIs, covering essential functionalities grouped into distinct modules:
- **Payment APIs:** Streamline Notch Pay payment integration with a user-friendly TypeScript and JavaScript function call signature.
- **Transfer APIs:** Facilitate seamless transfer handling through Notch Pay with dedicated TypeScript and JavaScript functions, ensuring a smooth integration experience.
- **MIscellaneous APIs:** Access various Notch Pay functionalities effortlessly using TypeScript and JavaScript function call signatures, providing a unified and intuitive interface.
- **Webhooks:** Simplify webhook implementation with a single function call, enhancing developer efficiency in setup and management.

## Usage
Integrating Notch Pay into your Node.js application is as easy as importing the NotchPay class and accessing the desired API functionalities:
```typescript
// Your application code
import { NotchPay, NotchPayConfig } from 'notch-pay-api';

const notchPayConfig: NotchPayConfig = {
  endpoint: 'api.notchpay.co',
  publicKey: 'your_public_key',
  secretKey: 'your_secret_key',
};

const notchPay = new NotchPay(notchPayConfig);

// Now, you can use the notchPay instance to make API requests
notchPay.payments
  .initialize({
    amount: 500,
    currency: 'XAF',
    phone: '+237691622731',
  })
  .then(response => {
    // Handle the payment response
    console.log(response);
  })
  .catch(error => {
    // Handle errors
    console.error(error);
  });
```
### Webhooks handling made easy
Handle notchpay webhooks event just by passing your callback handler to the desired event
```typescript
app.post('/webhooks', (req: Request, res: Response) => {
  const completePaymentCallback = (eventId: string, data: any) => {
    console.log(`✔️ NotchPay completed payment event ${eventId} was received`)
  }

  const failedPaymentCallback = (eventId: string, data: any) => {
    console.log(`✔️ NotchPay failed payment event ${eventId} was received`)
  }

  return notchPay.webhooks.handleEvent(req, res, {
    'payment.complete': completePaymentCallback,
    'payment.failed': failedPaymentCallback,
  })
})
```

## Tests
To ensure the reliability of the library, run the included test suite with the following command:
```bash
npm test
```
Note that Test will failed if API keys are not provided correctly

## Contributions
Contributions are welcome! If you find any issues or have suggestions for improvement, please open an issue or create a pull request.

## License
This project is licensed under the MIT License - see the [LICENSE](https://github.com/Marcjazz/notchpay-node/blob/master/LICENSE) file for details.
