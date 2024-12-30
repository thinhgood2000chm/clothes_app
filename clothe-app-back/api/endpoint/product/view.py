import logging
import threading
import uuid
from typing import List
from sqlalchemy import select, update, insert
from fastapi import APIRouter, Depends, Query, Form, UploadFile, File, HTTPException
from starlette.status import HTTP_200_OK, HTTP_500_INTERNAL_SERVER_ERROR, HTTP_400_BAD_REQUEST
from sqlalchemy.ext.asyncio import AsyncSession

from api.base.author import get_current_user
from api.base.schema import SuccessResponse, ResponseStatus, FailResponse, SuccessMessage
from api.endpoint.product.schema import ResponseListProduct, ResponseProduct
from api.library.constant import CODE_ERROR_SERVER, TYPE_MESSAGE_RESPONSE, CODE_ERROR_INPUT
from api.library.function import convert_image_to_base64, save_image
from api.third_party.connect import MySQLService
from api.third_party.model.colors import Colors
from api.third_party.model.image import ProductsImage
from api.third_party.model.products import ProductsColor, Products
from api.third_party.model.size import ProductsSize
from api.third_party.query.category import get_category_by_id
from api.third_party.query.color import get_color_info
from api.third_party.query.product import get_all_product_paging, get_product, get_color_img_size_of_product
from setting import init_project
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
async def get_all_product(
        color: str = Query(""),
        category: str = Query(""),
        size: str = Query(""),
        last_id: str = Query(""),
        db: AsyncSession = Depends(MySQLService().get_db)):
    code = message = status_code = ''
    try:
        list_product_id = await get_all_product_paging(db, category, last_id)
        products_image_color = await get_color_img_size_of_product(db, last_id, list_product_id)
        products = {}

        for prod, img, color, size in products_image_color:
            string_base64 = ""
            if img:
                try:
                    base64_img = await convert_image_to_base64(img.image_path)
                    string_base64 = f'data:image/png;base64, {base64_img.decode()}'
                except:
                    logger.error(f"path {img.image_path} không tồn tại")
                    string_base64 = f'data:image/png;base64,'
            if prod.id not in products:

                products[prod.id] = {
                    "id": prod.id,
                    "product_name": prod.product_name,
                    "description": prod.description,
                    "image": [string_base64],
                    "quantity": prod.quantity,
                    "price": prod.price,
                    "category": prod.category,
                    "color": [color.color_code] if color else [],
                    "size": [size.size] if size else [],
                    "image_id": img.id
                }
            else:
                if color and color.color_code not in products[prod.id]['color']:
                    products[prod.id]['color'].append(color.color_code)
                if size and size.size not in products[prod.id]['size']:
                    products[prod.id]['size'].append(size.size)

        list_product_response = []
        for key, value in products.items():
            list_product_response.append(value)

        last_pro_id = list_product_response[-1]['id'] if list_product_response else None
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
        success_response_model=SuccessResponse[SuccessMessage],
        fail_response_model=FailResponse[ResponseStatus]
    )
)
async def create_product(
        product_name: str = Form(...),
        description: str = Form(""),
        quantity: str = Form(""),
        price: str = Form(""),
        category: str = Form(...),
        material: str = Form(...),
        list_size: List[str] = Form([]),
        list_color_code: List[str] = Form([]),
        list_image_upload: List[UploadFile] = File(None),
        main_image_upload: UploadFile = File(None),
        user: dict = Depends(get_current_user),
        db: AsyncSession = Depends(MySQLService().get_db),

):
    status_code = message = code = ""
    try:
        if list_image_upload is not None and len(list_image_upload) > 3:
            status_code = HTTP_400_BAD_REQUEST
            code = CODE_ERROR_INPUT
            message = "Ảnh phụ chỉ cho phép tối đa 3 ảnh"
        get_colors = await get_color_info(db, list_color_code)
        get_category = await get_category_by_id(category, db)
        if not get_colors or not (get_colors and len(get_colors) == len(list_color_code)):
            status_code = HTTP_400_BAD_REQUEST
            code = CODE_ERROR_INPUT
            message = "color không tồn tại"
            raise HTTPException(status_code)
        if not get_category:
            status_code = HTTP_400_BAD_REQUEST
            code = CODE_ERROR_INPUT
            message = "category không tồn tại"
            raise HTTPException(status_code)

        new_product = Products(
            product_name=product_name,
            description=description,
            quantity=int(quantity),
            price=float(price),
            category=category,
            material=material,
        )
        db.add(new_product)
        await db.commit()
        await db.refresh(new_product)
        if not main_image_upload:
            status_code = HTTP_400_BAD_REQUEST
            code = CODE_ERROR_INPUT
            message = "Bắt buộc phải có ảnh chính"
            raise HTTPException(status_code)
        name_main_image = uuid.uuid4()
        await save_image(new_product.id, main_image_upload, name_main_image)
        list_img_product = []
        list_img_product.append(
            {
                "image_path": fr'{init_project.config_system["PATH_SAVE_IMAGE"]}/{new_product.id}/{name_main_image}.jpg',
                "product_id": new_product.id,
                "main_image": True
            })
        if list_image_upload:
            for image in list_image_upload:
                name_image = uuid.uuid4()
                await save_image(new_product.id, image, name_image)
                list_img_product.append(
                    {
                        "image_path": f'{init_project.config_system["PATH_SAVE_IMAGE"]}/{new_product.id}/{name_image}.jpg',
                        "product_id": new_product.id,
                        "main_image": False
                    }

                )
        await db.execute(insert(ProductsImage).values(list_img_product))
        await db.commit()
        sizes = [{
            "product_id": new_product.id,
            "size": size
        } for size in list_size]
        await db.execute(insert(ProductsSize).values(sizes))
        await db.commit()

        list_color = [{
            "product_id": new_product.id,
            "color_id": color.id
        } for color in get_colors]
        await db.execute(insert(ProductsColor).values(list_color))
        await db.commit()
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
        logger.error(TYPE_MESSAGE_RESPONSE[code] if not message else message, exc_info=True)
        return http_exception(
            status_code=status_code if status_code else HTTP_500_INTERNAL_SERVER_ERROR,
            code=code if code else CODE_ERROR_SERVER,
            message=message
        )


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
async def get_detail_product(product_id: str, db: AsyncSession = Depends(MySQLService().get_db), ):
    code = message = status_code = ''
    try:
        product = await get_product(db, product_id)
        product_detail = {
            "id": product[0][0].id,
            "product_name": product[0][0].product_name,
            "description": product[0][0].description,
            "material": product[0][0].material,
            "image": [],
            "quantity": product[0][0].quantity,
            "price": product[0][0].price,
            "category": product[0][0].category,
            "color": [],
            "image_id": [],
            "size": [],
        }
        for _, img, color, size in product:
            string_base64 = ""
            if img and img.id not in product_detail['image_id']:
                base64_img = await convert_image_to_base64(img.image_path)
                string_base64 = f'data:image/png;base64, {base64_img.decode()}'
                product_detail['image'].append(string_base64)
                product_detail['image_id'].append(img.id)
            if color and color.color_code not in product_detail['color']:
                product_detail['color'].append(color.color_code)
            if size and size.size not in product_detail['size']:
                product_detail['size'].append(size.size)

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
    except:
        logger.error(message, exc_info=True)
        return http_exception(
            status_code=status_code if status_code else HTTP_500_INTERNAL_SERVER_ERROR,
            code=code if code else CODE_ERROR_SERVER,
            message=message
        )
