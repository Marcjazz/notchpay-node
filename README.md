# [![npm version](https://www.notchpay.co/favicon-32x32.png)](https://www.notchpay.co/favicon-32x32.png) Notchpay NPM Package 
Notch Pay JavaScript sdk for easy payment services integrations

This project serves as a Node Package Manager (NPM) Library designed for Notch Pay. The primary objective of this package is to accelerate the integration process of Notch payment APIs for Node developers. Our aim is to empower developers to concentrate on their end goals, while we handle the intricacies on their behalf.

## Installation (comming soon)

To install the Notch Pay Node.js package, use npm:

```bash
npm install notch-pay
```

## Features
Strongly typed and validated request and response interfaces.
Abstracts the complexity of integrating Notch Pay, allowing developers to focus on their application objectives.

## Usage
Integrating Notch Pay into your Node.js application is as easy as importing the NotchPay class and accessing the desired API functionalities:
```typescript
// Your application code
import { NotchPay, NotchPayConfig } from 'notch-pay';

const notchPayConfig: NotchPayConfig = {
  endpoint: 'api.notchpay.co',
  publicKey: 'your_public_key',
  secretKey: 'your_secret_key',
};

const notchPay = new NotchPay(notchPayConfig);

// Now, you can use the notchPay instance to make API requests
notchPay.payments.initialize(/* paymentDetails */)
  .then(response => {
    // Handle the payment response
    console.log(response);
  })
  .catch(error => {
    // Handle errors
    console.error(error);
  });
```
## Tests
To ensure the reliability of the library, run the included test suite with the following command:
```bash
npm test
```
## Contributions
Contributions are welcome! If you find any issues or have suggestions for improvement, please open an issue or create a pull request.

## License
This project is licensed under the MIT License - see the [LICENSE](https://github.com/Marcjazz/notchpay-node/LICENSE) file for details.
