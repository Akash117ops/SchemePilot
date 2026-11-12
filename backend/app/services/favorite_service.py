
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError

from app.models.favorite import Favorite
from app.models.scheme import Scheme


def add_favorite(
    db: Session,
    user_id: int,
    scheme_id: int,
):
    # Check whether the scheme exists.
    scheme = (
        db.query(Scheme)
        .filter(Scheme.id == scheme_id)
        .first()
    )

    if scheme is None:
        return None

    # Return the existing favorite if already present.
    existing = (
        db.query(Favorite)
        .filter(
            Favorite.user_id == user_id,
            Favorite.scheme_id == scheme_id,
        )
        .first()
    )

    if existing:
        return existing

    favorite = Favorite(
        user_id=user_id,
        scheme_id=scheme_id,
    )

    try:
        db.add(favorite)
        db.commit()
        db.refresh(favorite)
        return favorite

    except IntegrityError:
        db.rollback()

        # Handle a concurrent request that created the same favorite.
        existing = (
            db.query(Favorite)
            .filter(
                Favorite.user_id == user_id,
                Favorite.scheme_id == scheme_id,
            )
            .first()
        )

        if existing:
            return existing

        # Preserve unexpected integrity errors.
        raise

    except Exception:
        db.rollback()
        raise


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
            Favorite.scheme_id == scheme_id,
        )
        .first()
    )

    if favorite is None:
        return False

    try:
        db.delete(favorite)
        db.commit()
        return True

    except Exception:
        db.rollback()
        raise
