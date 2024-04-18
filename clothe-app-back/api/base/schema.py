from pydantic import BaseModel, Field
from typing import Generic, TypeVar, Optional
from pydantic.generics import GenericModel


class ResponseStatus(BaseModel):
    code: str = Field("", example='')
    type: str = Field("success", example='')
    message: str = Field("", example='')


TypeX = TypeVar("TypeX")

class SuccessMessage(BaseModel):
    message: str = Field("Tạo Thành công")
class SuccessResponse(GenericModel, Generic[TypeX]):
    data: Optional[TypeX]
    response_status: ResponseStatus


class FailResponse(GenericModel, Generic[TypeX]):
    detail: Optional[TypeX]