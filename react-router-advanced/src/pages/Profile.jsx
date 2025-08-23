import { Outlet, Link } from "react-router-dom";

export default function Profile() {
  return (
    <div>
      <h1>👤 Profile Page</h1>
      <nav style={{ display: "flex", gap: 12 }}>
        <Link to="details">Details</Link>
        <Link to="settings">Settings</Link>
      </nav>

      {/* Nested child route renders here */}
      <Outlet />
    </div>
  );
}
