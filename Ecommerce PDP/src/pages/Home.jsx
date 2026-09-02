import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import './Home.css'

/* ─── Static data ────────────────────────────────────────────── */
const CATEGORIES = [
  { name: 'Electronics',  emoji: '📱', bg: '#dbeafe', dark: '#1d3557' },
  { name: 'Beauty',       emoji: '💄', bg: '#fce7f3', dark: '#3b1a2e' },
  { name: 'Furniture',    emoji: '🛋️', bg: '#d1fae5', dark: '#14352a' },
  { name: 'Groceries',    emoji: '🛒', bg: '#fef3c7', dark: '#3b2c0a' },
  { name: 'Fragrances',   emoji: '🌸', bg: '#ede9fe', dark: '#2e1a47' },
  { name: 'Mens Shirts',  emoji: '👔', bg: '#fee2e2', dark: '#3b1414' },
]

const OFFERS = [
  {
    label: 'Flash Sale',
    title: 'Up to 50% OFF',
    desc: 'Today only on Electronics & Gadgets',
    badge: '⚡',
    accent: '#ef4444',
    light: '#fff5f5',
    dark: '#3b1414',
  },
  {
    label: 'New Arrivals',
    title: 'Buy 2 Get 1 Free',
    desc: 'On all Beauty & Care products',
    badge: '🎁',
    accent: '#7c3aed',
    light: '#f5f3ff',
    dark: '#2e1a47',
  },
  {
    label: 'Weekend Deal',
    title: 'Free Shipping',
    desc: 'On orders above $49. No code needed!',
    badge: '🚚',
    accent: '#059669',
    light: '#ecfdf5',
    dark: '#0a2e1a',
  },
]

const WHY_US = [
  { icon: '🚚', title: 'Free Shipping',  desc: 'On all orders over $49. Fast delivery guaranteed.' },
  { icon: '🔒', title: 'Secure Payment', desc: '100% secure transactions with SSL encryption.' },
  { icon: '↩️', title: 'Easy Returns',   desc: '30-day hassle-free returns on all products.' },
  { icon: '🎧', title: '24/7 Support',   desc: 'Our team is here for you around the clock.' },
]

const REVIEWS = [
  {
    name: 'Sarah Johnson',
    avatar: 'SJ',
    rating: 5,
    date: 'March 2025',
    text: 'Absolutely love shopping here! The products are top quality and delivery was super fast. Will definitely be ordering again.',
  },
  {
    name: 'Marcus Lee',
    avatar: 'ML',
    rating: 5,
    date: 'February 2025',
    text: "Best online store I've used. The checkout process is seamless and the customer support team resolved my query within minutes.",
  },
  {
    name: 'Priya Sharma',
    avatar: 'PS',
    rating: 4,
    date: 'January 2025',
    text: "Great selection of products at competitive prices. The categories make it easy to find exactly what I need. Highly recommend!",
  },
]

function Stars({ count }) {
  return (
    <span className="home-stars" aria-label={`${count} out of 5 stars`}>
      {'★'.repeat(count)}{'☆'.repeat(5 - count)}
    </span>
  )
}

/* ─── Home page ──────────────────────────────────────────────── */
function Home() {
  const navigate = useNavigate()
  const [featured, setFeatured] = useState([])
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  useEffect(() => {
    fetch('https://dummyjson.com/products?limit=8')
      .then((r) => r.json())
      .then((d) => setFeatured(d.products.slice(0, 4)))
  }, [])

  function handleSubscribe(e) {
    e.preventDefault()
    if (email.trim()) {
      setSubscribed(true)
      setEmail('')
    }
  }

  return (
    <main className="home-main">

      {/* ── 1. Hero / Banner ───────────────────────────────────── */}
      <section className="home-hero">
        <div className="home-hero-content">
          <span className="home-hero-eyebrow">🔥 New Season Arrivals</span>
          <h1 className="home-hero-title">Shop the Latest<br />Products</h1>
          <p className="home-hero-desc">
            Discover thousands of top-quality products across every category —
            at prices you'll love. New deals drop every day.
          </p>
          <div className="home-hero-actions">
            <button
              className="se-btn-primary home-btn-lg"
              onClick={() => navigate('/products')}
            >
              Shop Now →
            </button>
            <button
              className="home-btn-outline home-btn-lg"
              onClick={() => document.getElementById('home-categories').scrollIntoView({ behavior: 'smooth' })}
            >
              Browse Categories
            </button>
          </div>
          <div className="home-hero-stats">
            <div className="home-hero-stat">
              <strong>10K+</strong><span>Products</span>
            </div>
            <div className="home-stat-div" />
            <div className="home-hero-stat">
              <strong>50K+</strong><span>Happy Customers</span>
            </div>
            <div className="home-stat-div" />
            <div className="home-hero-stat">
              <strong>4.8★</strong><span>Avg Rating</span>
            </div>
          </div>
        </div>
        <div className="home-hero-visual" aria-hidden="true">
          <div className="home-hero-card home-hero-card-1">
            <span className="home-hero-card-icon">📱</span>
            <span>Electronics</span>
          </div>
          <div className="home-hero-card home-hero-card-2">
            <span className="home-hero-card-icon">💄</span>
            <span>Beauty</span>
          </div>
          <div className="home-hero-card home-hero-card-3">
            <span className="home-hero-card-icon">🛋️</span>
            <span>Furniture</span>
          </div>
          <div className="home-floating-badge">50% OFF</div>
        </div>
      </section>

      {/* ── 2. Featured Products ────────────────────────────────── */}
      <section className="home-section">
        <div className="home-container">
          <div className="home-section-header">
            <span className="home-section-label">✨ Hand-Picked</span>
            <h2 className="home-section-title">Featured Products</h2>
            <p className="home-section-sub">Curated picks just for you this season</p>
          </div>
          <div className="home-featured-grid">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          <div className="home-section-cta">
            <button
              className="se-btn-primary"
              onClick={() => navigate('/products')}
            >
              View All Products →
            </button>
          </div>
        </div>
      </section>

      {/* ── 3. Shop by Category ──────────────────────────────────── */}
      <section className="home-section home-section-alt" id="home-categories">
        <div className="home-container">
          <div className="home-section-header">
            <span className="home-section-label">🗂 Explore</span>
            <h2 className="home-section-title">Shop by Category</h2>
            <p className="home-section-sub">Find exactly what you're looking for</p>
          </div>
          <div className="home-categories-grid">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.name}
                className="home-cat-card"
                onClick={() => navigate('/products')}
                style={{ '--cat-bg': cat.bg, '--cat-dark': cat.dark }}
              >
                <span className="home-cat-emoji">{cat.emoji}</span>
                <span className="home-cat-name">{cat.name}</span>
                <span className="home-cat-arrow">→</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Special Offers ────────────────────────────────────── */}
      <section className="home-section">
        <div className="home-container">
          <div className="home-section-header">
            <span className="home-section-label">🏷 Limited Time</span>
            <h2 className="home-section-title">Special Offers</h2>
            <p className="home-section-sub">Don't miss these incredible deals</p>
          </div>
          <div className="home-offers-grid">
            {OFFERS.map((offer) => (
              <div
                key={offer.title}
                className="home-offer-card"
                style={{ '--offer-accent': offer.accent, '--offer-light': offer.light, '--offer-dark': offer.dark }}
              >
                <div className="home-offer-badge-row">
                  <span className="home-offer-icon">{offer.badge}</span>
                  <span className="home-offer-label">{offer.label}</span>
                </div>
                <h3 className="home-offer-title">{offer.title}</h3>
                <p className="home-offer-desc">{offer.desc}</p>
                <button
                  className="home-offer-btn"
                  onClick={() => navigate('/products')}
                >
                  Shop Now →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Why Choose Us ─────────────────────────────────────── */}
      <section className="home-section home-section-alt">
        <div className="home-container">
          <div className="home-section-header">
            <span className="home-section-label">💎 Our Promise</span>
            <h2 className="home-section-title">Why Choose Us?</h2>
            <p className="home-section-sub">We go the extra mile so you don't have to</p>
          </div>
          <div className="home-why-grid">
            {WHY_US.map((item) => (
              <div key={item.title} className="home-why-card">
                <div className="home-why-icon">{item.icon}</div>
                <h3 className="home-why-title">{item.title}</h3>
                <p className="home-why-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. Customer Reviews ──────────────────────────────────── */}
      <section className="home-section">
        <div className="home-container">
          <div className="home-section-header">
            <span className="home-section-label">💬 What They Say</span>
            <h2 className="home-section-title">Customer Reviews</h2>
            <p className="home-section-sub">Trusted by thousands of happy shoppers</p>
          </div>
          <div className="home-reviews-grid">
            {REVIEWS.map((rev) => (
              <div key={rev.name} className="home-review-card">
                <Stars count={rev.rating} />
                <p className="home-review-text">"{rev.text}"</p>
                <div className="home-reviewer">
                  <div className="home-reviewer-avatar">{rev.avatar}</div>
                  <div>
                    <p className="home-reviewer-name">{rev.name}</p>
                    <p className="home-reviewer-date">{rev.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. Newsletter ────────────────────────────────────────── */}
      <section className="home-section home-newsletter-section">
        <div className="home-newsletter-inner">
          <div className="home-newsletter-text">
            <span className="home-section-label home-section-label-light">📬 Stay Updated</span>
            <h2 className="home-section-title home-newsletter-title">Get Exclusive Deals</h2>
            <p className="home-section-sub home-newsletter-sub">
              Subscribe and be the first to hear about flash sales,
              new arrivals, and members-only discounts.
            </p>
          </div>
          {subscribed ? (
            <div className="home-newsletter-success">
              <span>🎉</span>
              <p>You're subscribed! Watch your inbox for exclusive deals.</p>
            </div>
          ) : (
            <form className="home-newsletter-form" onSubmit={handleSubscribe}>
              <input
                type="email"
                className="home-newsletter-input"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="se-btn-primary">
                Subscribe
              </button>
            </form>
          )}
        </div>
      </section>

    </main>
  )
}

export default Home
