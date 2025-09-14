# HACKOVATE_PROJECT Backend

This is the backend for the HACKOVATE_PROJECT, built with Django and Django REST Framework.  
It provides APIs for user authentication, financial data management, AI-powered chat, and integration with external services.

---

## Features

- **User Authentication:** Register, login, and Google OAuth2 support.
- **Financial Data Models:** Assets, Liabilities, Transactions, Investments, Retirement Accounts, Credit Score.
- **Document Management:** Upload and manage user documents.
- **AI Chatbot:** Integrates with OpenRouter API for AI-powered financial chat.
- **Permissions:** Fine-grained user permissions for data access.
- **CORS Enabled:** For frontend-backend integration.
- **RESTful API:** Easily connect with any frontend (React, Vue, etc.).

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/HACKOVATE_PROJECT.git
cd HACKOVATE_PROJECT/backend
```

### 2. Create & Activate Virtual Environment

```bash
python -m venv venv
venv\Scripts\activate  # On Windows
# source venv/bin/activate  # On Mac/Linux
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Set Environment Variables

Create a `.env` file or set these in your environment:

```
SECRET_KEY=your-django-secret-key
OPENROUTER_API_KEY=your-openrouter-api-key
```

### 5. Run Migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

### 6. Create Superuser (Optional)

```bash
python manage.py createsuperuser
```

### 7. Run the Development Server

```bash
python manage.py runserver
```

---

## API Endpoints

- `POST /api/register/` — Register a new user
- `POST /api/login/` — Login user
- `POST /api/chat/` — AI chatbot endpoint
- `GET/POST /api/financial-profile/` — User financial profile
- `POST /api/update-permissions/` — Update user permissions
- ...and more

---

## AI Integration

- Uses [OpenRouter API](https://openrouter.ai/) for AI chat responses.
- Configure your API key in environment variables or `settings.py`.

---

## CORS

CORS is enabled for development.  
**Do not use `CORS_ALLOW_ALL_ORIGINS = True` in production!**

## License

This project is for educational and hackathon use.
