from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from api.third_party.model.users import Users


async def get_user_by_code(db: AsyncSession, user_code):
    user = await db.execute(
        select(Users).filter(
            Users.user_code == user_code
        )
    )
    return user.scalar()


async def get_login_user(db: AsyncSession, user_code, password ):
    user = await db.execute(
        select(Users).filter(
            Users.user_code == user_code,
            Users.password == password
        )
    )
    user = user.scalar()
    return user

async def get_user_by_code(db: AsyncSession, user_code):
    user = await db.execute(
        select(Users).filter(
            Users.user_code == user_code
        )
    )
    return user.scalar()