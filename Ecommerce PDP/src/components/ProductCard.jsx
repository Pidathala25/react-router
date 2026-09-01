import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

function ProductCard({ product }) {
  const navigate = useNavigate()
  const { addToCart } = useCart()

  return (
    <div style={styles.card}>
      <img
        src={product.thumbnail}
        alt={product.title}
        style={styles.image}
      />
      <div style={styles.body}>
        <h3 style={styles.title}>{product.title}</h3>
        <p style={styles.price}>${product.price}</p>
        <button
          style={styles.button}
          onClick={() => navigate(`/product/${product.id}`)}
        >
          View Details
        </button>
        <button
          style={styles.cartButton}
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  )
}

const styles = {
  card: {
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    overflow: 'hidden',
    backgroundColor: '#ffffff',
    display: 'flex',
    flexDirection: 'column',
  },
  image: {
    width: '100%',
    height: '180px',
    objectFit: 'cover',
  },
  body: {
    padding: '12px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    flexGrow: 1,
  },
  title: {
    margin: 0,
    fontSize: '15px',
    color: '#1f2328',
  },
  price: {
    margin: 0,
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#3b82d4',
  },
  button: {
    marginTop: 'auto',
    padding: '8px 12px',
    backgroundColor: '#1f2328',
    color: '#ffffff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  cartButton: {
    padding: '8px 12px',
    backgroundColor: '#3b82d4',
    color: '#ffffff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
  },
}

export default ProductCard
