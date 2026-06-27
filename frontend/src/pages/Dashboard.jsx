import { useState, useEffect } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";
import {
  FaSignOutAlt,
  FaHistory,
  FaBolt,
  FaTasks,
  FaCheckCircle
} from "react-icons/fa";

function Dashboard() {
  const [userInput, setUserInput] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState("");
const [deadline, setDeadline] = useState("");
  const token = localStorage.getItem("token");
  const handleCreateTask = async () => {
  if (!taskTitle || !deadline) {
    alert("Please fill all fields");
    return;
  }

  try {
    await API.post(
      "/tasks",
      {
        title: taskTitle,
        deadline: deadline
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    setTaskTitle("");
    setDeadline("");
    fetchTasks();

    alert("Task added successfully");
  } catch {
    alert("Task creation failed");
  }
};
  const fetchTasks = async () => {
    const res = await API.get("/tasks", {
      headers: { Authorization: `Bearer ${token}` }
    });
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };
const handleCompleteTask = async (taskId) => {
  try {
    await API.put(
      `/tasks/${taskId}/complete`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    fetchTasks();
  } catch {
    alert("Failed to complete task");
  }
};
  const handleAnalyze = async () => {
    if (!userInput.trim()) {
      alert("Please enter your situation");
      return;
    }

    try {
      setLoading(true);

      const response = await API.post(
        "/analyze",
        { user_input: userInput },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setResult(response.data);
      setLoading(false);
    } catch {
      setLoading(false);
      alert("Analysis failed");
    }
  };

  return (
    <div className="dashboard">
      <div className="topbar">
        <h1>QuickFix AI</h1>

        <button className="logout-btn" onClick={handleLogout}>
          <FaSignOutAlt /> Logout
        </button>
      </div>

      <div className="card input-card">
        <h2>AI Productivity Rescue</h2>
 <div className="task-form">
  <input
    type="text"
    placeholder="Task title"
    value={taskTitle}
    onChange={(e) => setTaskTitle(e.target.value)}
  />

  <input
    type="datetime-local"
    value={deadline}
    onChange={(e) => setDeadline(e.target.value)}
  />

  <button className="task-btn" onClick={handleCreateTask}>
    Add Task
  </button>
</div>
        <textarea
          placeholder="Describe your urgent task/problem..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />

        <button className="analyze-btn" onClick={handleAnalyze}>
          <FaBolt /> {loading ? "Analyzing..." : "Analyze"}
        </button>
      </div>

      <div className="stats-grid">
        <div className="card stat">
          <FaTasks />
          <h3>Total Tasks</h3>
          <p>{tasks.length}</p>
        </div>

        <div className="card stat">
          <FaCheckCircle />
          <h3>Completed</h3>
          <p>{tasks.filter((t) => t.status === "Completed").length}</p>
        </div>
      </div>
   <div className="task-list">
  <h2>Your Tasks</h2>

  {tasks.length > 0 ? (
    tasks.map((task) => (
      <div
  key={task.id}
  className={`card ${
    new Date(task.deadline) < new Date() &&
    task.status !== "Completed"
      ? "overdue"
      : ""
  }`}
>
        <h3>{task.title}</h3>
        <p><strong>Deadline:</strong> {task.deadline}</p>
        <p><strong>Status:</strong> {task.status}</p>
        <p><strong>Priority:</strong> {task.priority}</p>
        {task.status !== "Completed" && (
  <button
    className="complete-btn"
    onClick={() => handleCompleteTask(task.id)}
  >
    Mark Complete
  </button>
)}
<div className="card stat">
  <h3>Completion Rate</h3>
  <p>
    {tasks.length > 0
      ? Math.round(
          (tasks.filter((t) => t.status === "Completed").length /
            tasks.length) *
            100
        )
      : 0}
    %
  </p>
</div>
      </div>
    ))
  ) : (
    <div className="card">
      <p>No tasks added yet.</p>
    </div>
  )}
</div>
      {result && (
  <div className="result-grid">

    <div className="card dark">
      <h2>Situation Type</h2>
      <p>{result.situation_type}</p>
    </div>

    <div className="card red">
      <h2>Urgency Level</h2>
      <p>{result.urgency_level}</p>
    </div>

    <div className="card blue">
      <h2>Action Plan</h2>
      <p>{result.action_plan}</p>
    </div>

    <div className="card green">
      <h2>Checklist</h2>
      <ul>
        {result.checklist?.map((item, index) => (
          <li key={index}>• {item}</li>
        ))}
      </ul>
    </div>

    <div className="card yellow">
      <h2>Avoid</h2>
      <ul>
        {result.avoid_list?.map((item, index) => (
          <li key={index}>• {item}</li>
        ))}
      </ul>
    </div>

  </div>
)}
      <a href="/history" className="history-btn">
        <FaHistory /> View History
      </a>
      <Link to="/priority" className="priority-btn">
  View Priority Tasks
</Link>
    </div>
  );
}

export default Dashboard;