// src/UserContext.js
import { createContext } from 'react';

// 1. Create context with proper default structure
const UserContext = createContext({
  name: '',
  email: '',
  updateUser: () => {} // Optional: include function stub if you'll update context
});
export default UserContext;