from pydantic import BaseModel, Field


class RequestAuthen(BaseModel):
    username: str = Field(...)
    password: str = Field(...)


class ResponseAuthen(BaseModel):
    access_token: str = Field(...)
    type: str = Field("Bearer")