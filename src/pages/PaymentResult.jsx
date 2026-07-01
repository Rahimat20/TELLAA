import { useNavigate, useSearchParams } from 'react-router-dom'

function PaymentResult() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const status = searchParams.get('status') // 'success' or 'failed'

  const isSuccess = status === 'success'

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 max-w-md w-full text-center">
        
        {/* Icon */}
        <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${isSuccess ? 'bg-green-100' : 'bg-red-100'}`}>
          <span className="text-4xl">{isSuccess ? '✓' : '✕'}</span>
        </div>

        {/* Title */}
        <h2 className={`text-2xl font-bold mb-3 ${isSuccess ? 'text-green-600' : 'text-red-500'}`}>
          {isSuccess ? 'Payment Successful!' : 'Payment Failed'}
        </h2>

        {/* Message */}
        <p className="text-gray-500 mb-8">
          {isSuccess
            ? 'Your subscription is now active. Check your email for your access link to manage your membership.'
            : 'We could not confirm your payment. Please try again or contact support if you were debited.'}
        </p>

        {/* Actions */}
        {isSuccess ? (
          <button
            onClick={() => navigate('/')}
            className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition"
          >
            Back to Home
          </button>
        ) : (
          <div className="space-y-3">
            <button
              onClick={() => navigate('/')}
              className="w-full bg-red-500 text-white py-3 rounded-xl font-semibold hover:bg-red-600 transition"
            >
              Try Again
            </button>
            <button
              onClick={() => navigate('/portal/resend')}
              className="w-full border border-gray-200 text-gray-500 py-3 rounded-xl font-semibold hover:bg-gray-50 transition"
            >
              Request Access Link
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default PaymentResult