import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";

function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await API.get("/history");
      setHistory(response.data);
    } catch (error) {
      alert("Failed to fetch history");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-10">
      <h1 className="text-4xl mb-6">History</h1>

      <Link to="/dashboard" className="text-blue-400">
        Back to Dashboard
      </Link>

      <div className="mt-6 space-y-4">
        {history.map((item) => (
          <div key={item.id} className="bg-gray-800 p-4 rounded">
            <p><strong>Input:</strong> {item.input_text}</p>
            <p><strong>Result:</strong> {item.result}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default History;