from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.models.user import User
from app.schemas.favorite import FavoriteResponse
from app.schemas.scheme import SchemeResponse
from app.services.favorite_service import (
    add_favorite,
    get_favorites,
    remove_favorite,
)
from app.utils.dependencies import get_current_user

router = APIRouter(
    prefix="/favorites",
    tags=["Favorites"]
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/{scheme_id}", response_model=FavoriteResponse)
def save_favorite(
    scheme_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    favorite = add_favorite(
        db,
        current_user.id,
        scheme_id
    )

    if favorite is None:
        raise HTTPException(
            status_code=404,
            detail="Scheme not found"
        )

    return favorite


@router.get("/", response_model=list[SchemeResponse])
def read_favorites(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return get_favorites(
        db,
        current_user.id
    )


@router.delete("/{scheme_id}")
def delete_favorite(
    scheme_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    deleted = remove_favorite(
        db,
        current_user.id,
        scheme_id
    )

    if not deleted:
        raise HTTPException(
            status_code=404,
            detail="Favorite not found"
        )

    return {
        "message": "Favorite removed successfully"
    }