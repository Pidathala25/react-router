import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

function Header() {
  const { cartCount } = useCart()

  return (
    <header style={styles.header}>
      <Link to="/" style={styles.logo}>
        🛍️ MyShop
      </Link>
      <Link to="/cart" style={styles.cartLink}>
        🛒 Cart
        {cartCount > 0 && (
          <span style={styles.badge}>{cartCount}</span>
        )}
      </Link>
    </header>
  )
}

const styles = {
  header: {
    backgroundColor: '#1f2328',
    padding: '14px 24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    color: '#ffffff',
    textDecoration: 'none',
    fontSize: '20px',
    fontWeight: 'bold',
  },
  cartLink: {
    color: '#ffffff',
    textDecoration: 'none',
    fontSize: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  badge: {
    backgroundColor: '#3b82d4',
    color: '#ffffff',
    borderRadius: '999px',
    padding: '2px 8px',
    fontSize: '12px',
    fontWeight: 'bold',
    minWidth: '20px',
    textAlign: 'center',
  },
}

export default Header
