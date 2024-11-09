import pathlib
import sys
from logging.config import fileConfig

from sqlalchemy import engine_from_config
from sqlalchemy import pool

from alembic import context

from setting.init_project import config_system
from api.third_party.model.base import BaseModel
from api.third_party.model.colors import Colors
from api.third_party.model.products import ProductsColor
from api.third_party.model.users import Users
from api.third_party.model.products import Products
from api.third_party.model.image import ProductsImage
from api.third_party.model.category import Categories
from api.third_party.model.size import ProductsSize

config = context.config

# Interpret the config file for Python logging.
# This line sets up loggers basically.
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

# add your model's MetaData object here
# for 'autogenerate' support

target_metadata = BaseModel.metadata

# other values from the config, defined by the needs of env.py,
# can be acquired:
DATABASE_URL = f"{config_system['DB_NAME']}://{config_system['DB_USER']}:{config_system['DB_PASSWORD']}@{config_system['DB_HOST']}/{config_system['DB_SCHEMA']}"
config.set_main_option("sqlalchemy.url", str(DATABASE_URL))
# ... etc.


def run_migrations_offline() -> None:
    """Run alembic in 'offline' mode.

    This configures the context with just a URL
    and not an Engine, though an Engine is acceptable
    here as well.  By skipping the Engine creation
    we don't even need a DBAPI to be available.

    Calls to context.execute() here emit the given string to the
    script output.

    """
    url = config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online() -> None:
    """Run alembic in 'online' mode.

    In this scenario we need to create an Engine
    and associate a connection with the context.

    """
    connectable = engine_from_config(
        config.get_section(config.config_ini_section, {}),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:
        context.configure(
            connection=connection, target_metadata=target_metadata
        )

        with context.begin_transaction():
            context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
