from pydantic import BaseModel


class EligibilityRequest(BaseModel):
    age: int
    state: str
    category: str
    gender: str
    occupation: str
    annual_income: int