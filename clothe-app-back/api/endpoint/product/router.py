from fastapi import APIRouter

from api.endpoint.product import view

router = APIRouter()

router.include_router(router=view.router)
