from typing import List, Optional

from pydantic import BaseModel, Field

class ResponseColors(BaseModel):
    id: int = Field("", example='')
    color_name: Optional[str] = Field("", example='')
    color_code: str = Field("", example="")




