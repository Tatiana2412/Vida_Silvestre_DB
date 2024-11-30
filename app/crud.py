from sqlalchemy.orm import Session
from . import database
from . import models, schemas

from .models import Animal

def crear_animal(db: Session, animal: schemas.AnimalCreate):
    nuevo_animal = models.Animal(**animal.dict())
    db.add(nuevo_animal)
    db.commit()
    db.refresh(nuevo_animal)
    return nuevo_animal

def obtener_animales(db: Session, skip: int = 0, limit: int = 10):
    return db.query(models.Animal).offset(skip).limit(limit).all()

from sqlalchemy.orm import Session
#from models import Animal

def get_animals(db: Session, skip: int = 0, limit: int = 10):
    return db.query(Animal).offset(skip).limit(limit).all()

def create_animal(db: Session, animal: dict):
    db_animal = Animal(**animal)
    db.add(db_animal)
    db.commit()
    db.refresh(db_animal)
    return db_animal
# Crear un nuevo animal
def create_animal(db: Session, animal: schemas.AnimalCreate):
    db_animal = models.Animal(
        Nombre=animal.Nombre,
        FechaNac=animal.FechaNac,
        IDCuidador=animal.IDCuidador,
        IDHabitat=animal.IDHabitat,
        IDEspecie=animal.IDEspecie,
    )
    db.add(db_animal)
    db.commit()
    db.refresh(db_animal)
    return db_animal

# Leer todos los animales
def get_animals(db: Session, skip: int = 0, limit: int = 10):
    return db.query(models.Animal).offset(skip).limit(limit).all()

# Leer un animal por ID
def get_animal_by_id(db: Session, animal_id: int):
    return db.query(models.Animal).filter(models.Animal.ID == animal_id).first()

# Actualizar un animal
def update_animal(db: Session, animal_id: int, animal_update: schemas.AnimalUpdate):
    db_animal = db.query(models.Animal).filter(models.Animal.ID == animal_id).first()
    if db_animal:
        for key, value in animal_update.dict(exclude_unset=True).items():
            setattr(db_animal, key, value)
        db.commit()
        db.refresh(db_animal)
    return db_animal

# Eliminar un animal
def delete_animal(db: Session, animal_id: int):
    db_animal = db.query(models.Animal).filter(models.Animal.ID == animal_id).first()
    if db_animal:
        db.delete(db_animal)
        db.commit()
    return db_animal