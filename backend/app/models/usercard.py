from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship

from app.db.base import Base

class UserCard(Base):
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    card_id = Column(Integer, ForeignKey("cards.id"))
    created_at = Column(DateTime)
    updated_at = Column(DateTime)
    
    user = relationship("User", back_populates="users_cards")
    card = relationship("Card", back_populates="users_cards")