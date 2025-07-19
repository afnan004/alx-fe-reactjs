export default function Footer() {
    return (
      <footer style={{
        backgroundColor: '#2c3e50',
        color: 'white',
        textAlign: 'center',
        padding: '20px',
        marginTop: 'auto'
      }}>
        <p>© {new Date().getFullYear()} My Company. All rights reserved.</p>
      </footer>
    );
  }