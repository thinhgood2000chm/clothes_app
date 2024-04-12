from fastapi import APIRouter

from api.endpoint.categories import view

router = APIRouter()

router.include_router(router=view.router)
