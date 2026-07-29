from sqlalchemy.orm import Session

from app.models.scheme import Scheme
from app.schemas.scheme import SchemeCreate


def create_scheme(db: Session, scheme: SchemeCreate):
    new_scheme = Scheme(
        name=scheme.name,
        description=scheme.description,
        ministry=scheme.ministry,
        eligibility=scheme.eligibility,
        benefits=scheme.benefits,
        state=scheme.state
    )

    db.add(new_scheme)
    db.commit()
    db.refresh(new_scheme)

    return new_scheme


def get_all_schemes(db: Session):
    return db.query(Scheme).all()


def get_scheme_by_id(db: Session, scheme_id: int):
    return db.query(Scheme).filter(
        Scheme.id == scheme_id
    ).first()