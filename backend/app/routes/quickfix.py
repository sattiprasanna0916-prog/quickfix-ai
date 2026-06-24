from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.schemas import AnalyzeRequest
from app.services.gemini_service import analyze_situation
from app.db import get_db
from app.models.session import Session as UserSession

router = APIRouter()


@router.post("/analyze")
def analyze(
    data: AnalyzeRequest,
    db: Session = Depends(get_db)
):
    result = analyze_situation(data.user_input)

    new_session = UserSession(
        user_id=1,
        input_text=data.user_input,
        result=str(result)
    )

    db.add(new_session)
    db.commit()

    return result
@router.get("/history")
def get_history(db: Session = Depends(get_db)):
    history = db.query(UserSession).all()

    return [
        {
            "id": item.id,
            "user_id": item.user_id,
            "input_text": item.input_text,
            "result": item.result
        }
        for item in history
    ]