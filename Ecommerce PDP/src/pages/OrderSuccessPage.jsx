import { useNavigate } from 'react-router-dom'

export default function OrderSuccessPage() {
  const navigate = useNavigate()

  return (
    <main style={{
      maxWidth: '560px',
      margin: '60px auto',
      padding: '40px 24px',
      textAlign: 'center',
    }}>
      <div className="se-card" style={{ padding: '48px 32px' }}>
        {/* Success Icon */}
        <div style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: 'var(--success-bg)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 24px',
          fontSize: '40px',
        }}>
          ✅
        </div>

        {/* Heading */}
        <h2 style={{
          color: 'var(--text-h)',
          fontSize: '26px',
          fontWeight: '700',
          marginBottom: '12px',
        }}>
          Order Placed Successfully!
        </h2>

        {/* Message */}
        <p style={{
          color: 'var(--muted)',
          fontSize: '15px',
          lineHeight: '1.7',
          marginBottom: '12px',
        }}>
          Congratulations! Your order has been placed successfully.
        </p>
        <p style={{
          color: 'var(--muted)',
          fontSize: '14px',
          lineHeight: '1.6',
          marginBottom: '32px',
        }}>
          You'll receive a confirmation soon. Your items will be delivered and you can pay with <strong style={{ color: 'var(--text-h)' }}>Cash on Delivery</strong>.
        </p>

        {/* Continue Shopping */}
        <button
          className="se-btn-primary"
          style={{ padding: '13px 32px', fontSize: '15px', borderRadius: '8px' }}
          onClick={() => navigate('/')}
        >
          Continue Shopping
        </button>
      </div>
    </main>
  )
}
