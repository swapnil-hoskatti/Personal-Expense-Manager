from sqlalchemy.orm import sessionmaker
from .session import engine

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)