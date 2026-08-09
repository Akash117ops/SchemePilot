# SchemePilot Backend

Backend API for **SchemePilot**, a government scheme discovery and eligibility platform.

The backend provides APIs for user authentication, profile management, government scheme management, eligibility checking, search, filtering, sorting, pagination, and favorites.

---

## 🚀 Tech Stack

- **Python**
- **FastAPI**
- **PostgreSQL**
- **SQLAlchemy**
- **Pydantic**
- **JWT Authentication**
- **Uvicorn**
- **Passlib / bcrypt**

---

## 📁 Project Structure


backend/
│
├── app/
│   ├── models/          # SQLAlchemy database models
│   ├── routers/         # API route definitions
│   ├── schemas/         # Pydantic request/response schemas
│   ├── services/        # Business logic
│   ├── utils/           # Authentication and utility functions
│   │
│   ├── config.py        # Application configuration
│   ├── database.py      # Database connection and session
│   ├── dependencies.py  # Authentication/dependency functions
│   └── main.py          # FastAPI application entry point
│
├
├── .env.example
├── .gitignore
└── README.md

---

## 📌 Project Status

 **Backend:** In active development

Current backend functionality includes:

- ✅ User registration and login
- ✅ JWT authentication
- ✅ User profiles
- ✅ Government scheme CRUD
- ✅ Scheme search
- ✅ Scheme filtering
- ✅ Scheme sorting
- ✅ Pagination
- ✅ Eligibility engine
- ✅ User-specific eligible schemes
- ✅ Favorites
- ✅ PostgreSQL database integration
- ✅ Swagger API documentation

---

## ⚙️ Features

### Authentication

- User registration
- User login
- JWT-based authentication
- Protected API routes
- Role-based access control

### User Profiles

Users can maintain eligibility information including:

- Age
- State
- Category
- Gender
- Occupation
- Annual income

### Government Schemes

The backend supports:

- Creating schemes
- Updating schemes
- Deleting schemes
- Retrieving schemes
- Searching schemes
- Filtering schemes
- Sorting schemes
- Pagination

### Eligibility Engine

The eligibility engine compares a user's information against scheme requirements.

It currently checks:

- State
- Category
- Gender
- Occupation
- Minimum age
- Maximum age
- Annual income

The system also supports `"Any"` values for applicable eligibility fields.

---

## 🔗 Main API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/auth/register` | Register a new user |
| POST | `/auth/login` | Login and obtain JWT token |
| GET | `/schemes/` | Get all schemes |
| POST | `/schemes/` | Create a scheme |
| GET | `/schemes/{id}` | Get scheme by ID |
| GET | `/schemes/search` | Search schemes |
| GET | `/schemes/filter` | Filter schemes |
| GET | `/schemes/sorted` | Sort schemes |
| GET | `/schemes/paginated` | Get paginated schemes |
| POST | `/schemes/eligible` | Find eligible schemes |
| POST | `/schemes/my-eligible` | Find schemes eligible for logged-in user |

---

## 🗄️ Database

SchemePilot uses **PostgreSQL** with **SQLAlchemy ORM**.

The backend currently contains database models for:

- Users
- User Profiles
- Government Schemes
- Favorites

Database configuration is handled through environment variables.

---

## 🔐 Authentication

Protected endpoints use JWT authentication.

After logging in, copy the generated access token and use the **Authorize** button in Swagger UI.

Enter:

```text
Bearer YOUR_ACCESS_TOKEN
```

---

▶️ Running the Backend
1. Create virtual environment

Windows:

python -m venv venv

Activate it:venv\Scripts\activate
2. Install dependencies
pip install -r ../requirements.txt
3. Configure environment variables

Create a .env file in the backend directory.

Example:

DATABASE_URL=postgresql://username:password@localhost:5432/schemepilot_db
SECRET_KEY=your-secret-key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

Never commit your real .env file to GitHub.

4. Start the server
uvicorn app.main:app --reload

The API will run at:

http://127.0.0.1:8000

📚 API Documentation

FastAPI automatically provides interactive API documentation.

Swagger UI
http://127.0.0.1:8000/docs

ReDoc
http://127.0.0.1:8000/redoc

Swagger can be used to test authentication, schemes, profiles and eligibility endpoints.

🧪 Eligibility Example
Example request:

{
  "age": 30,
  "state": "Karnataka",
  "category": "General",
  "gender": "Female",
  "occupation": "Self Employed",
  "annual_income": 300000
}

The backend evaluates the user's information against the eligibility conditions stored for each scheme.

For example, a scheme with:

gender = "Any"

can match users regardless of gender.

⚠️ Disclaimer

SchemePilot is an educational/software project designed to help users discover potentially relevant government schemes.

The eligibility information stored in the application is a simplified representation of scheme rules and should not be treated as an official eligibility determination.

Users should verify final eligibility, documentation requirements and application procedures through the respective official government portals.

🔮 Future Improvements
Add more government schemes
More detailed eligibility conditions
Improved scheme recommendation system
Automated scheme data updates
Advanced search
Frontend integration
Cloud deployment
Production-grade authentication and security
