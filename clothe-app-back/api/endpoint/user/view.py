import hashlib
import logging

from fastapi import APIRouter, HTTPException, Depends, Form
from sqlalchemy.ext.asyncio import AsyncSession
from starlette.status import HTTP_200_OK, HTTP_500_INTERNAL_SERVER_ERROR, HTTP_400_BAD_REQUEST

from api.base.author import create_access_token, get_current_user
from api.base.schema import SuccessResponse, FailResponse, ResponseStatus, SuccessMessage
from api.endpoint.authen.schema import ResponseAuthen, RequestAuthen
from api.endpoint.user.schema import ResponseUserInfo
from api.library.constant import CODE_ERROR_SERVER, CODE_ERROR_LOGIN_FAIL, CODE_ERROR_CREATE_TOKEN_FAIL, \
    TYPE_MESSAGE_RESPONSE, CODE_ERROR_USER_EXIST
from api.third_party.connect import MySQLService
from api.third_party.model.users import Users
from api.third_party.query.user import get_login_user, get_user_by_code
from setting.init_project import open_api_standard_responses, http_exception

logger = logging.getLogger("product.view.py")
router = APIRouter()

@router.post(
    path="/get-user",
    name="get_user",
    description="get user",
    status_code=HTTP_200_OK,
    responses=open_api_standard_responses(
        success_status_code=HTTP_200_OK,
        success_response_model=SuccessResponse[ResponseUserInfo],
        fail_response_model=FailResponse[ResponseStatus]
    )
)
async def get_user(user: dict = Depends(get_current_user), db: AsyncSession = Depends(MySQLService().get_db)):
    code = message = status_code = ''
    try:
        print(user.__dict__)
        response_data = {
            "data": user.__dict__,
            "response_status": {
                "code": "00",
                "type": "success",
                "message": ""
            }
        }
        return SuccessResponse[ResponseUserInfo](**response_data)

    except:
        logger.error(
            TYPE_MESSAGE_RESPONSE[code] if code else "", exc_info=True
        )
        return http_exception(
            status_code=status_code if status_code else HTTP_500_INTERNAL_SERVER_ERROR,
            code=code if code else CODE_ERROR_SERVER,
            message=message
        )



@router.post(
    path="/create-user",
    name="create_user",
    description="get user",
    status_code=HTTP_200_OK,
    responses=open_api_standard_responses(
        success_status_code=HTTP_200_OK,
        success_response_model=SuccessResponse[ResponseUserInfo],
        fail_response_model=FailResponse[ResponseStatus]
    )
)
async def create_user(
        email: str = Form(...),
        phone: str = Form(...),
        password: str = Form(...),
        fullname: str = Form(...),
        db: AsyncSession = Depends(MySQLService().get_db)):
    code = message = status_code = ''
    try:
        user = await get_user_by_code(db, email)
        if user:
            status_code = HTTP_400_BAD_REQUEST
            code = CODE_ERROR_USER_EXIST
            message = "Email đã tồn tại"
            raise HTTPException(status_code)
        Users(
            user_code=email,
            phone=phone,
            email=email,
            fullname=fullname,
            password=hashlib.md5(password.encode()).hexdigest(),
            role=1
        )
        return SuccessResponse[SuccessMessage](**{
            "data": {
                "message": "Tạo thành công",

            },
            "response_status": {
                "code": "00",
                "type": "success",
                "message": ""
            }
        })

    except:
        logger.error(
            TYPE_MESSAGE_RESPONSE[code] if code else "", exc_info=True
        )
        return http_exception(
            status_code=status_code if status_code else HTTP_500_INTERNAL_SERVER_ERROR,
            code=code if code else CODE_ERROR_SERVER,
            message=message
        )
