const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()

require('./db')

const authRoutes = require('./routes/auth')
const webhookRoutes = require('./routes/webhooks')
const checkoutRoutes = require('./routes/checkout')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/auth', authRoutes)
app.use('/webhooks', webhookRoutes)
app.use('/checkout', checkoutRoutes)

app.get('/', (req, res) => {
  res.json({ message: 'Tella server is running' })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log('Tella server running on port ' + PORT)
})