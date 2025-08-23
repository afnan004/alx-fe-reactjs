import { useState } from "react";

function RegistrationForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted:", { username, email, password });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 shadow bg-white rounded">
      <h2 className="text-xl font-bold mb-4">Registration Form</h2>

      {/* Username */}
      <div className="mb-3">
        <label className="block mb-1">Username</label>
        <input
          type="text"
          name="username"
          value={username}          // ✅ controlled value
          onChange={(e) => setUsername(e.target.value)}  // ✅ controlled change
          className="border p-2 w-full"
        />
      </div>

      {/* Email */}
      <div className="mb-3">
        <label className="block mb-1">Email</label>
        <input
          type="email"
          name="email"
          value={email}             // ✅ controlled value
          onChange={(e) => setEmail(e.target.value)}  // ✅ controlled change
          className="border p-2 w-full"
        />
      </div>

      {/* Password */}
      <div className="mb-3">
        <label className="block mb-1">Password</label>
        <input
          type="password"
          name="password"
          value={password}          // ✅ controlled value
          onChange={(e) => setPassword(e.target.value)}  // ✅ controlled change
          className="border p-2 w-full"
        />
      </div>

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Register
      </button>
    </form>
  );
}

export default RegistrationForm;
