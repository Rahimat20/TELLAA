import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function ResendLink() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    if (!email) {
      alert('Please enter your email address')
      return
    }
    // We will connect this to the backend later
    console.log('Resending magic link to:', email)
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 max-w-md w-full text-center">

        {/* Icon */}
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-3xl">✉️</span>
        </div>

        {!submitted ? (
          <>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Resend Access Link</h2>
            <p className="text-gray-500 text-sm mb-8">
              Enter the email address you used when subscribing and we'll send you a fresh access link.
            </p>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 mb-4"
            />

            <button
              onClick={handleSubmit}
              className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition"
            >
              Send Access Link
            </button>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-green-600 mb-2">Check your inbox!</h2>
            <p className="text-gray-500 text-sm mb-8">
              If an account exists for <span className="font-semibold text-gray-700">{email}</span>, you'll receive an access link shortly.
            </p>
            <button
              onClick={() => navigate('/')}
              className="w-full border border-gray-200 text-gray-500 py-3 rounded-xl font-semibold hover:bg-gray-50 transition"
            >
              Back to Home
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default ResendLink