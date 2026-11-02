from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from app.dependencies import get_db, get_current_user

from app.models.user import User
from app.schemas.user import UserCreate
from app.services.user_service import create_user, login_user


router = APIRouter(prefix="/auth", tags=["Authentication"])





@router.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):
    new_user = create_user(db, user)

    if not new_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    return {
        "message": "User registered successfully"
    }


@router.post("/login")
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    token = login_user(db, form_data.username, form_data.password)

    if not token:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    return token


@router.get("/me")
def get_me(current_user: User = Depends(get_current_user)):
    return {
        "id": current_user.id,
        "full_name": current_user.full_name,
        "email": current_user.email
    }