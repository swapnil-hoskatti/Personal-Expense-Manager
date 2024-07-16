from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Enum, DECIMAL
from sqlalchemy.orm import relationship

from app.db.base import Base

class Transaction(Base):
    id = Column(Integer, primary_key=True, index=True)
    user_card_id = Column(Integer, ForeignKey("users_cards.id"))
    amount = Column(DECIMAL(10, 2))
    transaction_type = Column(Enum("credit", "debit"))
    description = Column(String)
    created_at = Column(DateTime)
    updated_at = Column(DateTime)
    
    user_card = relationship("UserCard", back_populates="transactions")