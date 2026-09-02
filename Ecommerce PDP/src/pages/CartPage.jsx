import { useCart } from '../context/CartContext'
import { useNavigate } from 'react-router-dom'

function CartPage() {
  const { cartItems, increaseQuantity, decreaseQuantity, removeItem, cartTotal } = useCart()
  const navigate = useNavigate()

  const bg = 'var(--bg)'
  const cardBg = 'var(--card-bg)'
  const border = 'var(--border)'
  const textH = 'var(--text-h)'
  const muted = 'var(--muted)'
  const surface = 'var(--surface)'

  if (cartItems.length === 0) {
    return (
      <main style={{ maxWidth: '700px', margin: '60px auto', padding: '24px', textAlign: 'center' }}>
        <div style={{ fontSize: '64px', marginBottom: '16px' }}>🛒</div>
        <h2 style={{ color: textH, marginBottom: '12px', fontSize: '22px' }}>Your cart is empty</h2>
        <p style={{ color: muted, marginBottom: '24px', fontSize: '15px' }}>
          Looks like you haven&apos;t added anything yet.
        </p>
        <button className="se-btn-primary" onClick={() => navigate('/products')}>
          ← Continue Shopping
        </button>
      </main>
    )
  }

  return (
    <main style={{ maxWidth: '960px', margin: '0 auto', padding: '24px 16px', background: bg }}>
      <h2 style={{ color: textH, marginBottom: '24px', fontSize: '24px', textAlign: 'left' }}>
        🛒 Shopping Cart
        <span style={{ fontSize: '14px', fontWeight: '400', color: muted, marginLeft: '10px' }}>
          ({cartItems.reduce((s, i) => s + i.quantity, 0)} items)
        </span>
      </h2>

      <div style={{ overflowX: 'auto' }}>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          backgroundColor: cardBg,
          border: `1px solid ${border}`,
          borderRadius: '10px',
          overflow: 'hidden',
        }}>
          <thead>
            <tr>
              {['Product', 'Price', 'Quantity', 'Subtotal', 'Remove'].map((h) => (
                <th key={h} style={{
                  padding: '12px 16px',
                  textAlign: 'left',
                  backgroundColor: surface,
                  color: textH,
                  fontSize: '13px',
                  fontWeight: '600',
                  borderBottom: `1px solid ${border}`,
                  whiteSpace: 'nowrap',
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id} style={{ borderBottom: `1px solid ${border}` }}>
                <td style={{ padding: '12px 16px', verticalAlign: 'middle' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      style={{ width: '64px', height: '64px', objectFit: 'cover', borderRadius: '8px', flexShrink: 0 }}
                    />
                    <div>
                      <p style={{ margin: 0, fontWeight: '600', color: textH, fontSize: '14px' }}>{item.title}</p>
                      {item.description && (
                        <p style={{ margin: '3px 0 0', color: muted, fontSize: '12px' }}>
                          {item.description.slice(0, 60)}…
                        </p>
                      )}
                    </div>
                  </div>
                </td>
                <td style={{ padding: '12px 16px', color: 'var(--accent)', fontWeight: '600', fontSize: '15px', whiteSpace: 'nowrap' }}>
                  ${item.price.toFixed(2)}
                </td>
                <td style={{ padding: '12px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <button
                      style={{ width: '28px', height: '28px', border: `1px solid ${border}`, borderRadius: '5px', background: surface, cursor: 'pointer', fontSize: '16px', color: textH }}
                      onClick={() => decreaseQuantity(item.id)}
                    >−</button>
                    <span style={{ minWidth: '24px', textAlign: 'center', fontWeight: '600', color: textH }}>{item.quantity}</span>
                    <button
                      style={{ width: '28px', height: '28px', border: `1px solid ${border}`, borderRadius: '5px', background: surface, cursor: 'pointer', fontSize: '16px', color: textH }}
                      onClick={() => increaseQuantity(item.id)}
                    >+</button>
                  </div>
                </td>
                <td style={{ padding: '12px 16px', fontWeight: '600', color: textH, whiteSpace: 'nowrap' }}>
                  ${(item.price * item.quantity).toFixed(2)}
                </td>
                <td style={{ padding: '12px 16px' }}>
                  <button
                    onClick={() => removeItem(item.id)}
                    style={{ background: 'transparent', color: 'var(--error)', border: '1px solid var(--error)', borderRadius: '5px', padding: '4px 10px', cursor: 'pointer', fontSize: '13px' }}
                  >Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{
        marginTop: '24px',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: '20px',
        flexWrap: 'wrap',
        padding: '20px',
        background: cardBg,
        border: `1px solid ${border}`,
        borderRadius: '10px',
      }}>
        <button className="se-btn-secondary" onClick={() => navigate('/products')}>
          ← Continue Shopping
        </button>
        <p style={{ margin: 0, fontSize: '18px', color: textH }}>
          Total: <strong style={{ color: 'var(--accent)', fontSize: '20px' }}>${cartTotal.toFixed(2)}</strong>
        </p>
        <button
          className="se-btn-primary"
          style={{ padding: '12px 28px', fontSize: '16px' }}
          onClick={() => navigate('/checkout')}
        >
          Proceed to Checkout →
        </button>
      </div>
    </main>
  )
}

export default CartPage
