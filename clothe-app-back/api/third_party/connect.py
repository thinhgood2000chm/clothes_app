from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import NullPool
import logging

from setting.init_project import config_system

logger = logging.getLogger("connect.py")


class MySQLService:
    _instance = None

    def __new__(cls, *args, **kwargs):
        if cls._instance is None:
            cls._instance = super(MySQLService, cls).__new__(cls, *args, **kwargs)
            cls._instance.create_connection()
        else:
            logger.info("da khoi tao ket noi mongodb")
        return cls._instance

    async def create_connection(self):
        self.engine = create_async_engine(
            f"{config_system['DB_NAME']}+asyncmy://{config_system['DB_USER']}:{config_system['DB_PASSWORD']}@{config_system['DB_HOST']}/{config_system['DB_SCHEMA']}?charset=utf8mb4",
            echo=False, poolclass=NullPool)
        self.async_session = sessionmaker(self.engine, expire_on_commit=False, class_=AsyncSession)

    async def get_db(self):
        async with self.async_session() as db:
            yield db