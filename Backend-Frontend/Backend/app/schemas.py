from fastapi import Depends, HTTPException
from pydantic import BaseModel
from typing import Optional
from datetime import date
#"""
class AnimalBase2(BaseModel):
    nombre: str
    fechanac: Optional[date] = None
    idcuidador: int
    idhabitat: int
    idespecie: int

class AnimalCreate2(AnimalBase2):
    pass

class AnimalUpdate2(BaseModel):
    nombre: Optional[str]
    fechanac: Optional[date]
    idcuidador: Optional[int]
    idhabitat: Optional[int]
    idespecie: Optional[int]

class Animal2(AnimalBase2):
    id: int

    class Config:
        orm_mode = True
#"""
#-----------------------------------------
#from pydantic import BaseModel
#"""
from fastapi import Depends, HTTPException
from pydantic import BaseModel
from typing import Optional
from datetime import date

class AnimalBase(BaseModel):
    nombre: str
    fechanac: Optional[date] = None
    cuidador: str
    habitat: str
    especie: str

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
#"""