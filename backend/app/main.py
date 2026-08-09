from fastapi import FastAPI

from app.database import Base, engine
from app.models import User, Scheme, UserProfile, Favorite

from app.routers.auth import router as auth_router
from app.routers.schemes import router as scheme_router
from app.routers.profile import router as profile_router
from app.routers.favorites import router as favorite_router

Base.metadata.create_all(bind=engine)

tags_metadata = [
    {
        "name": "Auth",
        "description": "User registration, login, and authentication endpoints.",
    },
    {
        "name": "Schemes",
        "description": "Create, search, filter, sort, paginate, and manage schemes.",
    },
    {
        "name": "Profile",
        "description": "Create and manage user eligibility profiles.",
    },
    {
        "name": "Favorites",
        "description": "Save and manage favorite schemes for logged-in users.",
    },
]

app = FastAPI(
    title="SchemePilot API",
    description="""
## Government Scheme Recommendation Platform

SchemePilot helps citizens discover government schemes based on their profile.

### Features
- JWT Authentication
- User Profile Management
- Eligibility Matching
- Search & Filter Schemes
- Favorites
- Admin Dashboard
- Role-Based Access Control
- Pagination & Sorting

Built using FastAPI, PostgreSQL and SQLAlchemy.
""",
    version="1.0.0",
    openapi_tags=tags_metadata,
)

app.include_router(auth_router, tags=["Auth"])
app.include_router(scheme_router, tags=["Schemes"])
app.include_router(profile_router, tags=["Profile"])
app.include_router(favorite_router, tags=["Favorites"])


@app.get("/")
def home():
    return {
        "message": "Welcome to SchemePilot API!"
    }