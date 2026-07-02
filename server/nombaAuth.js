const axios = require('axios')

let cachedToken = null
let tokenExpiry = null

async function getNombaToken() {
  if (cachedToken && tokenExpiry && Date.now() < tokenExpiry) {
    return cachedToken
  }

  const response = await axios.post(
    'https://api.nomba.com/v1/auth/token/issue',
    {
      grant_type: 'client_credentials',
      client_id: process.env.NOMBA_CLIENT_ID,
      client_secret: process.env.NOMBA_PRIVATE_KEY,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'accountId': process.env.NOMBA_ACCOUNT_ID,
      }
    }
  )

  cachedToken = response.data.data.access_token
  tokenExpiry = new Date(response.data.data.expiresAt).getTime() - 60000
  
  console.log('Nomba token obtained successfully')
  return cachedToken
}

module.exports = getNombaToken