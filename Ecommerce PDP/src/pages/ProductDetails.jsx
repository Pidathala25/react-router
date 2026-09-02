import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

function ProductDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [added, setAdded] = useState(false)

  useEffect(() => {
    let cancelled = false
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Product not found')
        return res.json()
      })
      .then((data) => {
        if (!cancelled) { setProduct(data); setError(null); setLoading(false) }
      })
      .catch((err) => {
        if (!cancelled) { setError(err.message); setLoading(false) }
      })
    return () => { cancelled = true }
  }, [id])

  function handleAddToCart() {
    addToCart(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1800)
  }

  if (loading) return <p style={{ textAlign: 'center', padding: '60px', color: 'var(--muted)', fontSize: '16px' }}>Loading…</p>

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '60px' }}>
        <p style={{ color: 'var(--error)', fontSize: '16px', marginBottom: '16px' }}>Error: {error}</p>
        <button className="se-btn-primary" onClick={() => navigate('/products')}>← Back to Products</button>
      </div>
    )
  }

  return (
    <main style={{ maxWidth: '900px', margin: '0 auto', padding: '24px 16px' }}>
      <button className="se-btn-secondary" style={{ marginBottom: '24px', fontSize: '14px', padding: '7px 16px' }} onClick={() => navigate('/products')}>
        ← Back to Products
      </button>

      <div style={{
        display: 'flex',
        gap: '32px',
        flexWrap: 'wrap',
        backgroundColor: 'var(--card-bg)',
        border: '1px solid var(--border)',
        borderRadius: '12px',
        padding: '24px',
      }}>
        <img
          src={product.thumbnail}
          alt={product.title}
          style={{ width: '300px', maxWidth: '100%', height: '300px', objectFit: 'cover', borderRadius: '10px', flexShrink: 0 }}
        />
        <div style={{ flex: 1, minWidth: '240px' }}>
          <h1 style={{ margin: '0 0 8px', fontSize: '22px', color: 'var(--text-h)', fontWeight: '700' }}>{product.title}</h1>
          <p style={{ fontSize: '26px', fontWeight: '800', color: 'var(--accent)', margin: '0 0 16px' }}>₹{product.price}</p>
          <p style={{ color: 'var(--muted)', lineHeight: 1.7, marginBottom: '20px', fontSize: '14px' }}>{product.description}</p>

          <button
            className="se-btn-primary"
            style={{ marginBottom: '20px', padding: '11px 28px', fontSize: '15px' }}
            onClick={handleAddToCart}
          >
            {added ? '✓ Added to Cart!' : '🛒 Add to Cart'}
          </button>

          <table style={{ borderCollapse: 'collapse', width: '100%' }}>
            <tbody>
              <tr><td style={labelCell}>Category</td><td style={valCell}>{product.category}</td></tr>
              {product.brand && <tr><td style={labelCell}>Brand</td><td style={valCell}>{product.brand}</td></tr>}
              <tr><td style={labelCell}>Rating</td><td style={valCell}>⭐ {product.rating} / 5</td></tr>
              {product.stock !== undefined && (
                <tr><td style={labelCell}>Stock</td><td style={valCell}>{product.stock} units</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  )
}

const labelCell = { padding: '6px 12px 6px 0', color: 'var(--muted)', fontWeight: '600', fontSize: '13px', whiteSpace: 'nowrap' }
const valCell   = { padding: '6px 0', color: 'var(--text-h)', fontSize: '13px' }

export default ProductDetails
