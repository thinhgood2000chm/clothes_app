from datetime import datetime
from sqlalchemy import Column, String, DateTime
from sqlalchemy.orm import DeclarativeBase


class BaseModel(DeclarativeBase):
    created_at = Column(DateTime, default=datetime.now)
    created_by = Column(String(255), default=None, nullable=True)
    updated_at = Column(DateTime, default=datetime.now, onupdate=datetime.now)
    updated_by = Column(String(255), default=None, nullable=True)