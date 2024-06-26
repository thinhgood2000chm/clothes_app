from sqlalchemy import Column, String, BigInteger, Date, Integer, Float, ForeignKey, Boolean
from sqlalchemy.orm import relationship

from api.third_party.model.base import BaseModel


class ProductsImage(BaseModel):
    __tablename__ = "products_image"
    id = Column(BigInteger, primary_key=True, index=True)
    image_path = Column(String(100), nullable=False)
    product_id = Column(BigInteger, ForeignKey('products.id'), index=True)
    main_image = Column(Boolean, nullable= False)