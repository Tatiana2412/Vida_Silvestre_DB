from fastapi import Depends, HTTPException
from pydantic import BaseModel
from typing import Optional
from datetime import date

class AnimalBase(BaseModel):
    nombre: str
    fechanac: Optional[date] = None
    idcuidador: int
    idhabitat: int
    idespecie: int

class AnimalCreate(AnimalBase):
    pass

class AnimalUpdate(BaseModel):
    nombre: Optional[str]
    fechanac: Optional[date]
    idcuidador: Optional[int]
    idhabitat: Optional[int]
    idespecie: Optional[int]

class Animal(AnimalBase):
    id: int

    class Config:
        orm_mode = True

