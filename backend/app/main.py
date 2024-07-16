from functools import lru_cache
from fastapi import FastAPI
from .core.config import Settings, get_settings
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@lru_cache
def get_settings():
    return Settings()

@app.get("/")
async def read_root():
    return {"Hello": "World"}


