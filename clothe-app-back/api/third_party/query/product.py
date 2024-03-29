from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from api.library.constant import LIMIT_PAGING
from api.third_party.model.colors import Colors
from api.third_party.model.image import ProductsImage
from api.third_party.model.products import Products, ProductsColor


async def get_all_product_paging(db: AsyncSession, last_id=0):
    productss = await db.execute(
        select(
            Products, ProductsImage, Colors
        ).join(
            ProductsImage, ProductsImage.product_id == Products.id, isouter=True
        ).join(
            ProductsColor, ProductsColor.product_id == Products.id
        ).join(
            Colors, Colors.id == ProductsColor.color_id, isouter=True
        ).filter(Products.id > last_id).limit(LIMIT_PAGING)

    )
    products = productss.all()
    return products


async def create_new_product(db: AsyncSession, product: Products):


    return products