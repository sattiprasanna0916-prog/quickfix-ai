import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
  const [form, setForm] = useState({
  username: "",
  email: "",
  password: ""
});
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await API.post("/signup", form);
      alert("Signup successful");
      navigate("/");
    } catch (error) {
      alert("Signup failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-3xl mb-6">Signup</h1>
       <input
  type="text"
  placeholder="Username"
  className="p-2 mb-4 text-black"
  onChange={(e) => setForm({ ...form, username: e.target.value })}
/>
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
        onClick={handleSignup}
        className="bg-blue-600 px-4 py-2 rounded"
      >
        Signup
      </button>

      <Link to="/" className="mt-4 text-blue-400">
        Already have account? Login
      </Link>
    </div>
  );
}

export default Signup;