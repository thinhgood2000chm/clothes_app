from typing import List, Optional

from pydantic import BaseModel, Field

class ResponseProduct(BaseModel):
    product_code: str = Field("", example='')
    product_name: Optional[str] = Field("", example='')
    description: Optional[str] = Field("", example='')
    image: List[str] = Field([""], example='')
    quantity: Optional[int] = Field("", example='')
    price: Optional[float] = Field("", example='')
    category: Optional[int] = Field("", example='')
    color: List[str] = Field([], example='')


class ResponseListProduct(BaseModel):
    list_product: List[ResponseProduct] = Field(..., example=[])
    last_id: Optional[int] = Field(..., example=0)

