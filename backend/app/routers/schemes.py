from fastapi import APIRouter, Depends,HTTPException
from sqlalchemy.orm import Session
from app.dependencies import (
    get_current_user,
    get_current_admin,
)
from app.models.user import User

from app.database import SessionLocal
from app.schemas.scheme import SchemeCreate, SchemeResponse
from app.schemas.eligibility import EligibilityRequest
from app.services.scheme_service import (
    create_scheme,
    update_scheme,
    delete_scheme,
    get_all_schemes,
    get_scheme_by_id,
    find_eligible_schemes,
    find_eligible_schemes_by_user,
    search_schemes,
    filter_schemes,
    get_schemes_paginated,
    sort_schemes,
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
    current_user: User = Depends(get_current_admin)
):
    return create_scheme(db, scheme)


@router.put("/{scheme_id}", response_model=SchemeResponse)
def edit_scheme(
    scheme_id: int,
    updated_scheme: SchemeCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin),
):
    scheme = update_scheme(
        db=db,
        scheme_id=scheme_id,
        updated_scheme=updated_scheme,
    )

    if scheme is None:
        raise HTTPException(
            status_code=404,
            detail="Scheme not found",
        )

    return scheme

@router.delete("/{scheme_id}")
def remove_scheme(
    scheme_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin),
):
    deleted = delete_scheme(
        db=db,
        scheme_id=scheme_id,
    )

    if not deleted:
        raise HTTPException(
            status_code=404,
            detail="Scheme not found",
        )

    return {
        "message": "Scheme deleted successfully"
    }


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

@router.get("/paginated", response_model=list[SchemeResponse])
def read_schemes_paginated(
    page: int = 1,
    limit: int = 10,
    db: Session = Depends(get_db)
):
    return get_schemes_paginated(
        db=db,
        page=page,
        limit=limit,
    )
@router.get("/sorted", response_model=list[SchemeResponse])
def read_sorted_schemes(
    sort_by: str = "name",
    order: str = "asc",
    db: Session = Depends(get_db)
):
    return sort_schemes(
        db=db,
        sort_by=sort_by,
        order=order,
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

