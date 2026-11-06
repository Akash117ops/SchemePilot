
import os

from dotenv import load_dotenv


load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = int(
    os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "30")
)


if not DATABASE_URL:
    raise ValueError("DATABASE_URL is not configured")

if not SECRET_KEY or len(SECRET_KEY) < 32:
    raise ValueError(
        "SECRET_KEY must be configured with at least 32 characters"
    )

if ALGORITHM != "HS256":
    raise ValueError("Only HS256 is supported")

if ACCESS_TOKEN_EXPIRE_MINUTES <= 0:
    raise ValueError(
        "ACCESS_TOKEN_EXPIRE_MINUTES must be greater than zero"
    )
