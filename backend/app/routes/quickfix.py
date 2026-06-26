from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.schemas import AnalyzeRequest
from app.services.gemini_service import analyze_situation
from app.db import get_db
from app.models.session import Session as UserSession
from app.routes.auth import get_current_user

router = APIRouter()


@router.post("/analyze")
def analyze(
    data: AnalyzeRequest,
    db: Session = Depends(get_db),
    current_user: int = Depends(get_current_user)
):
    result = analyze_situation(data.user_input)

    new_session = UserSession(
        user_id=current_user,
        input_text=data.user_input,
        result=str(result)
    )

    db.add(new_session)
    db.commit()

    return result


@router.get("/history")
def get_history(
    db: Session = Depends(get_db),
    current_user: int = Depends(get_current_user)
):
    history = db.query(UserSession).filter(
        UserSession.user_id == current_user
    ).all()

    return history