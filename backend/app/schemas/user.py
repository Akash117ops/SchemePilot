
import re

from pydantic import BaseModel, EmailStr, Field, field_validator


COMMON_PASSWORDS = {
    "password",
    "password1",
    "password123",
    "12345678",
    "123456789",
    "1234567890",
    "qwerty",
    "qwerty123",
    "admin123",
    "welcome123",
    "letmein",
    "iloveyou",
    "abc123",
    "11111111",
    "00000000",
}


class UserCreate(BaseModel):
    full_name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    password: str = Field(..., min_length=8)

    @field_validator("password")
    @classmethod
    def validate_password(cls, password: str) -> str:
        if not re.search(r"[A-Z]", password):
            raise ValueError("Password must contain at least one uppercase letter")

        if not re.search(r"[a-z]", password):
            raise ValueError("Password must contain at least one lowercase letter")

        if not re.search(r"[0-9]", password):
            raise ValueError("Password must contain at least one number")

        if not re.search(r"[^A-Za-z0-9]", password):
            raise ValueError("Password must contain at least one special character")

        if password.lower() in COMMON_PASSWORDS:
            raise ValueError("This password is too common. Choose a stronger password")

        return password


class UserLogin(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=8)
