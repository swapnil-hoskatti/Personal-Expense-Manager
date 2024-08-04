from pydantic import BaseModel

class TransactionBase(BaseModel):
    id: int


class TransactionAdd(TransactionBase):
    user_card_id: int
    amount: float
    transaction_type: str
    description: str

class Transaction(TransactionBase):
    id: int
    user_card_id: int
    amount: float
    transaction_type: str
    created_at: str
    modified_at: str

    class Config:
        orm_mode = True