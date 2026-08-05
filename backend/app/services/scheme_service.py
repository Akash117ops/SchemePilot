from sqlalchemy.orm import Session
from app.models.profile import UserProfile
from sqlalchemy import asc, desc

from app.models.scheme import Scheme
from app.schemas.scheme import SchemeCreate
from app.schemas.eligibility import EligibilityRequest


def create_scheme(db: Session, scheme: SchemeCreate):
    new_scheme = Scheme(
        name=scheme.name,
        description=scheme.description,
        state=scheme.state,
        category=scheme.category,
        gender=scheme.gender,
        occupation=scheme.occupation,
        min_age=scheme.min_age,
        max_age=scheme.max_age,
        income_limit=scheme.income_limit,
    )

    db.add(new_scheme)
    db.commit()
    db.refresh(new_scheme)

    return new_scheme


def get_all_schemes(db: Session):
    return db.query(Scheme).all()


def get_scheme_by_id(db: Session, scheme_id: int):
    return db.query(Scheme).filter(Scheme.id == scheme_id).first()


def find_eligible_schemes(db: Session, user: EligibilityRequest):
    schemes = db.query(Scheme).all()

    eligible = []

    for scheme in schemes:

        # State
        if scheme.state.lower() != user.state.lower():
            continue

        # Category
        if scheme.category and scheme.category.lower() != "any":
            if scheme.category.lower() != user.category.lower():
                continue

        # Gender
        if scheme.gender and scheme.gender.lower() != "any":
            if scheme.gender.lower() != user.gender.lower():
                continue

        # Occupation
        if scheme.occupation and scheme.occupation.lower() != "any":
            if scheme.occupation.lower() != user.occupation.lower():
                continue

        # Minimum age
        if scheme.min_age is not None:
            if user.age < scheme.min_age:
                continue

        # Maximum age
        if scheme.max_age is not None:
            if user.age > scheme.max_age:
                continue

        # Income limit
        if scheme.income_limit is not None:
            if user.annual_income > scheme.income_limit:
                continue

        eligible.append(scheme)

    return eligible

def find_eligible_schemes_by_user(db: Session, user_id: int):
    profile = (
        db.query(UserProfile)
        .filter(UserProfile.user_id == user_id)
        .first()
    )

    if profile is None:
        return None

    schemes = db.query(Scheme).all()

    eligible = []

    for scheme in schemes:

        if scheme.state.lower() != profile.state.lower():
            continue

        if scheme.category and scheme.category.lower() != "any":
            if scheme.category.lower() != profile.category.lower():
                continue

        if scheme.gender and scheme.gender.lower() != "any":
            if scheme.gender.lower() != profile.gender.lower():
                continue

        if scheme.occupation and scheme.occupation.lower() != "any":
            if scheme.occupation.lower() != profile.occupation.lower():
                continue

        if scheme.min_age is not None:
            if profile.age < scheme.min_age:
                continue

        if scheme.max_age is not None:
            if profile.age > scheme.max_age:
                continue

        if scheme.income_limit is not None:
            if profile.annual_income > scheme.income_limit:
                continue

        eligible.append(scheme)

    return eligible

def search_schemes(db: Session, keyword: str):
    return (
        db.query(Scheme)
        .filter(
            (Scheme.name.ilike(f"%{keyword}%")) |
            (Scheme.description.ilike(f"%{keyword}%"))
        )
        .all()
    )

def filter_schemes(
    db: Session,
    state: str = None,
    category: str = None,
    occupation: str = None,
    gender: str = None,
):
    query = db.query(Scheme)

    if state:
        query = query.filter(Scheme.state.ilike(state))

    if category:
        query = query.filter(Scheme.category.ilike(category))

    if occupation:
        query = query.filter(Scheme.occupation.ilike(occupation))

    if gender:
        query = query.filter(Scheme.gender.ilike(gender))

    return query.all()

def get_schemes_paginated(
    db: Session,
    page: int = 1,
    limit: int = 10,
):
    offset = (page - 1) * limit

    return (
        db.query(Scheme)
        .offset(offset)
        .limit(limit)
        .all()
    )

from sqlalchemy import asc, desc


def sort_schemes(
    db: Session,
    sort_by: str = "name",
    order: str = "asc",
):
    allowed_fields = {
        "name": Scheme.name,
        "income_limit": Scheme.income_limit,
        "min_age": Scheme.min_age,
        "max_age": Scheme.max_age,
    }

    column = allowed_fields.get(sort_by)

    if column is None:
        return []

    if order.lower() == "desc":
        return (
            db.query(Scheme)
            .order_by(desc(column))
            .all()
        )

    return (
        db.query(Scheme)
        .order_by(asc(column))
        .all()
    )