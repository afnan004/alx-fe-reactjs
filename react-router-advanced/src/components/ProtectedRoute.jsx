// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // ✅ this ensures "useAuth" exists

export default function ProtectedRoute({ children }) {
  // ✅ explicitly call useAuth
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}

}
