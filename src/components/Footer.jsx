function Footer() {
  return (
    <footer style={styles.footer}>
      <p style={styles.text}>© {new Date().getFullYear()} MyShop. All rights reserved.</p>
    </footer>
  )
}

const styles = {
  footer: {
    backgroundColor: '#1f2328',
    color: '#9ca3af',
    textAlign: 'center',
    padding: '16px 24px',
    marginTop: '40px',
  },
  text: {
    margin: 0,
    fontSize: '14px',
  },
}

export default Footer
