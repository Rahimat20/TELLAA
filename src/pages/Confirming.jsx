import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

function Confirming() {
  const { transactionId } = useParams()
  const navigate = useNavigate()
  const [dots, setDots] = useState('')

  // Animates the dots on "Confirming payment..."
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? '' : prev + '.'))
    }, 500)
    return () => clearInterval(interval)
  }, [])

  // Polling logic — we will connect this to the backend later
  useEffect(() => {
    const poll = setInterval(async () => {
      console.log('Polling for status of transaction:', transactionId)
      // Later: call GET /status/:transactionId and navigate based on result
      // navigate('/payment-result')
    }, 4000)
    return () => clearInterval(poll)
  }, [transactionId])

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6">
      {/* Spinner */}
      <div className="w-16 h-16 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mb-8"></div>

      <h2 className="text-2xl font-bold text-gray-800 mb-3">
        Confirming payment{dots}
      </h2>
      <p className="text-gray-500 text-center max-w-sm">
        Please do not close this page. We are verifying your payment with Nomba. This usually takes a few seconds.
      </p>

      <div className="mt-10 bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-4 text-sm text-gray-400">
        Transaction reference: <span className="font-mono text-gray-600">{transactionId}</span>
      </div>
    </div>
  )
}

export default Confirming