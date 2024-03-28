"""remove code

Revision ID: 02c98857f416
Revises: fe495ada7e7c
Create Date: 2024-03-28 14:31:46.799710

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '02c98857f416'
down_revision = 'fe495ada7e7c'
branch_labels = None
depends_on = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('colors', 'color_code')
    op.drop_column('products', 'product_code')
    op.drop_column('users', 'user_code')
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('users', sa.Column('user_code', mysql.VARCHAR(length=100), nullable=False))
    op.add_column('products', sa.Column('product_code', mysql.VARCHAR(length=100), nullable=False))
    op.add_column('colors', sa.Column('color_code', mysql.VARCHAR(length=100), nullable=False))
    # ### end Alembic commands ###