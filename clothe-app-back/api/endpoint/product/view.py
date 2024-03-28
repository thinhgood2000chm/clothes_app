
import logging
from typing import List

from sqlalchemy import select
from fastapi import APIRouter, Depends, Query
from starlette.status import HTTP_200_OK, HTTP_500_INTERNAL_SERVER_ERROR
from sqlalchemy.ext.asyncio import AsyncSession

from api.base.schema import SuccessResponse, ResponseStatus, FailResponse
from api.endpoint.product.schema import ResponseListProduct
from api.library.constant import TYPE_MESSAGE_RESPONSE, CODE_ERROR_SERVER
from api.library.function import convert_image_to_base64
# from api.library.funtions import convert_image_to_base64
from api.third_party.connect import MySQLService
from api.third_party.model.products import Products
from api.third_party.query.product import get_all_product
from setting.init_project import open_api_standard_responses, http_exception

logger = logging.getLogger("product.view.py")
router = APIRouter()
@router.get(
    path="/products",
    name="get_all_product",
    description="get all product",
    status_code=HTTP_200_OK,
    responses=open_api_standard_responses(
        success_status_code=HTTP_200_OK,
        success_response_model=SuccessResponse[List[ResponseListProduct]],
        fail_response_model=FailResponse[ResponseStatus]
    )
)
async def get_all_product(last_id: str = Query(""),  db: AsyncSession = Depends(MySQLService().get_db)):
    code = message = status_code = ''
    try:
        # data:image/png;base64,
        products_image_color = await get_all_product(db, last_id)
        # products = await db.execute(select(Products).filter(Products.id > last_id).limit(1))
        products = {}
        for prod, img, color in products_image_color:
            print(prod.id, img.id, color.id)
            string_base64 = ""
            if img:
                base64_img = await convert_image_to_base64(img.image_path)
                string_base64 = f'data:image/png;base64, {base64_img.decode()}'
            if prod.id not in products:
                products[prod.id] = {
                    "product_name": prod.product_name,
                    "description": prod.description,
                    "image": [string_base64],
                    "quantity": "",
                    "price": "",
                    "category": "",
                    "color": [color.color_code] if color.color_code else []
                }
            else:
                if string_base64:
                    products[prod.id]['image'].append(string_base64)
                if color:
                    products[prod.id]['color'].append(string_base64)
        return products
        # return SuccessResponse[List[ResponseListProduct]](**products)
    except:
        logger.error(message, exc_info=True)
        return http_exception(
            status_code=status_code if status_code else HTTP_500_INTERNAL_SERVER_ERROR,
            code=code if code else CODE_ERROR_SERVER,
            message=message
        )