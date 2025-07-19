const UserProfile = (props) => {
  return (
    <div style={{
      border: '1px solid #e2e8f0',
      borderRadius: '8px',
      padding: '1.5rem',
      margin: '1rem 0',
      backgroundColor: '#ffffff',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      maxWidth: '300px'
    }}>
      <h2 style={{
        color: '#1e40af',  // A deeper blue shade
        margin: '0 0 0.75rem 0',
        fontSize: '1.25rem'
      }}>{props.name}</h2>
      
      <p style={{
        margin: '0.5rem 0',
        color: '#4b5563'
      }}>
        Age: <span style={{
          fontWeight: '600',
          color: '#1f2937'
        }}>{props.age}</span>
      </p>
      
      <p style={{
        margin: '0.5rem 0 0 0',
        color: '#6b7280',
        fontStyle: 'italic'
      }}>{props.bio}</p>
    </div>
  );
};

export default UserProfile;