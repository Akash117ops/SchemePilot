from fastapi import APIRouter, Depends,HTTPException
from sqlalchemy.orm import Session
from app.utils.dependencies import get_current_user
from app.models.user import User

from app.database import SessionLocal
from app.schemas.scheme import SchemeCreate, SchemeResponse
from app.schemas.eligibility import EligibilityRequest
from app.services.scheme_service import (
    create_scheme,
    get_all_schemes,
    get_scheme_by_id,
    find_eligible_schemes,
    find_eligible_schemes_by_user,
    search_schemes,
    filter_schemes,
)

router = APIRouter(
    prefix="/schemes",
    tags=["Schemes"]
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/", response_model=SchemeResponse)
def add_scheme(
    scheme: SchemeCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return create_scheme(db, scheme)


@router.get("/", response_model=list[SchemeResponse])
def read_schemes(
    db: Session = Depends(get_db)
):
    return get_all_schemes(db)

@router.get("/search", response_model=list[SchemeResponse])
def search_all_schemes(
    keyword: str,
    db: Session = Depends(get_db)
):
    return search_schemes(db, keyword)

@router.get("/filter", response_model=list[SchemeResponse])
def filter_all_schemes(
    state: str | None = None,
    category: str | None = None,
    occupation: str | None = None,
    gender: str | None = None,
    db: Session = Depends(get_db)
):
    return filter_schemes(
        db=db,
        state=state,
        category=category,
        occupation=occupation,
        gender=gender,
    )


@router.get("/{scheme_id}", response_model=SchemeResponse)
def read_scheme(
    scheme_id: int,
    db: Session = Depends(get_db)
):
    scheme = get_scheme_by_id(db, scheme_id)

    if scheme is None:
        raise HTTPException(
            status_code=404,
            detail="Scheme not found"
        )

    return scheme


@router.post("/eligible", response_model=list[SchemeResponse])
def get_eligible_schemes(
    user: EligibilityRequest,
    db: Session = Depends(get_db)
):
    return find_eligible_schemes(db, user)

@router.post("/my-eligible", response_model=list[SchemeResponse])
def get_my_eligible_schemes(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    schemes = find_eligible_schemes_by_user(
        db,
        current_user.id
    )

    if schemes is None:
        raise HTTPException(
            status_code=404,
            detail="Profile not found"
        )

    return schemes

