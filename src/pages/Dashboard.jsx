import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// Placeholder data — we will replace with real API data later
const mockTransactions = [
  { id: 'TXN001', customer: 'Raheemat Arowolo', plan: 'Premium', amount: 12000, status: 'success', method: 'webhook', date: '2026-07-01' },
  { id: 'TXN002', customer: 'Amina Yusuf', plan: 'Basic', amount: 5000, status: 'success', method: 'fallback', date: '2026-07-01' },
  { id: 'TXN003', customer: 'Fatima Bello', plan: 'Premium', amount: 12000, status: 'failed', method: 'webhook', date: '2026-06-30' },
  { id: 'TXN004', customer: 'Zainab Musa', plan: 'Basic', amount: 5000, status: 'success', method: 'fallback', date: '2026-06-30' },
  { id: 'TXN005', customer: 'Hauwa Garba', plan: 'Premium', amount: 12000, status: 'pending', method: '-', date: '2026-06-29' },
]

const statusColor = {
  success: 'bg-green-100 text-green-700',
  failed: 'bg-red-100 text-red-700',
  pending: 'bg-yellow-100 text-yellow-700',
}

function Dashboard() {
  const navigate = useNavigate()
  const [role, setRole] = useState(null)

  useEffect(() => {
    const storedRole = localStorage.getItem('tellaRole')
    if (!storedRole) {
      navigate('/login')
    } else {
      setRole(storedRole)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('tellaRole')
    navigate('/login')
  }

  const totalRevenue = mockTransactions
    .filter((t) => t.status === 'success')
    .reduce((sum, t) => sum + t.amount, 0)

  const resolvedByFallback = mockTransactions.filter(
    (t) => t.method === 'fallback' && t.status === 'success'
  ).length

  if (!role) return null

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-green-600">Tella</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500 capitalize">{role} account</span>
          <button
            onClick={handleLogout}
            className="text-sm text-red-400 hover:text-red-600 transition"
          >
            Log out
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10 space-y-8">

        {/* Owner-only stats */}
        {role === 'owner' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <p className="text-sm text-gray-400 mb-1">Total Revenue</p>
              <p className="text-3xl font-bold text-green-600">₦{totalRevenue.toLocaleString()}</p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <p className="text-sm text-gray-400 mb-1">Successful Payments</p>
              <p className="text-3xl font-bold text-gray-800">
                {mockTransactions.filter((t) => t.status === 'success').length}
              </p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <p className="text-sm text-gray-400 mb-1">Recovered via Fallback</p>
              <p className="text-3xl font-bold text-gray-800">{resolvedByFallback}</p>
              <p className="text-xs text-gray-400 mt-1">Payments that would have been missed</p>
            </div>
          </div>
        )}

        {/* Transactions Table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="font-semibold text-gray-700 mb-6">Recent Transactions</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-400 border-b border-gray-100">
                  <th className="pb-3 font-medium">Reference</th>
                  <th className="pb-3 font-medium">Customer</th>
                  <th className="pb-3 font-medium">Plan</th>
                  <th className="pb-3 font-medium">Amount</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Resolved via</th>
                  <th className="pb-3 font-medium">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {mockTransactions.map((txn) => (
                  <tr key={txn.id}>
                    <td className="py-3 font-mono text-gray-500">{txn.id}</td>
                    <td className="py-3 text-gray-700">{txn.customer}</td>
                    <td className="py-3 text-gray-600">{txn.plan}</td>
                    <td className="py-3 text-gray-700 font-medium">₦{txn.amount.toLocaleString()}</td>
                    <td className="py-3">
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${statusColor[txn.status]}`}>
                        {txn.status.charAt(0).toUpperCase() + txn.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-3 text-gray-400">{txn.method}</td>
                    <td className="py-3 text-gray-400">{txn.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Dashboard