import logging

from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from starlette.status import HTTP_200_OK, HTTP_500_INTERNAL_SERVER_ERROR

from api.base.author import create_access_token
from api.base.schema import SuccessResponse, FailResponse, ResponseStatus
from api.endpoint.authen.schema import ResponseAuthen, RequestAuthen
from api.library.constant import CODE_ERROR_SERVER, CODE_ERROR_LOGIN_FAIL, CODE_ERROR_CREATE_TOKEN_FAIL, \
    TYPE_MESSAGE_RESPONSE
from api.third_party.connect import MySQLService
from api.third_party.query.user import get_login_user
from setting.init_project import open_api_standard_responses, http_exception

logger = logging.getLogger("product.view.py")
router = APIRouter()

@router.post(
    path="/get-token",
    name="get_token_login",
    description="get token login",
    status_code=HTTP_200_OK,
    responses=open_api_standard_responses(
        success_status_code=HTTP_200_OK,
        success_response_model=SuccessResponse[ResponseAuthen],
        fail_response_model=FailResponse[ResponseStatus]
    )
)
async def get_token_authen(data_authen: RequestAuthen, db: AsyncSession = Depends(MySQLService().get_db)):
    code = message = status_code = ''
    try:
        username = data_authen.username  # email
        password = data_authen.password  # password
        user_login = await get_login_user(db, username, password)
        if not user_login:
            status_code = 401
            code = CODE_ERROR_LOGIN_FAIL
            message = "Sai tên đăng nhập hoặc mật khẩu"
            raise HTTPException(status_code)

        token = await create_access_token(user_login)
        if not token:
            status_code = 401
            code = CODE_ERROR_CREATE_TOKEN_FAIL
            raise HTTPException(status_code)
        response_data = {
            "data": {
                "access_token": token
            },
            "response_status": {
                "code": "00",
                "type": "success",
                "message": ""
            }
        }
        return SuccessResponse[ResponseAuthen](**response_data)

    except:
        logger.error(
            TYPE_MESSAGE_RESPONSE[code] if code else "", exc_info=True
        )
        return http_exception(
            status_code=status_code if status_code else HTTP_500_INTERNAL_SERVER_ERROR,
            code=code if code else CODE_ERROR_SERVER,
            message=message
        )
