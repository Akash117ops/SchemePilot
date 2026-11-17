
from pydantic import BaseModel, ConfigDict


class SchemeCreate(BaseModel):
    name: str
    description: str

    benefits: str | None = None
    required_documents: str | None = None
    application_link: str | None = None
    official_website: str | None = None

    state: str
    category: str | None = None
    gender: str | None = None
    occupation: str | None = None
    min_age: int | None = None
    max_age: int | None = None
    income_limit: int | None = None


class SchemeCardResponse(BaseModel):
    id: int
    name: str
    description: str
    benefits: str | None = None
    required_documents: str | None = None

    model_config = ConfigDict(from_attributes=True)


class SchemeResponse(BaseModel):
    id: int
    name: str
    description: str

    benefits: str | None = None
    required_documents: str | None = None
    application_link: str | None = None
    official_website: str | None = None

    state: str
    category: str | None = None
    gender: str | None = None
    occupation: str | None = None
    min_age: int | None = None
    max_age: int | None = None
    income_limit: int | None = None

    model_config = ConfigDict(from_attributes=True)
