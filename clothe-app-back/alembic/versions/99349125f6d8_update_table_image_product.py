"""update table image product 

Revision ID: 99349125f6d8
Revises: 6c6c23c3dee0
Create Date: 2024-04-12 21:54:11.647280

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '99349125f6d8'
down_revision = '6c6c23c3dee0'
branch_labels = None
depends_on = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('products_image', sa.Column('main_image', sa.Boolean(), nullable=False))
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('products_image', 'main_image')
    # ### end Alembic commands ###
