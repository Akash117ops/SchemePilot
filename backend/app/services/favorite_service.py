from sqlalchemy.orm import Session

from app.models.favorite import Favorite
from app.models.scheme import Scheme


def add_favorite(
    db: Session,
    user_id: int,
    scheme_id: int,
):
    # Check if scheme exists
    scheme = (
        db.query(Scheme)
        .filter(Scheme.id == scheme_id)
        .first()
    )

    if scheme is None:
        return None

    # Check if already favorited
    existing = (
        db.query(Favorite)
        .filter(
            Favorite.user_id == user_id,
            Favorite.scheme_id == scheme_id
        )
        .first()
    )

    if existing:
        return existing

    favorite = Favorite(
        user_id=user_id,
        scheme_id=scheme_id
    )

    db.add(favorite)
    db.commit()
    db.refresh(favorite)

    return favorite


def get_favorites(
    db: Session,
    user_id: int,
):
    return (
        db.query(Scheme)
        .join(Favorite)
        .filter(Favorite.user_id == user_id)
        .all()
    )


def remove_favorite(
    db: Session,
    user_id: int,
    scheme_id: int,
):
    favorite = (
        db.query(Favorite)
        .filter(
            Favorite.user_id == user_id,
            Favorite.scheme_id == scheme_id
        )
        .first()
    )

    if favorite is None:
        return False

    db.delete(favorite)
    db.commit()

    return True