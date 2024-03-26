from sqlalchemy import Column, String, BigInteger

from api.third_party.model.base import BaseModel

class Users(BaseModel):
    __tablename__ = "users"
    id = Column(BigInteger, primary_key=True, index=True)
    user_code = Column(String(100), nullable=False)
    first_name = Column(String(500), nullable=False)
    last_name = Column(String(500), nullable=False)
    email = Column(String(500), nullable=False)
    phone = Column(String(500), nullable=False)
    password = Column(String(500), nullable=False)
