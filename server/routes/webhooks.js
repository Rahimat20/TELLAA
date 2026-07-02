const express = require('express')
const router = express.Router()
const pool = require('../db')

router.post('/nomba', async (req, res) => {
  try {
    console.log('Webhook received from Nomba:', req.body)

    const { reference, status } = req.body

    if (!reference) {
      return res.status(400).json({ error: 'No reference provided' })
    }

    // Map Nomba status to our status
    const resolvedStatus = status === 'successful' ? 'success' : 'failed'

    // Update transaction in database
    await pool.query(
      `UPDATE transactions 
       SET status = $1, resolution_method = 'webhook' 
       WHERE nomba_reference = $2`,
      [resolvedStatus, reference]
    )

    console.log('Transaction updated via webhook:', reference, resolvedStatus)

    // Respond with 200 so Nomba knows we received it
    res.status(200).json({ received: true })

  } catch (err) {
    console.error('Webhook error:', err)
    res.status(500).json({ error: 'Server error' })
  }
})

module.exports = router