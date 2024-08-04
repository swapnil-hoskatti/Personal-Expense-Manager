from sqlalchemy.orm import Session

from app.models import transaction as TransactionModel
from app.schemas import transaction as TransactionSchema

def insert_transaction(db: Session, transaction: TransactionSchema.TransactionAdd):
    db_transaction = TransactionModel.Transaction(transaction)
    db.add(db_transaction)
    db.commit()
    db.refresh(db_transaction)
    return db_transaction

def get_transaction(db: Session, transaction_id: int):
    return db.query(TransactionModel.Transaction).filter(TransactionModel.Transaction.id == transaction_id).first()

def get_transactions(db: Session, user_card_id: int):
    return db.query(TransactionModel.Transaction).filter(TransactionModel.Transaction.user_card_id == user_card_id).all()

def delete_transaction(db: Session, transaction_id: int):
    db.query(TransactionModel.Transaction).filter(TransactionModel.Transaction.id == transaction_id).delete()
    db.commit()
    return True