import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const PAYMENT_METHODS = [
  {
    id: 'card',
    label: 'Credit / Debit Card',
    icon: '💳',
    desc: 'Visa, Mastercard, RuPay & more',
  },
  {
    id: 'upi',
    label: 'UPI',
    icon: '📱',
    desc: 'Google Pay, PhonePe, Paytm, BHIM',
  },
  {
    id: 'netbanking',
    label: 'Net Banking',
    icon: '🏦',
    desc: 'All major Indian banks supported',
  },
  {
    id: 'wallet',
    label: 'Wallet',
    icon: '👛',
    desc: 'Paytm Wallet, Amazon Pay, Mobikwik',
  },
  {
    id: 'cod',
    label: 'Cash on Delivery',
    icon: '💵',
    desc: 'Pay with cash when your order arrives',
  },
]

const BANKS = [
  'State Bank of India', 'HDFC Bank', 'ICICI Bank', 'Axis Bank',
  'Kotak Mahindra Bank', 'Bank of Baroda', 'Punjab National Bank',
  'Canara Bank', 'Union Bank of India', 'Yes Bank',
]

const WALLETS = ['Paytm Wallet', 'Amazon Pay', 'Mobikwik', 'Freecharge', 'Ola Money']

export default function PaymentPage() {
  const { cartItems, cartTotal, clearCart } = useCart()
  const navigate = useNavigate()

  const [selectedMethod, setSelectedMethod] = useState('')
  const [error, setError] = useState('')

  /* ── Card fields ── */
  const [card, setCard] = useState({ number: '', name: '', expiry: '', cvv: '' })

  /* ── UPI field ── */
  const [upiId, setUpiId] = useState('')

  /* ── Net Banking ── */
  const [bank, setBank] = useState('')

  /* ── Wallet ── */
  const [wallet, setWallet] = useState('')

  /* ─── empty cart guard ─── */
  if (cartItems.length === 0) {
    return (
      <main style={{ maxWidth: '600px', margin: '60px auto', padding: '24px', textAlign: 'center' }}>
        <div style={{ fontSize: '64px', marginBottom: '16px' }}>🛒</div>
        <h2 style={{ color: 'var(--text-h)', marginBottom: '12px' }}>Your cart is empty</h2>
        <button className="se-btn-primary" onClick={() => navigate('/products')}>← Go Shopping</button>
      </main>
    )
  }

  /* ─── validation & place order ─── */
  function handlePlaceOrder() {
    if (!selectedMethod) {
      setError('Please select a payment method to continue.')
      return
    }
    if (selectedMethod === 'card') {
      if (!card.number.trim() || card.number.replace(/\s/g, '').length < 16) {
        setError('Enter a valid 16-digit card number.')
        return
      }
      if (!card.name.trim()) { setError('Enter the cardholder name.'); return }
      if (!card.expiry.trim() || !/^\d{2}\/\d{2}$/.test(card.expiry)) {
        setError('Enter expiry in MM/YY format.')
        return
      }
      if (!card.cvv.trim() || card.cvv.length < 3) {
        setError('Enter a valid CVV.')
        return
      }
    }
    if (selectedMethod === 'upi') {
      if (!upiId.trim() || !upiId.includes('@')) {
        setError('Enter a valid UPI ID (e.g. name@upi).')
        return
      }
    }
    if (selectedMethod === 'netbanking') {
      if (!bank) { setError('Please select your bank.'); return }
    }
    if (selectedMethod === 'wallet') {
      if (!wallet) { setError('Please select a wallet.'); return }
    }

    setError('')
    if (typeof clearCart === 'function') clearCart()
    navigate('/order-success')
  }

  /* ─── card number formatter ─── */
  function formatCardNumber(val) {
    return val.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim()
  }

  /* ─── expiry formatter ─── */
  function formatExpiry(val) {
    const raw = val.replace(/\D/g, '').slice(0, 4)
    if (raw.length >= 3) return raw.slice(0, 2) + '/' + raw.slice(2)
    return raw
  }

  function selectMethod(id) {
    setSelectedMethod(id)
    setError('')
  }

  return (
    <main style={{ maxWidth: '560px', margin: '40px auto', padding: '24px 16px' }}>
      <h2 style={{ color: 'var(--text-h)', marginBottom: '24px', fontSize: '24px' }}>Payment</h2>

      {/* ── Payment Method Selector ── */}
      <div className="se-card" style={{ marginBottom: '20px' }}>
        <h3 style={{
          fontSize: '16px', fontWeight: '700', color: 'var(--text-h)',
          marginBottom: '14px', paddingBottom: '10px', borderBottom: '1px solid var(--border)',
        }}>
          Select Payment Method
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {PAYMENT_METHODS.map((method) => {
            const active = selectedMethod === method.id
            return (
              <div key={method.id}>
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  padding: '14px 16px',
                  border: `2px solid ${active ? 'var(--accent)' : 'var(--border)'}`,
                  borderRadius: active && method.id !== 'cod' ? '8px 8px 0 0' : '8px',
                  cursor: 'pointer',
                  background: active ? 'var(--accent-bg)' : 'var(--card-bg)',
                  transition: 'border-color 0.15s, background 0.15s',
                  userSelect: 'none',
                }}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method.id}
                    checked={active}
                    onChange={() => selectMethod(method.id)}
                    style={{ accentColor: 'var(--accent)', width: '18px', height: '18px', flexShrink: 0 }}
                  />
                  <span style={{ fontSize: '20px', flexShrink: 0 }}>{method.icon}</span>
                  <div style={{ flex: 1 }}>
                    <p style={{ margin: 0, fontWeight: '700', color: 'var(--text-h)', fontSize: '15px' }}>
                      {method.label}
                    </p>
                    <p style={{ margin: '3px 0 0', fontSize: '12px', color: 'var(--muted)' }}>
                      {method.desc}
                    </p>
                  </div>
                </label>

                {/* ── Expanded detail panel ── */}
                {active && method.id === 'card' && (
                  <CardForm card={card} setCard={setCard}
                    formatCardNumber={formatCardNumber} formatExpiry={formatExpiry} />
                )}
                {active && method.id === 'upi' && (
                  <UpiForm upiId={upiId} setUpiId={setUpiId} />
                )}
                {active && method.id === 'netbanking' && (
                  <NetBankingForm bank={bank} setBank={setBank} banks={BANKS} />
                )}
                {active && method.id === 'wallet' && (
                  <WalletForm wallet={wallet} setWallet={setWallet} wallets={WALLETS} />
                )}
              </div>
            )
          })}
        </div>

        {error && (
          <p style={{ marginTop: '12px', fontSize: '13px', color: 'var(--error)' }}>{error}</p>
        )}
      </div>

      {/* ── Order Total ── */}
      <div className="se-card" style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '15px' }}>
          <span style={{ color: 'var(--muted)' }}>Order Total</span>
          <span style={{ fontWeight: '700', color: 'var(--text-h)', fontSize: '17px' }}>
            ₹{cartTotal.toFixed(2)}
          </span>
        </div>
      </div>

      {/* ── Place Order ── */}
      <button
        className="se-btn-primary"
        style={{ width: '100%', padding: '15px', fontSize: '16px', borderRadius: '10px', letterSpacing: '0.3px' }}
        onClick={handlePlaceOrder}
      >
        Place Order
      </button>
    </main>
  )
}

/* ═══════════════════════════════════════
   Sub-panel: Credit / Debit Card
═══════════════════════════════════════ */
function CardForm({ card, setCard, formatCardNumber, formatExpiry }) {
  return (
    <div style={panelStyle}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div>
          <label style={labelStyle}>Card Number</label>
          <input
            className="se-input"
            placeholder="1234 5678 9012 3456"
            maxLength={19}
            value={card.number}
            onChange={(e) => setCard((p) => ({ ...p, number: formatCardNumber(e.target.value) }))}
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>Cardholder Name</label>
          <input
            className="se-input"
            placeholder="Name as on card"
            value={card.name}
            onChange={(e) => setCard((p) => ({ ...p, name: e.target.value }))}
            style={inputStyle}
          />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div>
            <label style={labelStyle}>Expiry (MM/YY)</label>
            <input
              className="se-input"
              placeholder="MM/YY"
              maxLength={5}
              value={card.expiry}
              onChange={(e) => setCard((p) => ({ ...p, expiry: formatExpiry(e.target.value) }))}
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>CVV</label>
            <input
              className="se-input"
              placeholder="•••"
              maxLength={4}
              type="password"
              value={card.cvv}
              onChange={(e) => setCard((p) => ({ ...p, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) }))}
              style={inputStyle}
            />
          </div>
        </div>
        <p style={{ margin: 0, fontSize: '12px', color: 'var(--muted)' }}>
          🔒 Your card details are encrypted and secure.
        </p>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════
   Sub-panel: UPI
═══════════════════════════════════════ */
function UpiForm({ upiId, setUpiId }) {
  return (
    <div style={panelStyle}>
      <label style={labelStyle}>UPI ID</label>
      <input
        className="se-input"
        placeholder="yourname@upi"
        value={upiId}
        onChange={(e) => setUpiId(e.target.value)}
        style={inputStyle}
      />
      <p style={{ margin: '8px 0 0', fontSize: '12px', color: 'var(--muted)' }}>
        Enter your UPI ID linked to Google Pay, PhonePe, Paytm, or BHIM.
      </p>
    </div>
  )
}

/* ═══════════════════════════════════════
   Sub-panel: Net Banking
═══════════════════════════════════════ */
function NetBankingForm({ bank, setBank, banks }) {
  return (
    <div style={panelStyle}>
      <label style={labelStyle}>Select Bank</label>
      <select
        className="se-input"
        value={bank}
        onChange={(e) => setBank(e.target.value)}
        style={inputStyle}
      >
        <option value="">-- Choose your bank --</option>
        {banks.map((b) => <option key={b} value={b}>{b}</option>)}
      </select>
      <p style={{ margin: '8px 0 0', fontSize: '12px', color: 'var(--muted)' }}>
        You will be redirected to your bank's secure portal to complete the payment.
      </p>
    </div>
  )
}

/* ═══════════════════════════════════════
   Sub-panel: Wallet
═══════════════════════════════════════ */
function WalletForm({ wallet, setWallet, wallets }) {
  return (
    <div style={panelStyle}>
      <label style={labelStyle}>Select Wallet</label>
      <select
        className="se-input"
        value={wallet}
        onChange={(e) => setWallet(e.target.value)}
        style={inputStyle}
      >
        <option value="">-- Choose a wallet --</option>
        {wallets.map((w) => <option key={w} value={w}>{w}</option>)}
      </select>
      <p style={{ margin: '8px 0 0', fontSize: '12px', color: 'var(--muted)' }}>
        Make sure you have sufficient balance in your selected wallet.
      </p>
    </div>
  )
}

/* ── shared micro-styles ── */
const panelStyle = {
  padding: '16px',
  background: 'var(--card-bg)',
  border: '2px solid var(--accent)',
  borderTop: 'none',
  borderRadius: '0 0 8px 8px',
}

const labelStyle = {
  display: 'block',
  fontSize: '13px',
  fontWeight: '600',
  color: 'var(--text-h)',
  marginBottom: '6px',
}

const inputStyle = {
  width: '100%',
  boxSizing: 'border-box',
}
