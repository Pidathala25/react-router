import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import './ProductsPage.css'

/* Fixed 5 categories */
const CATEGORIES = [
  { slug: 'smartphones',  label: 'Smartphones',  emoji: '📱' },
  { slug: 'beauty',       label: 'Beauty',        emoji: '💄' },
  { slug: 'furniture',    label: 'Furniture',     emoji: '🛋️' },
  { slug: 'groceries',    label: 'Groceries',     emoji: '🛒' },
  { slug: 'mens-shirts',  label: "Men's Shirts",  emoji: '👔' },
]

function getCategoryMeta(slug) {
  return CATEGORIES.find((c) => c.slug === slug) || { label: slug, emoji: '🏷️' }
}

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialCategory = searchParams.get('category') || 'all'

  const [activeCategory, setActiveCategory] = useState(initialCategory)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  /* Fetch products whenever active category changes */
  useEffect(() => {
    setLoading(true)
    setError(null)
    const url =
      activeCategory === 'all'
        ? 'https://dummyjson.com/products?limit=100'
        : `https://dummyjson.com/products/category/${activeCategory}?limit=100`

    fetch(url)
      .then((r) => {
        if (!r.ok) throw new Error('Failed to fetch products')
        return r.json()
      })
      .then((data) => {
        setProducts(data.products)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [activeCategory])

  function selectCategory(slug) {
    setActiveCategory(slug)
    if (slug === 'all') {
      setSearchParams({})
    } else {
      setSearchParams({ category: slug })
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const activeMeta = activeCategory === 'all'
    ? { label: 'All Products', emoji: '🏷️' }
    : getCategoryMeta(activeCategory)

  return (
    <main style={{ minHeight: '60vh' }}>
      {/* ── Category Filter Bar ── */}
      <div className="pp-filter-bar">
        <div className="pp-filter-inner">
          <button
            className={`pp-filter-tab${activeCategory === 'all' ? ' pp-filter-tab--active' : ''}`}
            onClick={() => selectCategory('all')}
          >
            🏷️ All
          </button>
          {CATEGORIES.map(({ slug, label, emoji }) => (
            <button
              key={slug}
              className={`pp-filter-tab${activeCategory === slug ? ' pp-filter-tab--active' : ''}`}
              onClick={() => selectCategory(slug)}
            >
              {emoji} {label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Product Grid ── */}
      <section className="pp-section">
        {/* Header */}
        <div className="pp-section-header">
          <h2 className="pp-section-title">
            {activeMeta.emoji} {activeMeta.label}
          </h2>
          {!loading && !error && (
            <span className="pp-count">{products.length} product{products.length !== 1 ? 's' : ''}</span>
          )}
        </div>

        {/* States */}
        {loading && (
          <div className="pp-state-msg">
            <div className="pp-spinner" />
            <p>Loading products…</p>
          </div>
        )}
        {error && (
          <div className="pp-state-msg" style={{ color: 'var(--error)' }}>
            ⚠️ {error}
          </div>
        )}
        {!loading && !error && products.length === 0 && (
          <div className="pp-state-msg">
            <p>No products found in this category.</p>
          </div>
        )}

        {/* Grid */}
        {!loading && !error && products.length > 0 && (
          <div className="pp-grid">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
