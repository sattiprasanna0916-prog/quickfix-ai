# QuickFix AI 
# QuickFix AI 🚀

QuickFix AI is an **AI-powered productivity companion** designed to help students, professionals, and entrepreneurs avoid missing deadlines by intelligently prioritizing tasks, analyzing urgent situations, and providing actionable plans.

## 🌟 Live Demo

**Frontend:** https://quickfix-ai.vercel.app
**Backend API:** https://quickfix-ai-ayf3.onrender.com

---

## Problem Statement

People often miss:

* Assignments
* Interviews
* Meetings
* Bill payments
* Project deadlines

Traditional reminder apps only notify users, but they don’t help users **take action**.

QuickFix AI solves this by acting as an **AI Productivity Rescue Assistant**.

---

## Features

### ✅ AI Urgency Analysis

Analyze user situations and identify:

* Situation Type
* Urgency Level
* Action Plan
* Checklist
* Avoid List

---

### ✅ Smart Task Management

Users can:

* Add tasks
* Set deadlines
* Track task status
* Mark tasks as completed

---

### ✅ Intelligent Task Prioritization

Tasks are automatically prioritized based on deadlines.

---

### ✅ Productivity Tracking

Track:

* Total tasks
* Completed tasks
* Completion rate

---

### ✅ History Tracking

Stores previous AI analyses for future reference.

---

## Tech Stack

### Frontend

* React.js
* Vite
* Tailwind CSS
* Axios
* React Router
* React Icons

### Backend

* FastAPI
* SQLAlchemy
* PostgreSQL
* JWT Authentication
* Gemini API

### Deployment

* Vercel (Frontend)
* Render (Backend)
* Render PostgreSQL

---

## Project Structure

```bash
quickfix-ai/
│── backend/
│   │── app/
│   │   │── models/
│   │   │── routes/
│   │   │── services/
│   │   │── schemas.py
│   │   │── db.py
│   │   │── main.py
│   │── requirements.txt
│   │── Procfile
│
│── frontend/
│   │── src/
│   │   │── pages/
│   │   │── services/
│   │── package.json
```

---

## Installation

### Backend Setup

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Backend runs on:

```bash
http://127.0.0.1:8000
```

---

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

## API Endpoints

### Authentication

* `POST /signup`
* `POST /login`

### AI Analysis

* `POST /analyze`

### Task Management

* `POST /tasks`
* `GET /tasks`
* `PUT /tasks/{id}/complete`

### History

* `GET /history`

### Prioritization

* `GET /prioritize`

---

## Use Cases

* Exam preparation
* Interview preparation
* Assignment deadlines
* Bill payments
* Meeting planning
* Startup/product launch planning

---

## Future Improvements

* Google Calendar integration
* Voice assistant
* Smart notifications
* Habit tracking
* Team productivity dashboard

---

## Author

**Satti Prasanna Lakshmi**
AI/ML Engineer | Full Stack Developer | Generative AI Enthusiast

GitHub: https://github.com/sattiprasanna0916-prog
