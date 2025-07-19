import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav style={{
      backgroundColor: '#2c3e50',
      padding: '15px 20px',
      display: 'flex',
      gap: '20px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <Link 
        to="/" 
        style={{ 
          color: 'white', 
          textDecoration: 'none',
          fontWeight: 'bold'
        }}
      >
        Home
      </Link>
      <Link 
        to="/about" 
        style={{ 
          color: 'white', 
          textDecoration: 'none',
          fontWeight: 'bold'
        }}
      >
        About
      </Link>
      <Link 
        to="/services" 
        style={{ 
          color: 'white', 
          textDecoration: 'none',
          fontWeight: 'bold'
        }}
      >
        Services
      </Link>
      <Link 
        to="/contact" 
        style={{ 
          color: 'white', 
          textDecoration: 'none',
          fontWeight: 'bold'
        }}
      >
        Contact
      </Link>
    </nav>
  );
}