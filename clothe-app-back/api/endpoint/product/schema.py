from typing import List

from pydantic import BaseModel, Field

class ResponseListProduct(BaseModel):
    product_code: str = Field("", example='')
    product_name: str = Field("", example='')
    description: str = Field("", example='')
    image: List[str] = Field([], example='')
    quantity: str = Field("", example='')
    price: str = Field("", example='')
    category: str = Field("", example='')
    color: List[str] = Field([], example='')
