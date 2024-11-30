from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from .Base_de_datos import SessionLocal, engine, Base
from . import crud, models, schemas
from .db_config import engine


# Crear las tablas si no existen
Base.metadata.create_all(bind=engine)

app = FastAPI()

# Dependencia para obtener la sesión de la base de datos
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/animales/", response_model=schemas.Animal)
def crear_animal(animal: schemas.AnimalCreate, db: Session = Depends(get_db)):
    return crud.crear_animal(db=db, animal=animal)

@app.get("/animales/", response_model=list[schemas.Animal])
def leer_animales(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return crud.obtener_animales(db=db, skip=skip, limit=limit)


app = FastAPI()

# Crea todas las tablas en la base de datos
Base.metadata.create_all(bind=engine)

@app.get("/")
def read_root():
    return {"message": "API de FastAPI funcionando correctamente"}
#----------------------------

app = FastAPI()

# Dependencia para obtener la sesión de la base de datos
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/animals/")
def read_animals(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return get_animals(db, skip, limit)

@app.post("/animals/")
def add_animal(animal: dict, db: Session = Depends(get_db)):
    return create_animal(db, animal)