import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

function History() {
  const [history, setHistory] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchHistory = async () => {
      const res = await API.get("/history", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setHistory(res.data);
    };

    fetchHistory();
  }, []);

  return (
    <div className="history-page">
      <div className="topbar">
        <h1>History</h1>

        <Link to="/dashboard" className="back-btn">
          <FaArrowLeft /> Back to Dashboard
        </Link>
      </div>

      <div className="history-grid">
        {history.length > 0 ? (
          history.map((item) => (
            <div key={item.id} className="card">
              <h3>{item.input_text}</h3>
              <p>{item.result}</p>
            </div>
          ))
        ) : (
          <div className="card">
            <p>No history found.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default History;