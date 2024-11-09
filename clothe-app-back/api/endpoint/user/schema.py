from pydantic import BaseModel, Field

class ResponseUserInfo(BaseModel):
    user_code: str = Field("", example='')
    first_name: str = Field("", example='')
    last_name: str = Field("", example='')
    picture: str = Field("", example='')
    picture_id: str = Field("", example='')
    email: str = Field("", example='')
    phone: str = Field("", example='')

