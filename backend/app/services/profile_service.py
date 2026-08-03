from sqlalchemy.orm import Session

from app.models.profile import UserProfile
from app.schemas.profile import (
    ProfileCreate,
    ProfileUpdate,
)


def create_profile(db: Session, user_id: int, profile: ProfileCreate):
    existing_profile = (
        db.query(UserProfile)
        .filter(UserProfile.user_id == user_id)
        .first()
    )

    if existing_profile:
        return None

    new_profile = UserProfile(
        user_id=user_id,
        age=profile.age,
        gender=profile.gender,
        state=profile.state,
        category=profile.category,
        occupation=profile.occupation,
        annual_income=profile.annual_income,
    )

    db.add(new_profile)
    db.commit()
    db.refresh(new_profile)

    return new_profile


def get_profile(db: Session, user_id: int):
    return (
        db.query(UserProfile)
        .filter(UserProfile.user_id == user_id)
        .first()
    )


def update_profile(
    db: Session,
    user_id: int,
    profile_data: ProfileUpdate,
):
    profile = (
        db.query(UserProfile)
        .filter(UserProfile.user_id == user_id)
        .first()
    )

    if profile is None:
        return None

    profile.age = profile_data.age
    profile.gender = profile_data.gender
    profile.state = profile_data.state
    profile.category = profile_data.category
    profile.occupation = profile_data.occupation
    profile.annual_income = profile_data.annual_income

    db.commit()
    db.refresh(profile)

    return profile