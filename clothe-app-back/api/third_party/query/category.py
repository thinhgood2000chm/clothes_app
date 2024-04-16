from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from api.third_party.model.category import Categories


async def get_categories(db: AsyncSession):
    categories = await db.execute(
        select(Categories)
    )
    return categories.scalars().all()


async def get_category_by_id(cate_id, db: AsyncSession):
    categories = await db.execute(
        select(Categories).filter(Categories.id == cate_id)
    )
    return categories.scalar()