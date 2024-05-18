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
    description = Column(String(1000), nullable=True)
    quantity = Column(Integer, nullable=False, default=0)
    price = Column(Float, nullable=False, default=0)

    category = Column(BigInteger,  ForeignKey('categories.id'), index=True)
    products_color = relationship("ProductsColor")
    size = relationship("ProductsSize")
    product_image = relationship("ProductsImage")


class ProductsColor(BaseModel):
    __tablename__ = "product_color"
    id = Column(BigInteger, primary_key=True, index=True)
    product_id = Column(BigInteger, ForeignKey('products.id'), index=True)
    color_id = Column(BigInteger, ForeignKey('colors.id'), index=True)



