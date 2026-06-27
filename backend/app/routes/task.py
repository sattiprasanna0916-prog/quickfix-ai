from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db import get_db
from app.schemas import TaskCreate
from app.models.task import Task
from app.routes.auth import get_current_user

router = APIRouter()


@router.post("/tasks")
def create_task(
    task: TaskCreate,
    db: Session = Depends(get_db),
    current_user: int = Depends(get_current_user)
):
    new_task = Task(
        title=task.title,
        deadline=task.deadline,
        user_id=current_user
    )

    db.add(new_task)
    db.commit()
    db.refresh(new_task)

    return new_task


@router.get("/tasks")
def get_tasks(
    db: Session = Depends(get_db),
    current_user: int = Depends(get_current_user)
):
    tasks = db.query(Task).filter(Task.user_id == current_user).all()
    return tasks


@router.put("/tasks/{task_id}/complete")
def complete_task(
    task_id: int,
    db: Session = Depends(get_db),
    current_user: int = Depends(get_current_user)
):
    task = db.query(Task).filter(
        Task.id == task_id,
        Task.user_id == current_user
    ).first()

    task.status = "Completed"
    db.commit()

    return {"message": "Task completed"}