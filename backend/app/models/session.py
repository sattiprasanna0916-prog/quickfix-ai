from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from datetime import datetime
from app.db import Base


class Session(Base):
    __tablename__ = "sessions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    user_input = Column(String, nullable=False)
    situation_type = Column(String, nullable=False)
    urgency_level = Column(String, nullable=False)
    action_plan = Column(String, nullable=False)
    checklist = Column(String, nullable=False)
    avoid_list = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)