import { useContext } from 'react';
import UserContext from '../UserContext';

function UserDetails() {
  // 1. Access the data from context
  const userData = useContext(UserContext);

  // 2. Use the data directly
  return (
    <div style={{
      padding: '20px',
      border: '1px solid #ccc',
      margin: '20px'
    }}>
      <h3>User Details</h3>
      <p>Name: {userData?.name}</p>
      <p>Email: {userData?.email}</p>
    </div>
  );
}

export default UserDetails;