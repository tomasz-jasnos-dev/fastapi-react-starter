# FastAPI + React Store with SOAP Integration

This project is a modern full-stack web application demonstrating the integration of legacy SOAP services into a RESTful architecture. It features a FastAPI backend acting as a gateway/proxy and a dynamic React frontend.

## 🌟 Features

### Backend (FastAPI)
- **REST API**: CRUD operations for managing "Items" (Sword, Shield, etc.).
- **SOAP Integration**: Acts as a client for the external [DNE Online Calculator](http://www.dneonline.com/calculator.asmx).
- **Architecture**:
    - Uses `zeep` for robust SOAP communication.
    - Exposes SOAP functionality via standard REST endpoints (`/calculator/add`, etc.).
    - Implements lazy loading for SOAP clients to ensure resilience.
- **Database**: PostgreSQL (configured in `database.py`).

### Frontend (React + Vite)
- **Modern UI**: Clean interface using Lucide icons and responsive design.
- **Item Management**: 
    - Create random RPG-themed items (e.g., "Shiny Sword", "Cursed Ring").
    - Delete items.
- **Embedded Calculator**: 
    - Each Item Card features a toggleable **Quantity Calculator**.
    - Interacts with the backend SOAP proxy to perform server-side calculations (Add/Sub/Mul/Div).
    - Automatically updates item quantity results.

## 🏗 Architecture

```mermaid
graph LR
    User[React Frontend] -- REST JSON --> FastAPI[FastAPI Backend]
    
    subgraph Backend
        FastAPI -- CRUD --> DB[(SQLite)]
        FastAPI -- SOAP XML --> SOAP[External SOAP Service]
    end
    
    SOAP -.-> |Calculator WSDL| DNE[dneonline.com]
```

## 🚀 Getting Started

### Prerequisites
- Python 3.8+
- Node.js 16+

### 1. Backend Setup

Navigate to the `backend` directory:
```bash
cd backend
```

Install dependencies:
```bash
pip install -r requirements.txt
```

Configure the database:
1. Open `backend/database.py`.
2. Update `SQLALCHEMY_DATABASE_URL` with your PostgreSQL credentials:
   ```python
   # Format: postgresql://user:password@host/dbname
   SQLALCHEMY_DATABASE_URL = "postgresql://postgres:su@localhost/SF_SGP"
   ```
3. Ensure the database exists in PostgreSQL before running the app.

Run the server:
```bash
uvicorn main:app --port 8000 --reload
```
The API will be available at `http://127.0.0.1:8000`.  
interactive docs: `http://127.0.0.1:8000/docs`.

### 2. Frontend Setup

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
Open your browser at `http://127.0.0.1:5173`.

## 🛠 Usage

1.  **Add Item**: Click the "Add Random Item" button to generate a new loot item.
2.  **Calculate Quantity**:
    - Click the **Calc** button on any item card.
    - Enter two numbers (e.g., 5 and 3).
    - Click **Multiply** (X).
    - The backend sends this to the external SOAP service, gets `15`, and the frontend updates the item quantity to 15.
3.  **Delete**: Use the trash icon to remove items.

## 📦 Tech Stack

- **Backend**: Python, FastAPI, SQLAlchemy, Zeep (SOAP client), Pydantic.
- **Frontend**: JavaScript, React, Vite, Axios, Lucide React.
