from sqlalchemy import Column, Integer, String, ForeignKey
from app.db import Base


class Session(Base):
    __tablename__ = "sessions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("quickfix_users.id"))
    input_text = Column(String)
    result = Column(String)