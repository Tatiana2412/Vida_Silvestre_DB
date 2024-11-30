from pydantic import BaseModel
from typing import Optional
from datetime import date

from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from . import crud, models, schemas
from .Base_de_datos import SessionLocal, engine

# Estructura base para Animal
class AnimalBase(BaseModel):
    Nombre: str
    FechaNac: Optional[date] = None
    IDCuidador: int
    IDHabitat: int
    IDEspecie: int

# Para crear un nuevo animal
class AnimalCreate(AnimalBase):
    pass

# Para actualizar un animal
class AnimalUpdate(BaseModel):
    Nombre: Optional[str]
    FechaNac: Optional[date]
    IDCuidador: Optional[int]
    IDHabitat: Optional[int]
    IDEspecie: Optional[int]

# Para devolver un animal
class Animal(AnimalBase):
    ID: int

    class Config:
        orm_mode = True


models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# Dependencia para obtener la sesión de base de datos
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/animals/", response_model=schemas.Animal)
def create_animal(animal: schemas.AnimalCreate, db: Session = Depends(get_db)):
    return crud.create_animal(db, animal)

@app.get("/animals/", response_model=list[schemas.Animal])
def read_animals(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return crud.get_animals(db, skip=skip, limit=limit)

@app.get("/animals/{animal_id}", response_model=schemas.Animal)
def read_animal(animal_id: int, db: Session = Depends(get_db)):
    db_animal = crud.get_animal_by_id(db, animal_id)
    if db_animal is None:
        raise HTTPException(status_code=404, detail="Animal not found")
    return db_animal

@app.put("/animals/{animal_id}", response_model=schemas.Animal)
def update_animal(animal_id: int, animal: schemas.AnimalUpdate, db: Session = Depends(get_db)):
    db_animal = crud.update_animal(db, animal_id, animal)
    if db_animal is None:
        raise HTTPException(status_code=404, detail="Animal not found")
    return db_animal

@app.delete("/animals/{animal_id}")
def delete_animal(animal_id: int, db: Session = Depends(get_db)):
    db_animal = crud.delete_animal(db, animal_id)
    if db_animal is None:
        raise HTTPException(status_code=404, detail="Animal not found")
    return {"message": "Animal deleted successfully"}