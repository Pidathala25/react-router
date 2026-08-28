import { Link } from 'react-router-dom'

function Header() {
  return (
    <header style={styles.header}>
      <Link to="/" style={styles.logo}>
        🛍️ MyShop
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
  },
  logo: {
    color: '#ffffff',
    textDecoration: 'none',
    fontSize: '20px',
    fontWeight: 'bold',
  },
}

export default Header
