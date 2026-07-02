const express = require('express')
const router = express.Router()
const pool = require('../db')
const axios = require('axios')
const crypto = require('crypto')
const getNombaToken = require('../nombaAuth')

function generateMagicToken() {
  return crypto.randomBytes(32).toString('hex')
}

router.post('/', async (req, res) => {
  const { name, email, phone, planId } = req.body

  const plans = {
    basic: { name: 'Basic', amount: '5000.00' },
    premium: { name: 'Premium', amount: '12000.00' },
  }

  const plan = plans[planId]
  if (!plan) {
    return res.status(400).json({ error: 'Invalid plan' })
  }

  try {
    // 1. Create or find customer
    let customerResult = await pool.query(
      'SELECT * FROM customers WHERE email = $1',
      [email]
    )

    let customer = customerResult.rows[0]

    if (!customer) {
      const newCustomer = await pool.query(
        'INSERT INTO customers (name, email, phone) VALUES ($1, $2, $3) RETURNING *',
        [name, email, phone]
      )
      customer = newCustomer.rows[0]
    }

    // 2. Create subscription
    const nextBillingDate = new Date()
    nextBillingDate.setMonth(nextBillingDate.getMonth() + 1)

    const subscriptionResult = await pool.query(
      `INSERT INTO subscriptions (customer_id, plan, status, next_billing_date, amount)
       VALUES ($1, $2, 'pending', $3, $4) RETURNING *`,
      [customer.id, plan.name, nextBillingDate, parseFloat(plan.amount)]
    )

    const subscription = subscriptionResult.rows[0]

    // 3. Generate magic token
    const magicToken = generateMagicToken()
    const magicTokenExpiry = new Date()
    magicTokenExpiry.setHours(magicTokenExpiry.getHours() + 24)

    // 4. Create transaction record
    const orderReference = `tella-${Date.now()}`

    const transactionResult = await pool.query(
      `INSERT INTO transactions (subscription_id, amount, status, magic_token, magic_token_expires_at, nomba_reference)
       VALUES ($1, $2, 'pending', $3, $4, $5) RETURNING *`,
      [subscription.id, parseFloat(plan.amount), magicToken, magicTokenExpiry, orderReference]
    )

    const transaction = transactionResult.rows[0]

    // 5. Get Nomba access token
    const accessToken = await getNombaToken()

    // 6. Build order object
    const orderPayload = {
      order: {
        orderReference: orderReference,
        customerId: customer.id.toString(),
        callbackUrl: process.env.NGROK_URL + '/webhooks/nomba',
        customerEmail: email,
        amount: plan.amount,
        currency: 'NGN',
        accountId: process.env.NOMBA_ACCOUNT_ID,
        allowedPaymentMethods: ['Card', 'Transfer'],
        orderMetaData: {
          productName: plan.name + ' Gym Membership',
        }
      },
      tokenizeCard: 'true'
    }

    console.log('Sending to Nomba:', JSON.stringify(orderPayload, null, 2))

    // 7. Call Nomba Checkout API
    const nombaResponse = await axios.post(
      'https://api.nomba.com/v1/checkout/order',
      orderPayload,
      {
        headers: {
          'Authorization': 'Bearer ' + accessToken,
          'Content-Type': 'application/json',
          'accountId': process.env.NOMBA_ACCOUNT_ID,
        }
      }
    )

    console.log('Nomba response:', nombaResponse.data)

    res.json({
      transactionId: transaction.id,
      checkoutUrl: nombaResponse.data.data.checkoutLink,
      reference: orderReference,
    })

  } catch (err) {
    console.error('Checkout error:', err.response?.data || err.message)
    res.status(500).json({ error: 'Checkout failed', details: err.response?.data || err.message })
  }
})

module.exports = router