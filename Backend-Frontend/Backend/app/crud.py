from fastapi import Depends
from sqlalchemy.orm import Session

from . import models, schemas


def create_animal(db: Session, animal: schemas.AnimalCreate):
    print(f"Datos recibidos para la creación: {animal}")
    db_animal = models.Animal(**animal.dict())
    db.add(db_animal)
    db.commit()
    db.refresh(db_animal)
    print(f"Animal creado: {db_animal}")
    return db_animal


def get_animals(db: Session, skip: int = 0, limit: int = 10):
    return db.query(models.Animal).offset(skip).limit(limit).all()

def get_animal_by_id(db: Session, animal_id: int):
    return db.query(models.Animal).filter(models.Animal.ID == animal_id).first()

def update_animal(db: Session, animal_id: int, animal_update: schemas.AnimalUpdate):
    db_animal = db.query(models.Animal).filter(models.Animal.ID == animal_id).first()
    if db_animal:
        for key, value in animal_update.dict(exclude_unset=True).items():
            setattr(db_animal, key, value)
        db.commit()
        db.refresh(db_animal)
    return db_animal

def delete_animal(db: Session, animal_id: int):
    db_animal = db.query(models.Animal).filter(models.Animal.ID == animal_id).first()
    if db_animal:
        db.delete(db_animal)
        db.commit()
    return db_animal



