// src/App.jsx
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Profile from "./components/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import Blog from "./components/Blog";
import BlogPost from "./components/BlogPost";

function App() {
  const isAuthenticated = true; // simulate auth

  return (
    <BrowserRouter>
      <nav style={{ display: "flex", gap: 12 }}>
        <Link to="/">Home</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/blog">Blog</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />

        {/* Protected profile */}
        <Route
          path="/profile/*"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* Dynamic blog routes */}
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogPost />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
