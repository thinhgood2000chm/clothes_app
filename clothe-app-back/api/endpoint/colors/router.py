from fastapi import APIRouter

from api.endpoint.colors import view

router = APIRouter()

router.include_router(router=view.router)
