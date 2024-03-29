
from typing import Optional, Any, Dict, Union

from dotenv import dotenv_values
from fastapi import HTTPException
from starlette.status import HTTP_200_OK, HTTP_400_BAD_REQUEST

from api.library.constant import CODE_SUCCESS, TYPE_MESSAGE_RESPONSE
from definitions import ROOT_DIR

dotenv_values = dotenv_values(f"{ROOT_DIR}/.env")
config_system = {
    "PROJECT_NAME": dotenv_values.get('PROJECT_NAME', ""),
    "VERSION": dotenv_values.get('VERSION', '1.0.0'),

    "DB_NAME": dotenv_values.get("DB_NAME", ""),
    "DB_USER": dotenv_values.get("DB_USER", ""),
    "DB_PASSWORD": dotenv_values.get("DB_PASSWORD", ""),
    "DB_HOST": dotenv_values.get("DB_HOST", ""),
    "DB_SCHEMA": dotenv_values.get("DB_SCHEMA", ""),
    "PATH_SAVE_IMAGE": dotenv_values.get("PATH_SAVE_IMAGE", ""),
}


def open_api_standard_responses(
        success_status_code: Optional[int] = HTTP_200_OK,
        success_response_model: Any = None,
        success_description: Optional[str] = None,
        success_content_type: Optional[str] = None,
        fail_status_code: Optional[int] = HTTP_400_BAD_REQUEST,
        fail_response_model: Optional[Any] = None,
        fail_description: Optional[str] = None,
        fail_content_type: Optional[str] = None,
) -> Dict[int, Union[dict, Dict[str, Optional[Any]]]]:
    status_code__details = dict()

    status_code__details[success_status_code] = dict()
    if success_response_model:
        status_code__details[success_status_code]['model'] = success_response_model
    if success_description:
        status_code__details[success_status_code]['description'] = success_description
    if success_content_type:
        status_code__details[success_status_code]['content'] = {
            success_content_type: {}
        }

    status_code__details[fail_status_code] = dict()
    if fail_response_model:
        status_code__details[fail_status_code]['model'] = fail_response_model
    if fail_description:
        status_code__details[fail_status_code]['description'] = fail_description
    if fail_content_type:
        status_code__details[fail_status_code]['content'] = {
            fail_content_type: {}
        }

    return status_code__details


def http_exception(
        status_code: Optional[int] = HTTP_400_BAD_REQUEST,
        code: int = CODE_SUCCESS,
        message: Optional[str] = '',
        lang: Optional[str] = "en"

) -> HTTPException:
    raise HTTPException(
        status_code=status_code,
        detail={
            'code': code,
            'type': "success" if code == CODE_SUCCESS else 'fail',
            'message': message if message else TYPE_MESSAGE_RESPONSE[code]
        }
    )