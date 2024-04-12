from typing import List, Optional

from pydantic import BaseModel, Field

class ResponseCategory(BaseModel):
    id: int = Field("", example='')
    name: Optional[str] = Field("", example='')


