export default function Services() {
    const services = [
      "Web Development",
      "Mobile App Development",
      "SEO Optimization",
      "Social Media Marketing",
      "Business Consulting"
    ];
  
    return (
      <div style={{
        padding: '40px 20px',
        backgroundColor: '#ecf0f1',
        borderRadius: '8px',
        maxWidth: '800px',
        margin: '20px auto'
      }}>
        <h1 style={{ color: '#2c3e50' }}>Our Services</h1>
        <ul style={{ 
          listStyle: 'none',
          padding: 0,
          lineHeight: '2'
        }}>
          {services.map((service, index) => (
            <li key={index} style={{ 
              padding: '8px 0',
              borderBottom: '1px solid #bdc3c7'
            }}>
              {service}
            </li>
          ))}
        </ul>
      </div>
    );
  }