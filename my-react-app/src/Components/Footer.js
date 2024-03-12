import React from 'react';

function Footer() {
    return (
        <footer style={{ ...styles.footer, borderTop: '3px solid #000000' }}>
          <div style={styles.container}>
            <div style={styles.section}>
              <h3>About Us</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
            <div style={styles.section}>
              <h3>© TradeLabs, 2024</h3>
            </div>
            <div style={styles.section}>
              <h3>Contact Us</h3>
              <p>123 Main Street, City, Country</p>
              <p>Email: info@example.com</p>
              <p>Phone: +1234567890</p>
            </div>
          </div>
        </footer>
      );
}

const styles = {
  footer: {
    backgroundColor: '#171d24',
    color: '#fff',
    padding: '50px 0',
    marginTop: '50px',
  },
  container: {
    display: 'flex',
    justifyContent: 'space-around',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  section: {
    flex: 1,
    margin: '0 20px',
  },
};

export default Footer;
