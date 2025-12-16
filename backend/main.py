from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import items, calculator
import models
from database import engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(items.router)
app.include_router(calculator.router)

@app.get("/")
def read_root():
    return {"status": "healthy"}
