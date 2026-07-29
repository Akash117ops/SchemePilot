from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.schemas.scheme import SchemeCreate, SchemeResponse
from app.schemas.eligibility import EligibilityRequest
from app.services.scheme_service import (
    create_scheme,
    get_all_schemes,
    get_scheme_by_id,
    find_eligible_schemes,
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
    db: Session = Depends(get_db)
):
    return create_scheme(db, scheme)


@router.get("/", response_model=list[SchemeResponse])
def read_schemes(
    db: Session = Depends(get_db)
):
    return get_all_schemes(db)


@router.get("/{scheme_id}", response_model=SchemeResponse)
def read_scheme(
    scheme_id: int,
    db: Session = Depends(get_db)
):
    return get_scheme_by_id(db, scheme_id)


@router.post("/eligible", response_model=list[SchemeResponse])
def get_eligible_schemes(
    user: EligibilityRequest,
    db: Session = Depends(get_db)
):
    return find_eligible_schemes(db, user)