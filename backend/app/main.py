from fastapi import FastAPI

from app.database import Base, engine
from app.models import User

print("Database URL:", engine.url)
print("Registered tables:", Base.metadata.tables.keys())

Base.metadata.create_all(bind=engine)

app = FastAPI()


@app.get("/")
def home():
    return {"message": "Welcome to SchemePilot API!"}