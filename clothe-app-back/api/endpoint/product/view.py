import uuid
import logging
from sqlalchemy import and_, or_, select, insert
from fastapi import APIRouter, UploadFile, File, Depends, Form, HTTPException, Query
from starlette.status import HTTP_200_OK, HTTP_500_INTERNAL_SERVER_ERROR

from api.base.schema import SuccessResponse, ResponseStatus, FailResponse
from api.endpoint.product.schema import ResponseListProduct
from api.library.constant import TYPE_MESSAGE_RESPONSE, CODE_ERROR_SERVER
from api.third_party.model.products import Products
from setting.init_project import open_api_standard_responses, http_exception

logger = logging.getLogger("product.view.py")
router = APIRouter()
@router.get(
    path="/post/{post_code}/comments",
    name="get_all_comment",
    description="get all comment of post",
    status_code=HTTP_200_OK,
    responses=open_api_standard_responses(
        success_status_code=HTTP_200_OK,
        success_response_model=SuccessResponse[ResponseListProduct],
        fail_response_model=FailResponse[ResponseStatus]
    )
)
async def get_all_comment():
    code = message = status_code = ''
    try:
        products = select(Products).filter()
        return SuccessResponse[ResponseListProduct](**response_data)
    except:
        logger.error(message, exc_info=True)
        return http_exception(
            status_code=status_code if status_code else HTTP_500_INTERNAL_SERVER_ERROR,
            code=code if code else CODE_ERROR_SERVER,
            message=message
        )