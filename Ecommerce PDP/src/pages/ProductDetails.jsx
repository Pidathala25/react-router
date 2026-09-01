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

  useEffect(() => {
    let cancelled = false

    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Product not found')
        return res.json()
      })
      .then((data) => {
        if (!cancelled) {
          setProduct(data)
          setError(null)
          setLoading(false)
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message)
          setLoading(false)
        }
      })

    return () => { cancelled = true }
  }, [id])

  if (loading) {
    return <p style={styles.message}>Loading...</p>
  }

  if (error) {
    return (
      <div style={styles.center}>
        <p style={styles.error}>Error: {error}</p>
        <button style={styles.backButton} onClick={() => navigate('/')}>
          ← Back to Home
        </button>
      </div>
    )
  }

  return (
    <main style={styles.page}>
      <button style={styles.backButton} onClick={() => navigate('/')}>
        ← Back to Home
      </button>

      <div style={styles.container}>
        {/* Product Image */}
        <img
          src={product.thumbnail}
          alt={product.title}
          style={styles.image}
        />

        {/* Product Info */}
        <div style={styles.info}>
          <h1 style={styles.title}>{product.title}</h1>

          <p style={styles.price}>${product.price}</p>

          <p style={styles.description}>{product.description}</p>

          <button
            style={styles.addToCartButton}
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>

          <table style={styles.table}>
            <tbody>
              <tr>
                <td style={styles.label}>Category</td>
                <td style={styles.value}>{product.category}</td>
              </tr>
              {product.brand && (
                <tr>
                  <td style={styles.label}>Brand</td>
                  <td style={styles.value}>{product.brand}</td>
                </tr>
              )}
              <tr>
                <td style={styles.label}>Rating</td>
                <td style={styles.value}>⭐ {product.rating}</td>
              </tr>
              {product.stock !== undefined && (
                <tr>
                  <td style={styles.label}>Stock</td>
                  <td style={styles.value}>{product.stock} units available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
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
  backButton: {
    backgroundColor: '#1f2328',
    color: '#ffffff',
    border: 'none',
    borderRadius: '6px',
    padding: '8px 16px',
    cursor: 'pointer',
    fontSize: '14px',
    marginBottom: '24px',
  },
  container: {
    display: 'flex',
    gap: '32px',
    flexWrap: 'wrap',
    backgroundColor: '#ffffff',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    padding: '24px',
  },
  image: {
    width: '300px',
    maxWidth: '100%',
    height: '300px',
    objectFit: 'cover',
    borderRadius: '8px',
  },
  info: {
    flex: 1,
    minWidth: '240px',
  },
  title: {
    margin: '0 0 8px 0',
    fontSize: '22px',
    color: '#1f2328',
  },
  price: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#3b82d4',
    margin: '0 0 16px 0',
  },
  description: {
    color: '#57606a',
    lineHeight: 1.6,
    marginBottom: '20px',
  },
  table: {
    borderCollapse: 'collapse',
    width: '100%',
  },
  label: {
    padding: '6px 12px 6px 0',
    color: '#57606a',
    fontWeight: '600',
    fontSize: '14px',
    whiteSpace: 'nowrap',
  },
  value: {
    padding: '6px 0',
    color: '#1f2328',
    fontSize: '14px',
  },
  message: {
    textAlign: 'center',
    padding: '60px',
    fontSize: '16px',
    color: '#57606a',
  },
  error: {
    color: '#dc2626',
    fontSize: '16px',
  },
  center: {
    textAlign: 'center',
    padding: '60px',
  },
  addToCartButton: {
    backgroundColor: '#3b82d4',
    color: '#ffffff',
    border: 'none',
    borderRadius: '6px',
    padding: '10px 24px',
    cursor: 'pointer',
    fontSize: '15px',
    fontWeight: '600',
    marginBottom: '20px',
  },
}

export default ProductDetails
