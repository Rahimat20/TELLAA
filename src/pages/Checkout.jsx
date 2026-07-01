import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const planDetails = {
  basic: { name: 'Basic', price: 35000 },
  premium: { name: 'Premium', price: 52000 },
}

function Checkout() {
  const { planId } = useParams()
  const navigate = useNavigate()
  const plan = planDetails[planId]

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.phone) {
      alert('Please fill in all fields')
      return
    }
    // We will connect this to the backend later
    console.log('Submitting:', form, planId)
    navigate('/confirming/test-transaction-123')
  }

  if (!plan) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Invalid plan selected.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-green-600">Tella</h1>
        <p className="text-sm text-gray-500">Powered by Nomba</p>
      </div>

      <div className="max-w-lg mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Complete your subscription</h2>
        <p className="text-gray-500 mb-8">You are subscribing to the <span className="font-semibold text-green-600">{plan.name}</span> plan at ₦{plan.price.toLocaleString()}/month</p>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Raheemat Arowolo"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="08012345678"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="pt-2">
            <p className="text-xs text-gray-400 mb-4">Card payment will be handled securely by Nomba on the next step.</p>
            <button
              onClick={handleSubmit}
              className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition"
            >
              Continue to Payment →
            </button>
          </div>
        </div>

        <button
          onClick={() => navigate('/')}
          className="mt-6 text-sm text-gray-400 hover:text-gray-600 transition"
        >
          ← Back to plans
        </button>
      </div>
    </div>
  )
}

export default Checkout