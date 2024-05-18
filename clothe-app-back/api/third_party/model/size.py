from sqlalchemy import Column, BigInteger, String, ForeignKey

from api.third_party.model.base import BaseModel


class ProductsSize(BaseModel):
    __tablename__ = "products_size"
    id = Column(BigInteger, primary_key=True, index=True)
    size = Column(String(50), nullable=False)
    product_id = Column(BigInteger, ForeignKey('products.id'), index=True)