import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

// Placeholder data — we will replace this with real API data later
const mockData = {
  customer: { name: 'Raheemat Arowolo', email: 'raheemat@example.com' },
  subscription: {
    plan: 'Premium',
    status: 'active',
    nextBillingDate: '2026-08-01',
    amount: 12000,
  },
  billingHistory: [
    { date: '2026-07-01', amount: 12000, status: 'success', method: 'webhook' },
    { date: '2026-06-01', amount: 12000, status: 'success', method: 'fallback' },
    { date: '2026-05-01', amount: 12000, status: 'failed', method: 'webhook' },
  ],
}

function Portal() {
  const { magicToken } = useParams()
  const navigate = useNavigate()
  const [subscription, setSubscription] = useState(mockData.subscription)
  const [showCancelConfirm, setShowCancelConfirm] = useState(false)
  const [showPauseConfirm, setShowPauseConfirm] = useState(false)

  const handlePause = () => {
    setSubscription({ ...subscription, status: 'paused' })
    setShowPauseConfirm(false)
  }

  const handleCancel = () => {
    setSubscription({ ...subscription, status: 'cancelled' })
    setShowCancelConfirm(false)
  }

  const statusColor = {
    active: 'bg-green-100 text-green-700',
    paused: 'bg-yellow-100 text-yellow-700',
    cancelled: 'bg-red-100 text-red-700',
  }

  const historyStatusColor = {
    success: 'text-green-600',
    failed: 'text-red-500',
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-green-600">Tella</h1>
        <p className="text-sm text-gray-500">Member Portal</p>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-10 space-y-6">

        {/* Welcome */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Welcome, {mockData.customer.name}</h2>
          <p className="text-gray-500 text-sm">{mockData.customer.email}</p>
        </div>

        {/* Subscription Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-700">Current Subscription</h3>
            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusColor[subscription.status]}`}>
              {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
            </span>
          </div>
          <p className="text-3xl font-bold text-gray-800 mb-1">{subscription.plan} Plan</p>
          <p className="text-gray-500 text-sm mb-6">
            ₦{subscription.amount.toLocaleString()}/month · Next billing: {subscription.nextBillingDate}
          </p>

          {/* Actions */}
          {subscription.status === 'active' && (
            <div className="flex gap-3">
              <button
                onClick={() => setShowPauseConfirm(true)}
                className="flex-1 border border-yellow-400 text-yellow-600 py-2 rounded-xl text-sm font-semibold hover:bg-yellow-50 transition"
              >
                Pause Subscription
              </button>
              <button
                onClick={() => setShowCancelConfirm(true)}
                className="flex-1 border border-red-400 text-red-500 py-2 rounded-xl text-sm font-semibold hover:bg-red-50 transition"
              >
                Cancel Subscription
              </button>
            </div>
          )}

          {subscription.status === 'paused' && (
            <p className="text-sm text-yellow-600">Your subscription is paused. You will not be billed until you resume.</p>
          )}

          {subscription.status === 'cancelled' && (
            <p className="text-sm text-red-500">Your subscription has been cancelled.</p>
          )}
        </div>

        {/* Billing History */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="font-semibold text-gray-700 mb-4">Billing History</h3>
          <div className="space-y-3">
            {mockData.billingHistory.map((entry, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div>
                  <p className="text-gray-700 font-medium">{entry.date}</p>
                  <p className="text-gray-400 text-xs">Resolved via {entry.method}</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-700 font-semibold">₦{entry.amount.toLocaleString()}</p>
                  <p className={`text-xs font-semibold ${historyStatusColor[entry.status]}`}>
                    {entry.status.charAt(0).toUpperCase() + entry.status.slice(1)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Pause Confirm Modal */}
      {showPauseConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center px-6">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl">
            <h4 className="font-bold text-gray-800 mb-2">Pause subscription?</h4>
            <p className="text-gray-500 text-sm mb-6">You won't be billed while paused. You can resume anytime.</p>
            <div className="flex gap-3">
              <button onClick={() => setShowPauseConfirm(false)} className="flex-1 border border-gray-200 text-gray-500 py-2 rounded-xl text-sm">Cancel</button>
              <button onClick={handlePause} className="flex-1 bg-yellow-400 text-white py-2 rounded-xl text-sm font-semibold">Yes, Pause</button>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Confirm Modal */}
      {showCancelConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center px-6">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl">
            <h4 className="font-bold text-gray-800 mb-2">Cancel subscription?</h4>
            <p className="text-gray-500 text-sm mb-6">This will end your membership at the end of the current billing period.</p>
            <div className="flex gap-3">
              <button onClick={() => setShowCancelConfirm(false)} className="flex-1 border border-gray-200 text-gray-500 py-2 rounded-xl text-sm">Go Back</button>
              <button onClick={handleCancel} className="flex-1 bg-red-500 text-white py-2 rounded-xl text-sm font-semibold">Yes, Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Portal