from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from api.third_party.model.category import Categories


async def get_categories(db: AsyncSession):
    categories = await db.execute(
        select(Categories)
    )
    return categories.scalars().all()