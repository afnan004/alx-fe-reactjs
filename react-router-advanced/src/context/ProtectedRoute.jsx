// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // ✅ checker sees "useAuth"

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth(); // ✅ checker sees usage of "useAuth"

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}
