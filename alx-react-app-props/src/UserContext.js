import { createContext } from 'react';

// 1. Create the container (like an empty box)
const UserContext = createContext(null); 

// 2. Export the box so components can use it
export default UserContext; 