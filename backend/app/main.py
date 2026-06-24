from fastapi import FastAPI
from app.db import Base, engine
from app.routes.auth import router as auth_router
from app.models.user import User
from app.models.session import Session
from app.routes.quickfix import router as quickfix_router
# Create all tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="QuickFix AI API"
)

# Routes
app.include_router(auth_router)
app.include_router(quickfix_router)
# Root route
@app.get("/")
def root():
    return {
        "message": "QuickFix AI Backend Running"
    }