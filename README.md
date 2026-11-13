# SchemePilot

A Python-based web application designed to help users discover government schemes and identify schemes that match their eligibility.

## Overview

SchemePilot aims to simplify the process of finding relevant government welfare schemes by allowing users to create accounts, maintain personal profiles, explore schemes, and check eligibility based on their information.

## Tech Stack

### Backend
- Python
- FastAPI
- SQLAlchemy
- PostgreSQL
- Pydantic
- JWT Authentication
- Alembic (Database Migrations)

### Frontend
- React
- JavaScript
- CSS
- React Router

## Current Features

- User registration and login.
- Password hashing and JWT-based authentication.
- Protected user profile endpoints.
- User profile management.
- Government scheme creation and retrieval.
- Scheme search, filtering, sorting, and pagination.
- Eligibility matching based on:
  - State
  - Category
  - Gender
  - Occupation
  - Age
  - Annual income
- Add and remove favorite schemes.
- PostgreSQL database integration.
- Database migration setup using Alembic.

## Project Structure

```text
SchemePilot/
│
├── backend/
│   ├── app/
│   │   ├── models/
│   │   ├── routers/
│   │   ├── schemas/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── config.py
│   │   ├── database.py
│   │   ├── dependencies.py
│   │   └── main.py
│   │
│   ├── migrations/
│   ├── alembic.ini
│   ├── requirements.txt
│   └── .env.example
│
└── frontend/
    └── src/
```

## Running Locally

### 1. Clone the repository

```bash
git clone https://github.com/Akash117ops/SchemePilot.git
cd SchemePilot
```

### 2. Backend setup

```bash
cd backend
python -m venv venv
```

Activate the virtual environment on Windows:

```powershell
.\venv\Scripts\Activate.ps1
```

Install dependencies:

```bash
pip install -r requirements.txt
```

### 3. Environment configuration

Create a `.env` file inside the backend directory using `.env.example` as a reference.

Configure the required PostgreSQL database connection and authentication settings.

Never commit your actual `.env` file or expose your secret key.

### 4. Run the backend

```bash
uvicorn app.main:app --reload
```

Backend:

`http://127.0.0.1:8000`

API documentation:

`http://127.0.0.1:8000/docs`

### 5. Frontend setup

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend development server will display its local URL in the terminal.

## Database

SchemePilot uses PostgreSQL with SQLAlchemy ORM.

Alembic is configured for database migration management.

## Development Status

**Project status: Under active development.**

The backend includes authentication, user profiles, scheme management, eligibility matching, and favorite management. Frontend and integration work may continue as development progresses.

## Future Improvements

- Improve eligibility matching and query performance.
- Expand automated backend testing.
- Review database indexing and integrity constraints.
- Improve scheme discovery and filtering.
- Strengthen frontend-backend integration.
- Prepare deployment configuration.

## Repository

[GitHub – SchemePilot](https://github.com/Akash117ops/SchemePilot)

---

*SchemePilot is a personal software development project intended to make government scheme discovery and eligibility checking more accessible.*