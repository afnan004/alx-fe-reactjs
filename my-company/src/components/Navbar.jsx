import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav style={{
      backgroundColor: '#2c3e50',
      padding: '15px 20px',
      display: 'flex',
      justifyContent: 'center', // Added this line
      gap: '20px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <Link 
        to="/" 
        style={{ 
          color: 'white', 
          textDecoration: 'none',
          fontWeight: 'bold',
          padding: '8px 12px'
        }}
      >
        Home
      </Link>
      {/* Other Link components remain the same */}
    </nav>
  );
}