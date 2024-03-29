from typing import List

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from api.third_party.model.colors import Colors

async def get_color_info(db: AsyncSession, list_color_code: List):
    color_engine = await db.execute(
        select(
            Colors
        ).filter(
            Colors.color_code.in_(list_color_code)
        )

    )
    colors = color_engine.scalars().all()
    return colors