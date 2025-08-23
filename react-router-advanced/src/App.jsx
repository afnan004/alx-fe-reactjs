// src/App.jsx
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import Home from "./components/Home";
import Blog from "./components/Blog";
import BlogPost from "./components/BlogPost";
import Profile from "./components/Profile";
import ProfileDetails from "./components/ProfileDetails";
import ProfileSettings from "./components/ProfileSettings";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <div>
        <nav style={{ display: "flex", gap: 12, marginBottom: 16 }}>
          <Link to="/">Home</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/profile">Profile</Link>
        </nav>

        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:postId" element={<BlogPost />} />
          <Route path="/login" element={<Login />} />

          {/* Protected + Nested Routes */}
          <Route
            path="/profile/*"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          >
            <Route path="details" element={<ProfileDetails />} />
            <Route path="settings" element={<ProfileSettings />} />
            <Route index element={<Navigate to="details" replace />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
