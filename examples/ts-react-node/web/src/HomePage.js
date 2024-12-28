import React, { useState } from 'react'

const MobileMoneyPaymentForm = () => {
  const [formData, setFormData] = useState({
    phone: '',
    amount: '',
    email: '',
    currency: 'XAF',
    callback: "http://localhost:3000/callback"
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Replace this with Mobile Money API integration logic
    console.log('Mobile Money Payment Submitted:', formData)
    fetch(`http://localhost:8080/api/payments/new`, {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
      .then(async (data) => {
        const {data: payment} = await data.json()
        console.log(payment)
        window.open(payment.authorization_url, '_self')
      })
      .catch((error) => console.log(error))
    alert(
      `Payment of ${formData.amount} initiated to ${formData.phone} in ${formData.currency}`
    )
  }

  return (
    <div
      style={{
        maxWidth: '400px',
        margin: '50px auto',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <h2>Mobile Money Payment</h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
      >
        <label>
          Phone Number:
          <input
            type='tel'
            name='phone'
            value={formData.phone}
            onChange={handleChange}
            required
            pattern='\d{9,12}'
            title='Enter a valid phone number'
            placeholder='e.g., 677123456'
            style={{ padding: '8px', width: '100%' }}
          />
        </label>
        <label>
          Email:
          <input
            type='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            required
            min='1'
            style={{ padding: '8px', width: '100%' }}
          />
        </label>
        <label>
          Amount:
          <input
            type='number'
            name='amount'
            value={formData.amount}
            onChange={handleChange}
            required
            min='1'
            style={{ padding: '8px', width: '100%' }}
          />
        </label>
        <label>
          Currency:
          <select
            name="currency"
            value={formData.currency}
            onChange={handleChange}
            required
            style={{ padding: "8px", width: "105%" }}
          >
            <option value="XAF">XAF</option>
            <option value="RWF">RWF</option>
            <option value="XOF">XOF</option>
          </select>
        </label>
        <button
          type='submit'
          style={{
            padding: '10px',
            backgroundColor: '#007BFF',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            width: "105%"
          }}
        >
          Pay Now
        </button>
      </form>
    </div>
  )
}

export default MobileMoneyPaymentForm
