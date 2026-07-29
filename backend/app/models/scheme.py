from sqlalchemy import Column, Integer, String, Text

from app.database import Base


class Scheme(Base):
    __tablename__ = "schemes"

    id = Column(Integer, primary_key=True, index=True)

    scheme_name = Column(String(255), nullable=False)

    description = Column(Text, nullable=False)

    state = Column(String(100), nullable=False)

    category = Column(String(100), nullable=False)

    min_age = Column(Integer)

    max_age = Column(Integer)

    gender = Column(String(20))

    caste = Column(String(50))

    income_limit = Column(Integer)

    benefits = Column(Text)

    application_link = Column(String(500))