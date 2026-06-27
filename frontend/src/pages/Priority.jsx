import { useEffect, useState } from "react";
import API from "../services/api";

function Priority() {
  const [tasks, setTasks] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchPriority = async () => {
      const res = await API.get("/prioritize", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setTasks(res.data);
    };

    fetchPriority();
  }, []);

  return (
    <div className="history-page">
      <h1>Priority Tasks</h1>

      {tasks.map((task, index) => (
        <div key={task.id} className="card">
          <h2>
  {index === 0
    ? "High Priority"
    : index === 1
    ? "Medium Priority"
    : "Low Priority"}
</h2>
          <h3>{task.title}</h3>
          <p>Deadline: {task.deadline}</p>
          <p>Status: {task.status}</p>
        </div>
      ))}
    </div>
  );
}

export default Priority;