from sqlalchemy import Column, String, BigInteger, Date, Integer, Float
from sqlalchemy.orm import relationship

from api.third_party.model.base import BaseModel


class Colors(BaseModel):
    __tablename__ = "colors"
    id = Column(BigInteger, primary_key=True, index=True)
    color_code = Column(String(100), nullable=False)
    color_name = Column(String(500), nullable=False)
    products_color = relationship("ProductsColor")



