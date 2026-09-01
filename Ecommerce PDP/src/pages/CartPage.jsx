import { useCart } from '../context/CartContext'
import { useNavigate } from 'react-router-dom'

function CartPage() {
  const { cartItems, increaseQuantity, decreaseQuantity, removeItem, cartTotal } = useCart()
  const navigate = useNavigate()

  if (cartItems.length === 0) {
    return (
      <main style={styles.page}>
        <h2 style={styles.heading}>Shopping Cart</h2>
        <p style={styles.empty}>Your cart is empty.</p>
        <button style={styles.checkoutButton} onClick={() => navigate('/')}>
          ← Continue Shopping
        </button>
      </main>
    )
  }

  return (
    <main style={styles.page}>
      <h2 style={styles.heading}>Shopping Cart</h2>

      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Product</th>
              <th style={styles.th}>Price</th>
              <th style={styles.th}>Quantity</th>
              <th style={styles.th}>Subtotal</th>
              <th style={styles.th}>Remove</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id} style={styles.row}>
                <td style={styles.td}>
                  <div style={styles.productCell}>
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      style={styles.image}
                    />
                    <div>
                      <p style={styles.productTitle}>{item.title}</p>
                      {item.description && (
                        <p style={styles.productDesc}>
                          {item.description.slice(0, 60)}…
                        </p>
                      )}
                    </div>
                  </div>
                </td>
                <td style={styles.td}>${item.price.toFixed(2)}</td>
                <td style={styles.td}>
                  <div style={styles.qtyControl}>
                    <button
                      style={styles.qtyBtn}
                      onClick={() => decreaseQuantity(item.id)}
                    >
                      −
                    </button>
                    <span style={styles.qtyValue}>{item.quantity}</span>
                    <button
                      style={styles.qtyBtn}
                      onClick={() => increaseQuantity(item.id)}
                    >
                      +
                    </button>
                  </div>
                </td>
                <td style={styles.td}>
                  ${(item.price * item.quantity).toFixed(2)}
                </td>
                <td style={styles.td}>
                  <button
                    style={styles.removeBtn}
                    onClick={() => removeItem(item.id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={styles.summary}>
        <p style={styles.total}>
          Total: <strong>${cartTotal.toFixed(2)}</strong>
        </p>
        <button style={styles.checkoutButton}>Checkout</button>
      </div>
    </main>
  )
}

const styles = {
  page: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '24px',
  },
  heading: {
    fontSize: '24px',
    color: '#1f2328',
    marginBottom: '24px',
    textAlign: 'left',
  },
  empty: {
    color: '#57606a',
    fontSize: '16px',
    marginBottom: '16px',
    textAlign: 'left',
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: '#ffffff',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    overflow: 'hidden',
  },
  th: {
    padding: '12px 16px',
    textAlign: 'left',
    backgroundColor: '#f7f8fa',
    color: '#1f2328',
    fontSize: '14px',
    fontWeight: '600',
    borderBottom: '1px solid #e5e7eb',
  },
  row: {
    borderBottom: '1px solid #e5e7eb',
  },
  td: {
    padding: '12px 16px',
    verticalAlign: 'middle',
    color: '#1f2328',
    fontSize: '14px',
  },
  productCell: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  image: {
    width: '64px',
    height: '64px',
    objectFit: 'cover',
    borderRadius: '6px',
    flexShrink: 0,
  },
  productTitle: {
    margin: 0,
    fontWeight: '600',
    color: '#1f2328',
    fontSize: '14px',
  },
  productDesc: {
    margin: '4px 0 0',
    color: '#57606a',
    fontSize: '12px',
  },
  qtyControl: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  qtyBtn: {
    width: '28px',
    height: '28px',
    border: '1px solid #e5e7eb',
    borderRadius: '4px',
    backgroundColor: '#f7f8fa',
    cursor: 'pointer',
    fontSize: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    lineHeight: 1,
  },
  qtyValue: {
    minWidth: '24px',
    textAlign: 'center',
    fontWeight: '600',
  },
  removeBtn: {
    backgroundColor: 'transparent',
    color: '#dc2626',
    border: '1px solid #dc2626',
    borderRadius: '4px',
    padding: '4px 10px',
    cursor: 'pointer',
    fontSize: '13px',
  },
  summary: {
    marginTop: '24px',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: '24px',
    flexWrap: 'wrap',
  },
  total: {
    fontSize: '18px',
    color: '#1f2328',
    margin: 0,
  },
  checkoutButton: {
    backgroundColor: '#3b82d4',
    color: '#ffffff',
    border: 'none',
    borderRadius: '6px',
    padding: '10px 24px',
    cursor: 'pointer',
    fontSize: '15px',
    fontWeight: '600',
  },
}

export default CartPage
