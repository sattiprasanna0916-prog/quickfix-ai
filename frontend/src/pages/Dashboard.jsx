import { useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";

function Dashboard() {
  const [userInput, setUserInput] = useState("");
  const [result, setResult] = useState(null);
  const handleLogout = () => {
  localStorage.removeItem("token");
  window.location.href = "/";
};
  const handleAnalyze = async () => {
    try {
      const token = localStorage.getItem("token");
  
const response = await API.post(
  "/analyze",
  {
    user_input: userInput
  },
  {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
);
      setResult(response.data);
    } catch (error) {
      alert("Analysis failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-10">
      <h1 className="text-4xl mb-6">QuickFix AI</h1>

      <textarea
        placeholder="Describe your urgent situation..."
        className="w-full p-4 text-black rounded"
        rows="5"
        onChange={(e) => setUserInput(e.target.value)}
      />

      <button
        onClick={handleAnalyze}
        className="mt-4 bg-blue-600 px-6 py-2 rounded"
      >
        Analyze
      </button>
      <button
  onClick={handleLogout}
  className="mt-4 bg-red-600 px-4 py-2 rounded"
>
  Logout
</button>
      <Link to="/history" className="block mt-6 text-blue-400">
        View History
      </Link>

      {result && (
        <div className="mt-8 bg-gray-800 p-6 rounded">
          <h2 className="text-2xl mb-4">Analysis Result</h2>

          <p><strong>Situation:</strong> {result.situation_type}</p>
          <p><strong>Urgency:</strong> {result.urgency_level}</p>
          <p><strong>Action Plan:</strong> {result.action_plan}</p>
          <p><strong>Checklist:</strong> {result.checklist}</p>
          <p><strong>Avoid:</strong> {result.avoid_list}</p>
        </div>
      )}
    </div>
  );
}

export default Dashboard;