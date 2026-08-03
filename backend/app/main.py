from fastapi import FastAPI

from app.database import Base, engine
from app.models import User
from app.models.scheme import Scheme
from app.models.profile import UserProfile

from app.routers.auth import router as auth_router
from app.routers.schemes import router as scheme_router
from app.routers.profile import router as profile_router
Base.metadata.create_all(bind=engine)

app = FastAPI(title="SchemePilot API")

app.include_router(auth_router)
app.include_router(scheme_router)
app.include_router(profile_router)

@app.get("/")
def home():
    return {
        "message": "Welcome to SchemePilot API!"
    }