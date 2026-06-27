from sqlalchemy import Column, Integer, String, DateTime
from app.db import Base


class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    deadline = Column(DateTime)
    priority = Column(String, default="Medium")
    status = Column(String, default="Pending")
    user_id = Column(Integer)