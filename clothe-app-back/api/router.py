from fastapi import APIRouter

from api.endpoint.product.router import router

api_router = APIRouter()

api_router.include_router(router=router)
