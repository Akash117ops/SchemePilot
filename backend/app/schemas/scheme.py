from pydantic import BaseModel


class SchemeCreate(BaseModel):
    scheme_name: str
    description: str
    state: str
    category: str
    min_age: int | None = None
    max_age: int | None = None
    gender: str | None = None
    caste: str | None = None
    income_limit: int | None = None
    benefits: str
    application_link: str


class SchemeResponse(BaseModel):
    id: int
    scheme_name: str
    description: str
    state: str
    category: str
    min_age: int | None
    max_age: int | None
    gender: str | None
    caste: str | None
    income_limit: int | None
    benefits: str
    application_link: str

    class Config:
        from_attributes = True