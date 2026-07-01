import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Hardcoded accounts — we will move this to the backend later
const ACCOUNTS = [
  { email: 'owner@kadgym.com', password: 'owner123', role: 'owner' },
  { email: 'staff@kadgym.com', password: 'staff123', role: 'staff' },
]

function Login() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = () => {
    const account = ACCOUNTS.find(
      (a) => a.email === form.email && a.password === form.password
    )

    if (!account) {
      setError('Invalid email or password. Please try again.')
      return
    }

    // Store role in localStorage temporarily — backend will handle this properly later
    localStorage.setItem('tellaRole', account.role)
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 max-w-md w-full">

        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-green-600">Tella</h1>
          <p className="text-gray-400 text-sm mt-1">Business Dashboard Login</p>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="owner@kadgym.com"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          <button
            onClick={handleSubmit}
            className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition mt-2"
          >
            Log In
          </button>
        </div>

        {/* Hint for judges/demo */}
        <div className="mt-8 bg-gray-50 rounded-xl p-4 text-xs text-gray-400 space-y-1">
          <p className="font-semibold text-gray-500">Demo credentials:</p>
          <p>Owner: owner@kadgym.com / owner123</p>
          <p>Staff: staff@kadgym.com / staff123</p>
        </div>
      </div>
    </div>
  )
}

export default Login