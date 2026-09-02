function Banner() {
  return (
    <div style={{
      background: 'linear-gradient(135deg, #1f2328 0%, #2d3a4a 60%, #3b4f66 100%)',
      color: '#ffffff',
      textAlign: 'center',
      padding: '56px 24px',
    }}>
      <h1 style={{ margin: '0 0 10px', fontSize: '36px', fontWeight: '800', color: '#fff', letterSpacing: '-0.5px' }}>
        Welcome to ShopEasy
      </h1>
      <p style={{ margin: '0 0 24px', fontSize: '16px', color: 'rgba(255,255,255,0.72)', lineHeight: 1.6 }}>
        Discover thousands of quality products at unbeatable prices.
      </p>
      <a
        href="#products"
        style={{
          display: 'inline-block',
          background: 'var(--accent)',
          color: '#ffffff',
          padding: '12px 28px',
          borderRadius: '8px',
          fontSize: '15px',
          fontWeight: '600',
          textDecoration: 'none',
          transition: 'opacity 0.15s',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
      >
        Shop Now →
      </a>
    </div>
  )
}

export default Banner
