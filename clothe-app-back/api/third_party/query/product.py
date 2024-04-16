from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from api.library.constant import LIMIT_PAGING
from api.third_party.model.colors import Colors
from api.third_party.model.image import ProductsImage
from api.third_party.model.products import Products, ProductsColor
from api.third_party.model.size import ProductsSize


async def get_all_product_paging(db: AsyncSession, last_id=0):
    productss = await db.execute(
        select(
            Products, ProductsImage, Colors, ProductsSize
        ).join(
            ProductsImage, ProductsImage.product_id == Products.id, isouter=True
        ).join(
            ProductsSize, ProductsSize.product_id == Products.id, isouter=True
        ).join(
            ProductsColor, ProductsColor.product_id == Products.id, isouter=True
        ).join(
            Colors, Colors.id == ProductsColor.color_id, isouter=True
        ).filter(Products.id > last_id, ProductsImage.main_image == True).limit(LIMIT_PAGING)

    )
    products = productss.all()
    return products


async def get_product(db: AsyncSession, product_id: str):
    product = await db.execute(
        select(
            Products, ProductsImage, Colors
        ).join(
            ProductsImage, ProductsImage.product_id == Products.id, isouter=True
        ).join(
            ProductsColor, ProductsColor.product_id == Products.id
        ).join(
            Colors, Colors.id == ProductsColor.color_id, isouter=True
        ).filter(Products.id == product_id).limit(LIMIT_PAGING)

    )
    product = product.all()
    return product