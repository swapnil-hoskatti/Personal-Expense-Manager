from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from app.core.config import Settings

# POSTRGESQL CONNECTION VARIABLES to be fetched from .env file
SQLALCHEMY_DATABASE_URL = "postgresql://" + Settings.POSTGRES_USER + ":" + Settings.POSTGRES_PASSWORD + "@" + Settings.POSTGRES_SERVER + ":" + Settings.POSTGRES_PORT + "/" + Settings.POSTGRES_DB

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)

Base = declarative_base()