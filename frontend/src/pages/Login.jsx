import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await API.post("/login", form);

      localStorage.setItem("token", response.data.access_token);

      alert("Login successful");
      navigate("/dashboard");
    } catch (error) {
      alert("Login failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-3xl mb-6">Login</h1>

      <input
        type="email"
        placeholder="Email"
        className="p-2 mb-4 text-black"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input
        type="password"
        placeholder="Password"
        className="p-2 mb-4 text-black"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <button
        onClick={handleLogin}
        className="bg-green-600 px-4 py-2 rounded"
      >
        Login
      </button>

      <Link to="/signup" className="mt-4 text-blue-400">
        Don't have account? Signup
      </Link>
    </div>
  );
}

export default Login;