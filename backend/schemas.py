from pydantic import BaseModel
from typing import Optional

class ItemBase(BaseModel):
    name: str
    price: float
    is_offer: Optional[bool] = None

class ItemCreate(ItemBase):
    pass

class Item(ItemBase):
    id: int

    class Config:
        from_attributes = True

class CalculationRequest(BaseModel):
    intA: int
    intB: int

class CalculationResponse(BaseModel):
    result: int
