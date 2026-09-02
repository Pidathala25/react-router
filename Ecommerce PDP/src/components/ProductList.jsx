import { useState, useEffect } from 'react'
import ProductCard from './ProductCard'

function ProductList() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('https://dummyjson.com/products?limit=30')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch products')
        return res.json()
      })
      .then((data) => {
        setProducts(data.products)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <p style={{ textAlign: 'center', padding: '60px', color: 'var(--muted)', fontSize: '16px' }}>Loading products…</p>
  }

  if (error) {
    return <p style={{ textAlign: 'center', padding: '40px', color: 'var(--error)', fontSize: '16px' }}>Error: {error}</p>
  }

  return (
    <section style={{ padding: '40px 24px 60px', maxWidth: '1100px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h2 style={{ color: 'var(--text-h)', fontSize: '28px', fontWeight: '700', marginBottom: '8px' }}>
          All Products
        </h2>
        <p style={{ color: 'var(--muted)', fontSize: '15px' }}>Browse our complete collection</p>
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '20px',
      }}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}

export default ProductList
