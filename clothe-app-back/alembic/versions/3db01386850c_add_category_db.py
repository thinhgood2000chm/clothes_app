"""add category db 

Revision ID: 3db01386850c
Revises: 99349125f6d8
Create Date: 2024-04-12 22:46:15.734668

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '3db01386850c'
down_revision = '99349125f6d8'
branch_labels = None
depends_on = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index('ix_products_category', table_name='products')
    op.drop_column('products', 'category')
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('products', sa.Column('category', mysql.VARCHAR(length=500), nullable=True))
    op.create_index('ix_products_category', 'products', ['category'], unique=False)
    # ### end Alembic commands ###
