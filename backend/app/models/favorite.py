from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship

from app.database import Base


class Favorite(Base):
    __tablename__ = "favorites"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    scheme_id = Column(
        Integer,
        ForeignKey("schemes.id"),
        nullable=False
    )

    user = relationship("User")

    scheme = relationship("Scheme")