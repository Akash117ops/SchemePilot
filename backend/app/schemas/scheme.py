from pydantic import BaseModel


class SchemeCreate(BaseModel):
    name: str
    description: str
    state: str
    category: str | None = None
    gender: str | None = None
    occupation: str | None = None
    min_age: int | None = None
    max_age: int | None = None
    income_limit: int | None = None


class SchemeResponse(BaseModel):
    id: int
    name: str
    description: str
    state: str
    category: str | None = None
    gender: str | None = None
    occupation: str | None = None
    min_age: int | None = None
    max_age: int | None = None
    income_limit: int | None = None

    class Config:
        from_attributes = True