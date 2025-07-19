import { useState } from 'react';
import UserContext from './UserContext';
import Counter from './components/Counter';
import UserProfile from './components/UserProfile';
import Header from './components/Header';
import MainContent from './components/MainContent';
import Footer from './components/Footer';

export default function App() {
  const [userData] = useState({
    name: "Jane Doe",
    email: "jane.doe@example.com"
  });

  return (
    <UserContext.Provider value={userData}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
        <Header />
        <MainContent />
        <UserProfile 
          age={25} 
          bio="Loves hiking and photography" 
        />
        <Counter />
        <Footer />
      </div>
    </UserContext.Provider>
  );
}