from pydantic import BaseModel

class UserCardBase(BaseModel):
    id: int
    user_id: int
    card_id: int
    
class UserCardCreate(UserCardBase):
    last_four: str
    current_limit: float
    created_at: str
    pass

class UserCard(UserCardBase):
    last_four: str
    current_limit: float
    created_at: str
    
    class Config:
        orm_mode = True