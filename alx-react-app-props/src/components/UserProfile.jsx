// src/components/UserProfile.jsx
import { useContext } from 'react';
import UserContext from '../UserContext';

export default function UserProfile({ age, bio }) {
  const { name, email } = useContext(UserContext);

  return (
    <div style={{
      border: '1px solid #ddd',
      padding: '20px',
      margin: '20px',
      borderRadius: '8px'
    }}>
      <h2>{name}</h2>
      <p>Email: {email}</p>
      <p>Age: {age}</p>
      <p>Bio: {bio}</p>
    </div>
  );
}