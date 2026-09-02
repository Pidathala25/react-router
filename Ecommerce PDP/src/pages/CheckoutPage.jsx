import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const COUNTRIES = ['India', 'United States', 'United Kingdom', 'Canada', 'Australia', 'Germany', 'France', 'Singapore', 'UAE', 'Japan']
const SHIPPING_OPTIONS = [
  { id: 'standard', label: 'Standard Delivery', desc: '5–7 business days', price: 0 },
  { id: 'express', label: 'Express Delivery', desc: '2–3 business days', price: 99 },
]

export default function CheckoutPage() {
  const { cartItems, cartTotal } = useCart()
  const navigate = useNavigate()

  /* address form */
  const [form, setForm] = useState({
    fullName: '', email: '', phone: '',
    address1: '', address2: '',
    city: '', state: '', country: 'India', pincode: '',
    saveAddress: false,
  })

  /* payment */
  const [payMethod, setPayMethod] = useState('')
  const [cardForm, setCardForm] = useState({ number: '', name: '', expiry: '', cvv: '' })
  const [upiId, setUpiId] = useState('')

  /* shipping */
  const [shippingId, setShippingId] = useState('standard')
  const shipping = SHIPPING_OPTIONS.find((o) => o.id === shippingId)

  /* coupon */
  const [coupon, setCoupon] = useState('')
  const [couponApplied, setCouponApplied] = useState(false)
  const [couponMsg, setCouponMsg] = useState(null)
  const [couponMsgType, setCouponMsgType] = useState('success')

  /* ─── computed totals ─── */
  const discount = couponApplied ? +(cartTotal * 0.1).toFixed(2) : 0
  const finalTotal = +(cartTotal - discount + shipping.price).toFixed(2)

  /* ─── handlers ─── */
  function handleField(e) {
    const { name, value, type, checked } = e.target
    setForm((p) => ({ ...p, [name]: type === 'checkbox' ? checked : value }))
  }
  function handleCoupon() {
    if (coupon.trim().toUpperCase() === 'SAVE10') {
      setCouponApplied(true)
      setCouponMsg('Coupon SAVE10 applied! 10% discount added.')
      setCouponMsgType('success')
    } else {
      setCouponApplied(false)
      setCouponMsg('Invalid coupon code. Try SAVE10.')
      setCouponMsgType('error')
    }
  }

  /* ─── EMPTY CART GUARD ─── */
  if (cartItems.length === 0) {
    return (
      <main style={{ maxWidth: '600px', margin: '60px auto', padding: '24px', textAlign: 'center' }}>
        <div style={{ fontSize: '64px', marginBottom: '16px' }}>🛒</div>
        <h2 style={{ color: 'var(--text-h)', marginBottom: '12px' }}>Your cart is empty</h2>
        <button className="se-btn-primary" onClick={() => navigate('/products')}>← Go Shopping</button>
      </main>
    )
  }

  /* ─── MAIN CHECKOUT LAYOUT ─── */
  return (
    <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '24px 16px' }}>
      <h2 style={{ color: 'var(--text-h)', marginBottom: '24px', fontSize: '24px', textAlign: 'left' }}>
        Secure Checkout
      </h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0,1.4fr) minmax(0,1fr)',
        gap: '24px',
        alignItems: 'start',
      }}
        className="checkout-grid"
      >
        {/* ══ LEFT COLUMN ══ */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

          {/* ── Shipping Address ── */}
          <Section title="1. Shipping Address">
            <div style={twoColGrid}>
              <Field label="Full Name">
                <input className="se-input" name="fullName" placeholder="John Doe" value={form.fullName} onChange={handleField} />
              </Field>
              <Field label="Email Address">
                <input className="se-input" name="email" type="email" placeholder="john@example.com" value={form.email} onChange={handleField} />
              </Field>
              <Field label="Phone Number">
                <input className="se-input" name="phone" placeholder="9876543210" value={form.phone} onChange={handleField} />
              </Field>
              <Field label="Pincode / ZIP">
                <input className="se-input" name="pincode" placeholder="400001" value={form.pincode} onChange={handleField} />
              </Field>
            </div>
            <div style={{ marginTop: '12px' }}>
              <Field label="Address Line 1">
                <input className="se-input" name="address1" placeholder="Street, House / Flat No." value={form.address1} onChange={handleField} />
              </Field>
            </div>
            <div style={{ marginTop: '12px' }}>
              <Field label="Address Line 2">
                <input className="se-input" name="address2" placeholder="Landmark, Area (optional)" value={form.address2} onChange={handleField} />
              </Field>
            </div>
            <div style={{ ...twoColGrid, marginTop: '12px' }}>
              <Field label="City">
                <input className="se-input" name="city" placeholder="Mumbai" value={form.city} onChange={handleField} />
              </Field>
              <Field label="State">
                <input className="se-input" name="state" placeholder="Maharashtra" value={form.state} onChange={handleField} />
              </Field>
              <Field label="Country">
                <select className="se-input" name="country" value={form.country} onChange={handleField}>
                  {COUNTRIES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </Field>
            </div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '14px', cursor: 'pointer', fontSize: '14px', color: 'var(--text-h)' }}>
              <input type="checkbox" name="saveAddress" checked={form.saveAddress} onChange={handleField} style={{ accentColor: 'var(--accent)', width: '16px', height: '16px' }} />
              Save this address for future orders
            </label>
          </Section>

          {/* ── Shipping Options ── */}
          <Section title="2. Shipping Method">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {SHIPPING_OPTIONS.map((opt) => (
                <label key={opt.id} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '14px 16px',
                  border: `2px solid ${shippingId === opt.id ? 'var(--accent)' : 'var(--border)'}`,
                  borderRadius: '8px',
                  cursor: 'pointer',
                  background: shippingId === opt.id ? 'var(--accent-bg)' : 'var(--card-bg)',
                  transition: 'border-color 0.15s, background 0.15s',
                }}>
                  <input type="radio" name="shipping" value={opt.id} checked={shippingId === opt.id}
                    onChange={() => setShippingId(opt.id)}
                    style={{ accentColor: 'var(--accent)', width: '16px', height: '16px' }} />
                  <div style={{ flex: 1 }}>
                    <p style={{ margin: 0, fontWeight: '600', color: 'var(--text-h)', fontSize: '14px' }}>{opt.label}</p>
                    <p style={{ margin: 0, color: 'var(--muted)', fontSize: '13px' }}>{opt.desc}</p>
                  </div>
                  <span style={{ fontWeight: '700', color: opt.price === 0 ? 'var(--success)' : 'var(--text-h)', fontSize: '14px' }}>
                    {opt.price === 0 ? 'FREE' : `₹${opt.price}`}
                  </span>
                </label>
              ))}
            </div>
          </Section>

          {/* ── Payment Method ── */}
          <Section title="3. Payment Method">
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '16px' }}>
              {[
                { id: 'upi', icon: '📱', label: 'UPI' },
                { id: 'card', icon: '💳', label: 'Card' },
                { id: 'cod', icon: '💵', label: 'Cash on Delivery' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setPayMethod(opt.id)}
                  style={{
                    flex: '1 1 120px',
                    padding: '12px 16px',
                    border: `2px solid ${payMethod === opt.id ? 'var(--accent)' : 'var(--border)'}`,
                    borderRadius: '8px',
                    background: payMethod === opt.id ? 'var(--accent-bg)' : 'var(--card-bg)',
                    cursor: 'pointer',
                    fontWeight: '600',
                    fontSize: '14px',
                    color: 'var(--text-h)',
                    transition: 'border-color 0.15s, background 0.15s',
                  }}
                >
                  {opt.icon} {opt.label}
                </button>
              ))}
            </div>

            {/* Card fields */}
            {payMethod === 'card' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <Field label="Card Number">
                  <input className="se-input" placeholder="1234 5678 9012 3456" maxLength={19}
                    value={cardForm.number}
                    onChange={(e) => setCardForm((p) => ({ ...p, number: e.target.value }))}
                  />
                </Field>
                <Field label="Cardholder Name">
                  <input className="se-input" placeholder="John Doe"
                    value={cardForm.name}
                    onChange={(e) => setCardForm((p) => ({ ...p, name: e.target.value }))}
                  />
                </Field>
                <div style={twoColGrid}>
                  <Field label="Expiry Date">
                    <input className="se-input" placeholder="MM/YY" maxLength={5}
                      value={cardForm.expiry}
                      onChange={(e) => setCardForm((p) => ({ ...p, expiry: e.target.value }))}
                    />
                  </Field>
                  <Field label="CVV">
                    <input className="se-input" placeholder="•••" maxLength={4} type="password"
                      value={cardForm.cvv}
                      onChange={(e) => setCardForm((p) => ({ ...p, cvv: e.target.value }))}
                    />
                  </Field>
                </div>
                <p style={{ fontSize: '12px', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  🔒 Your card details are safe. This is a demo — no real transaction occurs.
                </p>
              </div>
            )}

            {/* UPI field */}
            {payMethod === 'upi' && (
              <Field label="UPI ID">
                <input className="se-input" placeholder="yourname@upi"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                />
              </Field>
            )}

            {payMethod === 'cod' && (
              <div style={{
                padding: '12px 16px', background: 'var(--surface)', border: '1px solid var(--border)',
                borderRadius: '8px', fontSize: '14px', color: 'var(--muted)',
              }}>
                💵 Pay with cash at the time of delivery. No prepayment required.
              </div>
            )}
          </Section>
        </div>

        {/* ══ RIGHT COLUMN – ORDER SUMMARY ══ */}
        <div style={{ position: 'sticky', top: '76px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Section title="Order Summary">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '320px', overflowY: 'auto', paddingRight: '4px' }}>
              {cartItems.map((item) => (
                <div key={item.id} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <img src={item.thumbnail} alt={item.title} style={{ width: '52px', height: '52px', objectFit: 'cover', borderRadius: '6px', flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ margin: 0, fontSize: '13px', fontWeight: '600', color: 'var(--text-h)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {item.title}
                    </p>
                    <p style={{ margin: 0, fontSize: '12px', color: 'var(--muted)' }}>Qty: {item.quantity}</p>
                  </div>
                  <span style={{ fontWeight: '600', fontSize: '13px', color: 'var(--text-h)', whiteSpace: 'nowrap' }}>
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div style={{ borderTop: '1px solid var(--border)', marginTop: '14px', paddingTop: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <SummaryRow label="Subtotal" value={`₹${cartTotal.toFixed(2)}`} />
              <SummaryRow label={`Shipping (${shipping.label})`} value={shipping.price === 0 ? 'FREE' : `₹${shipping.price}`} valueColor={shipping.price === 0 ? 'var(--success)' : undefined} />
              {couponApplied && <SummaryRow label="Discount (SAVE10)" value={`-₹${discount.toFixed(2)}`} valueColor="var(--success)" />}
              <div style={{ borderTop: '1px solid var(--border)', paddingTop: '10px', marginTop: '4px' }}>
                <SummaryRow label="Total" value={`₹${finalTotal.toFixed(2)}`} bold />
              </div>
            </div>
          </Section>

          {/* Coupon */}
          <Section title="Coupon / Discount">
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                className="se-input"
                placeholder="Enter coupon code"
                value={coupon}
                onChange={(e) => { setCoupon(e.target.value); setCouponMsg(null) }}
                style={{ flex: 1 }}
                disabled={couponApplied}
              />
              <button
                className="se-btn-primary"
                style={{ whiteSpace: 'nowrap', padding: '9px 16px' }}
                onClick={handleCoupon}
                disabled={couponApplied || !coupon.trim()}
              >
                {couponApplied ? '✓ Applied' : 'Apply'}
              </button>
            </div>
            {couponMsg && (
              <p style={{ marginTop: '8px', fontSize: '13px', color: couponMsgType === 'success' ? 'var(--success)' : 'var(--error)' }}>
                {couponMsg}
              </p>
            )}
            {!couponApplied && <p style={{ marginTop: '6px', fontSize: '12px', color: 'var(--muted)' }}>Try code: <strong>SAVE10</strong></p>}
            {couponApplied && (
              <button
                style={{ marginTop: '6px', background: 'none', border: 'none', color: 'var(--error)', fontSize: '12px', cursor: 'pointer', padding: 0 }}
                onClick={() => { setCouponApplied(false); setCoupon(''); setCouponMsg(null) }}
              >Remove coupon</button>
            )}
          </Section>

          {/* Pay Now */}
          <button
            className="se-btn-primary"
            style={{ width: '100%', padding: '15px', fontSize: '16px', borderRadius: '10px', letterSpacing: '0.3px' }}
            onClick={() => navigate('/products')}
          >
            🔒 Pay Now
          </button>
          <p style={{ textAlign: 'center', fontSize: '12px', color: 'var(--muted)', marginTop: '-8px' }}>
            This is a demo — no real payment is processed.
          </p>

        </div>
      </div>

      {/* Responsive style tag */}
      <style>{`
        @media (max-width: 768px) {
          .checkout-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  )
}

/* ─── Small reusable sub-components ─── */

function Section({ title, children, error }) {
  return (
    <div className="se-card" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-h)', marginBottom: '14px', paddingBottom: '10px', borderBottom: '1px solid var(--border)' }}>
        {title}
      </h3>
      {children}
      {error && <p className="se-error-msg" style={{ marginTop: '6px' }}>{error}</p>}
    </div>
  )
}

function Field({ id, label, error, children }) {
  return (
    <div id={id}>
      {label && <label className="se-label">{label}</label>}
      {children}
      {error && <p className="se-error-msg">{error}</p>}
    </div>
  )
}

function SummaryRow({ label, value, bold, valueColor }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '14px' }}>
      <span style={{ color: 'var(--muted)' }}>{label}</span>
      <span style={{ fontWeight: bold ? '700' : '500', color: valueColor || 'var(--text-h)', fontSize: bold ? '16px' : '14px' }}>{value}</span>
    </div>
  )
}

const twoColGrid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '12px',
}
