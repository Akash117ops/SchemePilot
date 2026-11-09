from sqlalchemy import (
    Column,
    Integer,
    ForeignKey,
    UniqueConstraint,
)
from sqlalchemy.orm import relationship

from app.database import Base


class Favorite(Base):
    __tablename__ = "favorites"

    __table_args__ = (
        UniqueConstraint(
            "user_id",
            "scheme_id",
            name="favorites_user_id_scheme_id_key",
        ),
    )

    id = Column(Integer, primary_key=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
    )

    scheme_id = Column(
        Integer,
        ForeignKey("schemes.id", ondelete="CASCADE"),
        nullable=False,
    )

    user = relationship("User")
    scheme = relationship("Scheme")