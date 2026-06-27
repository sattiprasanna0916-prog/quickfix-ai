from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

# User Signup
class UserSignup(BaseModel):
    username: str
    email: EmailStr
    password: str


# User Login
class UserLogin(BaseModel):
    email: EmailStr
    password: str


# AI Analyze Input
class AnalyzeRequest(BaseModel):
    user_input: str


# AI Analyze Output
class AnalyzeResponse(BaseModel):
    situation_type: str
    urgency_level: str
    action_plan: str
    checklist: str
    avoid_list: str


# Save Session
class SaveSession(BaseModel):
    user_id: int
    user_input: str
    situation_type: str
    urgency_level: str
    action_plan: str
    checklist: str
    avoid_list: str


# Token Response
class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
class TaskCreate(BaseModel):
    title: str
    deadline: datetime


class TaskResponse(BaseModel):
    id: int
    title: str
    deadline: datetime
    priority: str
    status: str