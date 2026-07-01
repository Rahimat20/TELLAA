import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Checkout from './pages/Checkout'
import Confirming from './pages/Confirming'
import PaymentResult from './pages/PaymentResult'
import Portal from './pages/Portal'
import ResendLink from './pages/ResendLink'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/checkout/:planId" element={<Checkout />} />
        <Route path="/confirming/:transactionId" element={<Confirming />} />
        <Route path="/payment-result" element={<PaymentResult />} />
        <Route path="/portal/:magicToken" element={<Portal />} />
        <Route path="/portal/resend" element={<ResendLink />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App