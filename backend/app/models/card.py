from sqlalchemy import Column, Integer, String, DateTime, Enum

from app.db.base import Base

class Card(Base):
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, unique=True, index=True)
    brand = Column(String, unique=True, index=True)
    type = Column(Enum("credit", "debit"))
    decription = Column(String)
    created_at = Column(DateTime)
    updated_at = Column(DateTime)
    