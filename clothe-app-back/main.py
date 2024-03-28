from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from setting.event import create_start_app_handler, create_stop_app_handler
from setting.init_project import config_system
from api.router import api_router
app = FastAPI(
    title=config_system['PROJECT_NAME'],
    docs_url="/docs",
    openapi_url="/ekyc_openapi.json",
    version=config_system['VERSION']
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
)


# @app.middleware("http")
# async def middleware(request: Request, call_next):
#     return await middleware_setting(request=request, call_next=call_next)

app.include_router(router=api_router)

app.add_event_handler("startup", create_start_app_handler(app))
app.add_event_handler("shutdown", create_stop_app_handler(app))