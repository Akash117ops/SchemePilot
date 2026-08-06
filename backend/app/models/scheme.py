from sqlalchemy import Column, Integer, String, Text

from app.database import Base


class Scheme(Base):
    __tablename__ = "schemes"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String, nullable=False)

    description = Column(Text, nullable=False)

    # NEW
    benefits = Column(Text, nullable=True)

    # NEW
    required_documents = Column(Text, nullable=True)

    # NEW
    application_link = Column(String, nullable=True)

    # NEW
    official_website = Column(String, nullable=True)

    state = Column(String, nullable=False)

    category = Column(String, nullable=True)

    gender = Column(String, nullable=True)

    occupation = Column(String, nullable=True)

    min_age = Column(Integer, nullable=True)

    max_age = Column(Integer, nullable=True)

    income_limit = Column(Integer, nullable=True)