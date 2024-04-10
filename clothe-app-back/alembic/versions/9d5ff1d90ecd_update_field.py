"""update field 

Revision ID: 9d5ff1d90ecd
Revises: fee9ce148de5
Create Date: 2024-03-28 13:15:36.531103

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '9d5ff1d90ecd'
down_revision = 'fee9ce148de5'
branch_labels = None
depends_on = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('products_image', sa.Column('product_id', sa.BigInteger(), nullable=True))
    op.create_index(op.f('ix_products_image_product_id'), 'products_image', ['product_id'], unique=False)
    op.create_foreign_key(None, 'products_image', 'products', ['product_id'], ['id'])
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'products_image', type_='foreignkey')
    op.drop_index(op.f('ix_products_image_product_id'), table_name='products_image')
    op.drop_column('products_image', 'product_id')
    # ### end Alembic commands ###
