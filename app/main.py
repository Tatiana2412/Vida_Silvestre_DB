from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from . import crud, models, schemas
from .Base_de_datos import SessionLocal, engine

# Crear las tablas de la base de datos si no existen
models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# Dependencia para obtener la sesión de base de datos
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Ruta para crear un animal
@app.post("/animals/", response_model=schemas.Animal)
def create_animal(animal: schemas.AnimalCreate, db: Session = Depends(get_db)):
    return crud.create_animal(db, animal)

# Ruta para obtener todos los animales
@app.get("/animals/", response_model=list[schemas.Animal])
def read_animals(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return crud.get_animals(db, skip=skip, limit=limit)

# Ruta para obtener un animal por ID
@app.get("/animals/{animal_id}", response_model=schemas.Animal)
def read_animal(animal_id: int, db: Session = Depends(get_db)):
    db_animal = crud.get_animal_by_id(db, animal_id)
    if db_animal is None:
        raise HTTPException(status_code=404, detail="Animal not found")
    return db_animal

# Ruta para actualizar un animal
@app.put("/animals/{animal_id}", response_model=schemas.Animal)
def update_animal(animal_id: int, animal: schemas.AnimalUpdate, db: Session = Depends(get_db)):
    db_animal = crud.update_animal(db, animal_id, animal)
    if db_animal is None:
        raise HTTPException(status_code=404, detail="Animal not found")
    return db_animal

# Ruta para eliminar un animal
@app.delete("/animals/{animal_id}")
def delete_animal(animal_id: int, db: Session = Depends(get_db)):
    db_animal = crud.delete_animal(db, animal_id)
    if db_animal is None:
        raise HTTPException(status_code=404, detail="Animal not found")
    return {"message": "Animal deleted successfully"}

