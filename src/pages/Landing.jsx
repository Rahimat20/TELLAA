import { useNavigate } from 'react-router-dom'

function Landing() {
  const navigate = useNavigate()

  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      price: '₦35,000',
      period: 'month',
      features: ['Full gym access', 'Locker room access', 'Free parking'],
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '₦52,000',
      period: 'month',
      features: ['Full gym access', 'Locker room access', 'Free parking', 'Group classes', 'Personal trainer session'],
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-green-600">Tellaa</h1>
        <p className="text-sm text-gray-500">Powered by Nomba</p>
      </div>

      {/* Hero */}
      <div className="text-center py-16 px-6">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Kad Gym Memberships</h2>
        <p className="text-gray-500 text-lg">Choose a plan and get started today. Cancel anytime.</p>
      </div>

      {/* Plans */}
      <div className="max-w-4xl mx-auto px-6 pb-16 grid grid-cols-1 md:grid-cols-2 gap-8">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="bg-white rounded-2xl shadow-md p-8 flex flex-col justify-between border border-gray-100"
          >
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-1">{plan.name}</h3>
              <p className="text-3xl font-bold text-green-600 mb-6">
                {plan.price} <span className="text-base font-normal text-gray-400">/ {plan.period}</span>
              </p>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-gray-600">
                    <span className="text-green-500">✓</span> {feature}
                  </li>
                ))}
              </ul>
            </div>
            <button
              onClick={() => navigate(`/checkout/${plan.id}`)}
              className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition"
            >
              Get Started
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Landing