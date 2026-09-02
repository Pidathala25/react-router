function Footer() {
  const year = new Date().getFullYear()

  const colStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    minWidth: '160px',
    flex: '1 1 160px',
  }
  const headingStyle = {
    fontSize: '13px',
    fontWeight: '700',
    color: 'rgba(255,255,255,0.9)',
    textTransform: 'uppercase',
    letterSpacing: '0.8px',
    marginBottom: '4px',
  }
  const linkStyle = {
    color: 'rgba(255,255,255,0.55)',
    fontSize: '13px',
    textDecoration: 'none',
    lineHeight: '1.8',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    padding: 0,
    fontFamily: 'inherit',
  }

  return (
    <footer style={{
      backgroundColor: 'var(--footer-bg)',
      color: 'var(--footer-text)',
      marginTop: 'auto',
    }}>
      {/* Main footer grid */}
      <div style={{
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '48px 24px 32px',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '32px',
        justifyContent: 'space-between',
      }}>

        {/* Brand */}
        <div style={{ ...colStyle, flex: '2 1 220px', maxWidth: '280px' }}>
          <span style={{ fontSize: '22px', fontWeight: '700', color: '#fff' }}>🛍️ ShopEasy</span>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', lineHeight: '1.7', marginTop: '4px' }}>
            Your trusted destination for quality products at unbeatable prices. Shop smarter, live better.
          </p>
          <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
            {['📘', '🐦', '📸', '▶️'].map((icon, i) => (
              <a key={i} href="#" style={{
                fontSize: '18px',
                textDecoration: 'none',
                opacity: 0.65,
                transition: 'opacity 0.15s',
              }}
              title={['Facebook', 'Twitter', 'Instagram', 'YouTube'][i]}
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* Company */}
        <div style={colStyle}>
          <p style={headingStyle}>Company</p>
          {['About Us', 'Careers', 'Press', 'Blog', 'Partner with Us'].map((item) => (
            <a key={item} href="#" style={linkStyle}>{item}</a>
          ))}
        </div>

        {/* Customer Service */}
        <div style={colStyle}>
          <p style={headingStyle}>Customer Service</p>
          {['Contact Us', 'FAQ', 'Shipping & Delivery', 'Returns & Refunds', 'Track Order', 'Size Guide'].map((item) => (
            <a key={item} href="#" style={linkStyle}>{item}</a>
          ))}
        </div>

        {/* Legal */}
        <div style={colStyle}>
          <p style={headingStyle}>Legal</p>
          {['Privacy Policy', 'Terms & Conditions', 'Cookie Policy', 'Accessibility'].map((item) => (
            <a key={item} href="#" style={linkStyle}>{item}</a>
          ))}
        </div>

        {/* Contact */}
        <div style={colStyle}>
          <p style={headingStyle}>Contact Us</p>
          <p style={{ ...linkStyle, cursor: 'default' }}>📧 support@shopeasy.demo</p>
          <p style={{ ...linkStyle, cursor: 'default' }}>📞 +1 (800) 123-4567</p>
          <p style={{ ...linkStyle, cursor: 'default' }}>🏢 123 Commerce Street,<br />San Francisco, CA 94102, USA</p>
          <p style={{ ...linkStyle, marginTop: '6px', cursor: 'default' }}>
            Mon – Sat: 9 AM – 6 PM PST
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        borderTop: '1px solid rgba(255,255,255,0.1)',
        padding: '16px 24px',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '8px',
        maxWidth: '1100px',
        margin: '0 auto',
      }}>
        <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', margin: 0 }}>
          © {year} ShopEasy Inc. All rights reserved.
        </p>
        <div style={{ display: 'flex', gap: '16px' }}>
          {['Privacy Policy', 'Terms & Conditions', 'Sitemap'].map((item) => (
            <a key={item} href="#" style={{ ...linkStyle, fontSize: '12px' }}>{item}</a>
          ))}
        </div>
      </div>
    </footer>
  )
}

export default Footer
