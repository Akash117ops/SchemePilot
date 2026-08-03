from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.models.user import User
from app.schemas.profile import (
    ProfileCreate,
    ProfileUpdate,
    ProfileResponse,
)
from app.services.profile_service import (
    create_profile,
    get_profile,
    update_profile,
)
from app.utils.dependencies import get_current_user

router = APIRouter(
    prefix="/profile",
    tags=["Profile"]
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/", response_model=ProfileResponse)
def create_user_profile(
    profile: ProfileCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    new_profile = create_profile(
        db,
        current_user.id,
        profile
    )

    if new_profile is None:
        raise HTTPException(
            status_code=400,
            detail="Profile already exists"
        )

    return new_profile

@router.get("/", response_model=ProfileResponse)
def read_my_profile(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    profile = get_profile(db, current_user.id)

    if profile is None:
        raise HTTPException(
            status_code=404,
            detail="Profile not found"
        )

    return profile

@router.put("/", response_model=ProfileResponse)
def update_my_profile(
    profile: ProfileUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    updated_profile = update_profile(
        db,
        current_user.id,
        profile
    )

    if updated_profile is None:
        raise HTTPException(
            status_code=404,
            detail="Profile not found"
        )

    return updated_profile

    