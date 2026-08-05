from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

from app.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)

    # NEW FIELD
    role = Column(String, default="user", nullable=False)

    profile = relationship(
        "UserProfile",
        back_populates="user",
        uselist=False
    )