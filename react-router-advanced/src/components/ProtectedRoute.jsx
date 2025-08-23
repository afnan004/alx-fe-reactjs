import { Navigate } from "react-router-dom";

// Simple fake auth (you can swap with real auth later)
const isAuthenticated = () => {
  return localStorage.getItem("auth") === "true";
};

export default function ProtectedRoute({ children }) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
