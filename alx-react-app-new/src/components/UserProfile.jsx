const UserProfile = (props) => {
  return (
    <div style={{
      border: '2px solid #e0e0e0',
      borderRadius: '8px',
      padding: '20px',
      margin: '20px 0',
      backgroundColor: '#f8f9fa',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{
        color: '#2c3e50',
        marginBottom: '10px',
        borderBottom: '1px solid #eee',
        paddingBottom: '10px'
      }}>{props.name}</h2>
      <p style={{ margin: '8px 0', color: '#7f8c8d' }}>
        Age: <span style={{ fontWeight: 'bold', color: '#34495e' }}>{props.age}</span>
      </p>
      <p style={{ 
        margin: '8px 0',
        fontStyle: 'italic',
        color: '#34495e'
      }}>{props.bio}</p>
    </div>
  );
};
export default UserProfile;