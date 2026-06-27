from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db import get_db
from app.models.task import Task
from app.routes.auth import get_current_user

router = APIRouter()


@router.get("/prioritize")
def prioritize_tasks(
    db: Session = Depends(get_db),
    current_user: int = Depends(get_current_user)
):
    tasks = db.query(Task).filter(
        Task.user_id == current_user,
        Task.status == "Pending"
    ).order_by(Task.deadline.asc()).all()

    return tasks