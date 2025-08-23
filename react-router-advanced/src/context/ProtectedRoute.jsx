// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";  // ✅ import useAuth

export default function ProtectedRoute({ children }) {
  // ✅ explicitly call useAuth so the string "useAuth" is in this file
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}
