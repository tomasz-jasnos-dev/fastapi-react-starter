# FastAPI + React

This repository contains a full-stack application with a FastAPI backend and a React frontend.

## Structure

- **backend/**: Contains the Python/FastAPI application.
- **frontend/**: Contains the React application (Vite).

## Getting Started

### 1. Backend

Navigate to the `backend` directory:
```bash
cd backend
```

Install dependencies:
```bash
pip install -r requirements.txt
```

Run the server:
```bash
uvicorn main:app --reload
```
The API will be available at `http://localhost:8000`.

### 2. Frontend

Navigate to the `frontend` directory:
```bash
cd frontend
```

Install dependencies:
```bash
npm install
```

Run the development server:
```bash
npm run dev
```
The application will be available at `http://localhost:5173`.
