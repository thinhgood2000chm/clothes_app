import logging
import threading
import uuid
from typing import List
from fastapi import APIRouter, Depends, Query, Form, UploadFile, File, HTTPException
from starlette.status import HTTP_200_OK, HTTP_500_INTERNAL_SERVER_ERROR, HTTP_400_BAD_REQUEST
from sqlalchemy.ext.asyncio import AsyncSession

from api.base.schema import SuccessResponse, ResponseStatus, FailResponse
from api.endpoint.categories.schema import ResponseCategory
from api.endpoint.colors.schema import ResponseColors
from api.library.constant import CODE_ERROR_SERVER, TYPE_MESSAGE_RESPONSE, CODE_ERROR_INPUT
from api.third_party.connect import MySQLService
from api.third_party.query.color import get_colors
from setting.init_project import open_api_standard_responses, http_exception

logger = logging.getLogger("category.view.py")
router = APIRouter()


@router.get(
    path="/colors",
    name="get_all_color",
    description="get all colors",
    status_code=HTTP_200_OK,
    responses=open_api_standard_responses(
        success_status_code=HTTP_200_OK,
        success_response_model=SuccessResponse[List[ResponseColors]],
        fail_response_model=FailResponse[ResponseStatus]
    )
)
async def get_all_colors(db: AsyncSession = Depends(MySQLService().get_db)):
    code = message = status_code = ''
    try:
        colors = await get_colors(db)
        list_data_color = []
        for color in colors:
            list_data_color.append({
                "id": color.id,
                "color_name": color.color_name,
                "color_code": color.color_code
            })
        print(list_data_color)
        response_data = {
            "data": list_data_color,
            "response_status": {
                "code": "00",
                "type": "success",
                "message": ""
            }
        }
        print(response_data)
        return SuccessResponse[List[ResponseColors]](**response_data)
    except:
        logger.error(message, exc_info=True)
        return http_exception(
            status_code=status_code if status_code else HTTP_500_INTERNAL_SERVER_ERROR,
            code=code if code else CODE_ERROR_SERVER,
            message=message
        )

