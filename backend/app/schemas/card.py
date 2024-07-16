from pydantic import BaseModel

class CardBase(BaseModel):
    title: str
    brand: str
    type: str
    description: str

class CardCreate(CardBase):
    pass

class Card(CardBase):
    id: int
    created_at: str
    updated_at: str

    class Config:
        orm_mode = True