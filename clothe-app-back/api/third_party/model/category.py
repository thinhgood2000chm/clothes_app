from sqlalchemy import Column, String, BigInteger, Date, Integer, Float
from sqlalchemy.orm import relationship

from api.third_party.model.base import BaseModel


class Categories(BaseModel):
    __tablename__ = "categories"
    id = Column(BigInteger, primary_key=True, index=True)
    name = Column(String(100), nullable=False)



