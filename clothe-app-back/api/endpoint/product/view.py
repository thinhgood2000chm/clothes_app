
import logging
import threading
from typing import List
from sqlalchemy import select, update, insert
from fastapi import APIRouter, Depends, Query, Form, UploadFile, File
from starlette.status import HTTP_200_OK, HTTP_500_INTERNAL_SERVER_ERROR
from sqlalchemy.ext.asyncio import AsyncSession

from api.base.schema import SuccessResponse, ResponseStatus, FailResponse
from api.endpoint.product.schema import ResponseListProduct, ResponseProduct
from api.library.constant import CODE_ERROR_SERVER
from api.library.function import convert_image_to_base64, save_image
from api.third_party.connect import MySQLService
from api.third_party.model.colors import Colors
from api.third_party.model.products import ProductsColor, Products
from api.third_party.query.color import get_color_info
from api.third_party.query.product import get_all_product_paging, get_product
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
        products_image_color = await get_all_product_paging(db, last_id)
        products = {}
        for prod, img, color in products_image_color:
            string_base64 = ""
            if img:
                base64_img = await convert_image_to_base64(img.image_path)
                string_base64 = f'data:image/png;base64, {base64_img.decode()}'
            if prod.id not in products:
                products[prod.id] = {
                    "id": prod.id,
                    "product_name": prod.product_name,
                    "description": prod.description,
                    "image": [string_base64],
                    "quantity": prod.quantity,
                    "price": prod.price,
                    "category": prod.category,
                    "color": [color.color_code] if color.color_code else [],
                    "image_id": [img.id] if img is not None else []
                }
            else:
                if string_base64 and img.id and img.id not in products[img.id]['image_id']:
                    products[prod.id]['image'].append("string_base64")
                if color and color.color_code not in products[prod.id]['color']:
                    products[prod.id]['color'].append(color.color_code)

        list_product_response = []

        for key, value in products.items():
            list_product_response.append(value)

        last_pro_id = list_product_response[-1]['id']
        response_data = {
            "data": {
                "list_product": list_product_response,
                "last_id": last_pro_id
            },
            "response_status": {
                "code": "00",
                "type": "success",
                "message": ""
            }
        }
        return SuccessResponse[ResponseListProduct](**response_data)
    except:
        logger.error(message, exc_info=True)
        return http_exception(
            status_code=status_code if status_code else HTTP_500_INTERNAL_SERVER_ERROR,
            code=code if code else CODE_ERROR_SERVER,
            message=message
        )



@router.post(
    path="/product",
    name="create product",
    description="create product product",
    status_code=HTTP_200_OK,
    responses=open_api_standard_responses(
        success_status_code=HTTP_200_OK,
        success_response_model=SuccessResponse[ResponseProduct],
        fail_response_model=FailResponse[ResponseStatus]
    )
)
async def create_product(
        product_name: str = Form(""),
        description: str = Form(""),
        quantity: str = Form(""),
        price: str = Form(""),
        category: str = Form(""),
        list_color_code: List[str] = Form(""),
        list_image_upload: List[UploadFile] = File(None),
        db: AsyncSession = Depends(MySQLService().get_db)
):
    get_colors = await get_color_info(db, list_color_code)

    if get_colors and len(get_colors) == len(list_color_code):
        new_product = Products(
            product_name=product_name,
            description=description,
            quantity=quantity,
            price=price,
            category=category,
        )
        db.add(new_product)
        await db.commit()
        await db.refresh(new_product)
        print(new_product.id)
        if list_image_upload:
            await save_image(new_product.id, list_image_upload)

        list_color=[{
                "product_id": new_product.id,
                "color_id":color.id
        } for color in get_colors]

        await db.execute(insert(ProductsColor).values(list_color))
        await db.commit()
    return None



@router.get(
    path="/product/{product_id}",
    name="get_all_product",
    description="get all product",
    status_code=HTTP_200_OK,
    responses=open_api_standard_responses(
        success_status_code=HTTP_200_OK,
        success_response_model=SuccessResponse[ResponseProduct],
        fail_response_model=FailResponse[ResponseStatus]
    )
)
async def get_detail_product(product_id:str, db: AsyncSession = Depends(MySQLService().get_db), ):
    code = message = status_code = ''
    try:
        product = await get_product(db, product_id)
        print(product)
        product_detail = {
            "product_name": product[0][0].product_name,
            "description": product[0][0].description,
            "image": [],
            "quantity": product[0][0].quantity,
            "price": product[0][0].price,
            "category": product[0][0].category,
            "color": [],
            "image_id": []
        }
        for _, img, color in product:
            string_base64 = ""
            if img:
                base64_img = await convert_image_to_base64(img.image_path)
                string_base64 = f'data:image/png;base64, {base64_img.decode()}'
                product_detail['image'].append(string_base64)
                product_detail['image_id'].append(img.id)
            if color and color.color_code not in product_detail['color']:
                product_detail['color'].append(color.color_code)

        # list_product_response = []
        #
        # for key, value in products.items():
        #     list_product_response.append(value)
        #
        # last_pro_id = list_product_response[-1]['id']
        # print(last_pro_id)
        response_data = {
            "data": product_detail,
            "response_status": {
                "code": "00",
                "type": "success",
                "message": ""
            }
        }
        # print(response_data)
        return SuccessResponse[ResponseProduct](**response_data)
        return product
    except:
        logger.error(message, exc_info=True)
        return http_exception(
            status_code=status_code if status_code else HTTP_500_INTERNAL_SERVER_ERROR,
            code=code if code else CODE_ERROR_SERVER,
            message=message
        )
