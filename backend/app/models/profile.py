from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

from app.database import Base


class UserProfile(Base):
    __tablename__ = "user_profiles"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        unique=True,
        nullable=False
    )

    age = Column(Integer, nullable=False)

    gender = Column(String, nullable=False)

    state = Column(String, nullable=False)

    category = Column(String, nullable=False)

    occupation = Column(String, nullable=False)

    annual_income = Column(Integer, nullable=False)

    user = relationship(
        "User",
        back_populates="profile"
    )