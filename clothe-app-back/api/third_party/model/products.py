from sqlalchemy import Column, String, BigInteger, Date, Integer, Float, ForeignKey
from sqlalchemy.orm import relationship

from api.third_party.model.base import BaseModel

from api.third_party.model.image import ProductsImage
from api.third_party.model.category import Categories
from api.third_party.model.size import ProductsSize

class Products(BaseModel):
    __tablename__ = "products"
    id = Column(BigInteger, primary_key=True, index=True)
    # product_code = Column(String(100), nullable=False)
    product_name = Column(String(500), nullable=False)
    description = Column(String(500), nullable=True)
    quantity = Column(Integer, nullable=False, default=0)
    price = Column(Float, nullable=False, default=0)
    size = Column(BigInteger, ForeignKey('products_size.id'), index=True)
    category = Column(BigInteger,  ForeignKey('categories.id'), index=True)
    products_color = relationship("ProductsColor")
    product_image = relationship("ProductsImage")


class ProductsColor(BaseModel):
    __tablename__ = "product_color"
    id = Column(BigInteger, primary_key=True, index=True)
    product_id = Column(BigInteger, ForeignKey('products.id'), index=True)
    color_id = Column(BigInteger, ForeignKey('colors.id'), index=True)



