from sqlalchemy.orm import Session

from app.models import usercard as UserCardModel
from app.schemas import usercard as UserCardSchema

def create_user_card(db: Session, user_card: UserCardSchema.UserCardCreate):
    db_user_card = UserCardModel.UserCard(user_card)
    db.add(db_user_card)
    db.commit()
    db.refresh(db_user_card)
    return db_user_card

def get_user_card(db: Session, user_id: int, card_id: int):
    return db.query(UserCardModel.UserCard).filter(UserCardModel.UserCard.user_id == user_id).filter(UserCardModel.UserCard.card_id == card_id).first()

def get_user_cards(db: Session, user_id: int):
    return db.query(UserCardModel.UserCard).filter(UserCardModel.UserCard.user_id == user_id).all()

def delete_user_card(db: Session, user_id: int, card_id: int):
    db.query(UserCardModel.UserCard).filter(UserCardModel.UserCard.user_id == user_id).filter(UserCardModel.UserCard.card_id == card_id).delete()
    db.commit()
    return True
