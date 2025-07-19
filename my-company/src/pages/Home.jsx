export default function Home() {
    return (
      <div style={{
        textAlign: 'center',
        padding: '40px 20px',
        backgroundColor: '#ecf0f1',
        borderRadius: '8px',
        maxWidth: '800px',
        margin: '20px auto'
      }}>
        <h1 style={{ color: '#2c3e50' }}>Welcome to Our Company</h1>
        <p style={{ 
          fontSize: '18px',
          lineHeight: '1.6',
          color: '#34495e'
        }}>
          We deliver innovative solutions tailored to your business needs.
        </p>
      </div>
    );
  }