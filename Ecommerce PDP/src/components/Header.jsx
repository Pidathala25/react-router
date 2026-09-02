import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useTheme } from '../context/ThemeContext'
import './Header.css'

function Header() {
  const { cartCount } = useCart()
  const { isDark, toggleTheme } = useTheme()
  const { pathname } = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/products', label: 'Products' },
  ]

  return (
    <header className="site-header">
      <div className="header-inner">
        {/* Logo */}
        <Link to="/" className="header-logo">
          <span className="header-logo-icon">🛍️</span>
          <span className="header-logo-text">ShopEasy</span>
        </Link>

        {/* Desktop nav */}
        <nav className="header-nav">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`header-nav-link${pathname === to ? ' active' : ''}`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Right side actions */}
        <div className="header-actions">
          <button
            onClick={toggleTheme}
            className="header-icon-btn"
            aria-label="Toggle dark mode"
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? '☀️' : '🌙'}
          </button>

          <Link to="/cart" className="header-cart-btn">
            <span>🛒</span>
            <span className="cart-label">Cart</span>
            {cartCount > 0 && (
              <span className="header-badge">{cartCount}</span>
            )}
          </Link>

          <button
            className="header-hamburger"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <nav className={`header-mobile-menu${menuOpen ? ' open' : ''}`}>
        {navLinks.map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            className={`mobile-link${pathname === to ? ' active' : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            {label}
          </Link>
        ))}
        <Link
          to="/cart"
          className="mobile-link"
          onClick={() => setMenuOpen(false)}
        >
          🛒 Cart {cartCount > 0 && `(${cartCount})`}
        </Link>
      </nav>
    </header>
  )
}

export default Header
