from sqlalchemy import Column, String, BigInteger, Date, Integer, Float, ForeignKey
from sqlalchemy.orm import relationship

from api.third_party.model.base import BaseModel

from api.third_party.model.image import ProductsImage

class Products(BaseModel):
    __tablename__ = "products"
    id = Column(BigInteger, primary_key=True, index=True)
    product_code = Column(String(100), nullable=False)
    product_name = Column(String(500), nullable=False)
    description = Column(String(500), nullable=True)
    quantity = Column(Integer, nullable=False, default=0)
    price = Column(Float, nullable=False, default=0)
    category = Column(String(500), nullable=True, index=True)
    color_id = relationship("Color")
    product_image_id = relationship("ProductsImage")


class ProductsColor(BaseModel):
    __tablename__ = "products"
    id = Column(BigInteger, primary_key=True, index=True)
    product_id = Column(BigInteger, ForeignKey('drive_item.id'), index=True)
    color_id = Column(BigInteger, ForeignKey('drive_item.id'), index=True)



