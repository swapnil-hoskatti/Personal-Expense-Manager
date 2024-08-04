from sqlalchemy.orm import Session

from app.models import card as CardModel
from app.schemas import card as CardSchema

def create_card(db: Session, card: CardSchema.CardCreate):
    db_card = CardModel.Card(card)
    db.add(db_card)
    db.commit()
    db.refresh(db_card)
    return db_card

def get_card(db: Session, card_id: int):
    return db.query(CardModel.Card).filter(CardModel.Card.id == card_id).first()

def get_cards(db: Session):
    return db.query(CardModel.Card).all()

def delete_card(db: Session, card_id: int):
    db.query(CardModel.Card).filter(CardModel.Card.id == card_id).delete()
    db.commit()
    return True

def update_card(db: Session, card_id: int, card: CardSchema.CardUpdate):
    db.query(CardModel.Card).filter(CardModel.Card.id == card_id).update(card.dict())
    db.commit()
    return True

def get_card_by_last_four(db: Session, last_four: str):
    return db.query(CardModel.Card).filter(CardModel.Card.last_four == last_four).first()
