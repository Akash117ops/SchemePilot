from pydantic import BaseModel


class ProfileBase(BaseModel):
    age: int
    gender: str
    state: str
    category: str
    occupation: str
    annual_income: int


class ProfileCreate(ProfileBase):
    pass


class ProfileResponse(ProfileBase):
    id: int
    user_id: int

    class Config:
        from_attributes = True

class ProfileUpdate(ProfileBase):
    pass