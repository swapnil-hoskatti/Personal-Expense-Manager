from sqlalchemy.orm import Session

from app.models import user as UserModel
from app.schemas import user as UserSchema


def get_user(db: Session, user_id: int):
    return db.query(UserModel).filter(UserModel.id == user_id).first()


def get_user_by_email(db: Session, email: str):
    return db.query(UserModel.User).filter(UserModel.User.email == email).first()


def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(UserModel.User).offset(skip).limit(limit).all()


def create_user(db: Session, user: UserSchema.UserCreate):
    hashed_password = UserModel.get_password_hash(user.password)
    db_user = UserModel.User(email=user.email, hashed_password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user
