from fastapi import APIRouter

from api.endpoint.authen import view

router = APIRouter()

router.include_router(router=view.router)
