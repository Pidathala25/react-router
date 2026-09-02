import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import './ProductCard.css'

function ProductCard({ product }) {
  const navigate = useNavigate()
  const { addToCart } = useCart()

  const discountPrice = product.discountPercentage
    ? (product.price * (1 - product.discountPercentage / 100)).toFixed(2)
    : null

  return (
    <div className="pdp-product-card">
      {product.discountPercentage > 0 && (
        <span className="pdp-product-badge">
          -{Math.round(product.discountPercentage)}%
        </span>
      )}

      <div className="pdp-product-img-wrap">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="pdp-product-img"
          loading="lazy"
        />
      </div>

      <div className="pdp-product-info">
        <p className="pdp-product-category">{product.category}</p>
        <h3 className="pdp-product-title">{product.title}</h3>

        {product.rating && (
          <div className="pdp-product-rating">
            {'★'.repeat(Math.round(product.rating))}
            {'☆'.repeat(5 - Math.round(product.rating))}
            <span className="pdp-rating-value">({product.rating.toFixed(1)})</span>
          </div>
        )}

        <div className="pdp-product-prices">
          {discountPrice ? (
            <>
              <span className="pdp-price-now">${discountPrice}</span>
              <span className="pdp-price-was">${product.price}</span>
            </>
          ) : (
            <span className="pdp-price-now">${product.price}</span>
          )}
        </div>

        <div className="pdp-product-actions">
          <button
            className="se-btn-secondary"
            style={{ flex: 1, padding: '7px 10px', fontSize: '13px' }}
            onClick={() => navigate(`/product/${product.id}`)}
          >
            View Details
          </button>
          <button
            className="se-btn-primary"
            style={{ flex: 1, padding: '7px 10px', fontSize: '13px' }}
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
