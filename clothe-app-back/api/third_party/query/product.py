from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from api.third_party.model.colors import Colors
from api.third_party.model.image import ProductsImage
from api.third_party.model.products import Products, ProductsColor


async def get_all_product(db: AsyncSession, last_id = 0):
    products = await db.execute(
        select(
            Products, ProductsImage, Colors
        ).join(
            ProductsImage, ProductsImage.product_id == Products.id, isouter=True
        ).join(
            ProductsColor, ProductsColor.product_id == Products.id, isouter=True
        ).join(
            Colors, Colors.id == ProductsColor.id, isouter=True
        )

    )
    products = products.all()
    return products