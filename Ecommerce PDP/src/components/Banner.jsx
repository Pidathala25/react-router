function Banner() {
  return (
    <div style={styles.banner}>
      <h1 style={styles.title}>Welcome to MyShop</h1>
      <p style={styles.subtitle}>Browse our latest products and find great deals!</p>
    </div>
  )
}

const styles = {
  banner: {
    backgroundColor: '#3b82d4',
    color: '#ffffff',
    textAlign: 'center',
    padding: '40px 24px',
  },
  title: {
    margin: '0 0 8px 0',
    fontSize: '28px',
  },
  subtitle: {
    margin: 0,
    fontSize: '16px',
    opacity: 0.9,
  },
}

export default Banner
