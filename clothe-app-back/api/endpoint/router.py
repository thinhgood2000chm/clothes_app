from fastapi import APIRouter

from api.endpoint.product import router as product_router

api_router = APIRouter()

api_router.include_router(router=product_router.router, tags=["PRODUCTS"])
