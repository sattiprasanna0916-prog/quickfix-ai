from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.auth import router as auth_router
from app.routes.quickfix import router as quickfix_router
from app.models.task import Task
from app.routes.task import router as task_router
from app.routes.prioritize import router as prioritize_router
from app.db import Base, engine

Base.metadata.create_all(bind=engine)
app = FastAPI()
app.include_router(task_router)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(prioritize_router)
app.include_router(auth_router)
app.include_router(quickfix_router)