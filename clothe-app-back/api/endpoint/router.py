from fastapi import APIRouter

from api.endpoint.product import router as product_router
from api.endpoint.categories import router as categories_router
from api.endpoint.colors import router as color_router
api_router = APIRouter()

api_router.include_router(router=product_router.router, tags=["PRODUCTS"])
api_router.include_router(router=categories_router.router, tags=["CATEGORIES"])
api_router.include_router(router=color_router.router, tags=["COLORS"])
