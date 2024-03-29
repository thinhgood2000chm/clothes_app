
import logging
from typing import List

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
from api.third_party.query.product import get_all_product_paging
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
                    "product_name": prod.product_name,
                    "description": prod.description,
                    "image": [string_base64],
                    "quantity": prod.quantity,
                    "price": prod.price,
                    "category": prod.category,
                    "color": [color.color_code] if color.color_code else []
                }
            else:
                if string_base64:
                    products[prod.id]['image'].append(string_base64)
                if color:
                    products[prod.id]['color'].append(color.color_code)

        list_product_response = []
        for key, value in products.items():
            list_product_response.append(value)
        response_data = {
            "data": list_product_response,
            "response_status": {
                "code": "00",
                "type": "success",
                "message": ""
            }
        }
        return SuccessResponse[List[ResponseListProduct]](**response_data)
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
async def get_all_product(
        product_name: str = Form(""),
        description: str = Form(""),
        quantity: str = Form(""),
        price: str = Form(""),
        category: str = Form(""),
        list_color_code: List[str] = Form(""),
        list_image_upload: List[UploadFile] = File(None),
        db: AsyncSession = Depends(MySQLService().get_db)
):
    print(list_color_code)
    get_color = await get_color_info(db, list_color_code)

    if get_color and len(get_color) == len(list_color_code):
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
        await save_image(new_product.id, list_image_upload)



        new_product_color = ProductsColor(

        )

    return None
