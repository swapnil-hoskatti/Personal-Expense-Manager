from pydantic import BaseModel

class TransactionBase(BaseModel):
    id: int


class TransactionAdd(TransactionBase):
    user_card_id: int
    amount: float
    transaction_type: str
    description: str

class User(TransactionBase):
    id: int
    email: str
    username: str
    first_name: str
    last_name: str
    is_active: bool

    class Config:
        orm_mode = True