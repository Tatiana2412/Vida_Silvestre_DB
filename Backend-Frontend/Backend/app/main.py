from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import text
from . import crud, models, schemas
from .database import SessionLocal, engine

#models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# Dependencia de sesión de base de datos
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get ("/")
def read_root():
    return {"message": "¡Hola, yo soy groot!"}



@app.get("/probar_conexionDB/")
def test_db_connection(db: Session = Depends(get_db)):
    try:
        # Realiza una consulta simple para verificar la conexión
        db.execute(text("SELECT 1"))
        return {"message": "Conexión exitosa a la base de datos"}
    except Exception as e:
        return {"error": str(e)}


# Ruta para crear un animal
@app.post("/crear_animal/", response_model=schemas.Animal) 
def crear_animal(animal: schemas.AnimalCreate, db: Session = Depends(get_db)): 
    try: 
        db_animal = models.Animal( 
            nombre=animal.nombre, 
            fechanac=animal.fechanac, 
            idcuidador=animal.idcuidador,
            idhabitat=animal.idhabitat, idespecie=animal.idespecie ) 
        db.add(db_animal) 
        db.commit() 
        db.refresh(db_animal)
        return db_animal 
    except Exception as e: 
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")

# Ruta para obtener todos los animales
@app.get("/listar_animales/", response_model=list[schemas.Animal])
def listar_animales(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)): 
    try:
        animales = db.query(models.Animal).offset(skip).limit(limit).all() 
        return animales 
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")

# Ruta para obtener un animal por ID
@app.get("/obtener_animal/{animal_id}", response_model=schemas.Animal)
def obtener_animal(animal_id: int, db: Session = Depends(get_db)):
    try:
        animal = db.query(models.Animal).filter(models.Animal.id == animal_id).first()
        if animal is None:
            raise HTTPException(status_code=404, detail="Animal not found")
        return animal

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")



# Ruta para actualizar un animal

@app.put("/Actualizar_animal/{animal_id}", response_model=schemas.Animal)
def actualizar_animal(animal_id: int, animal: schemas.AnimalUpdate, db: Session = Depends(get_db)):
    try:
        db_animal = db.query(models.Animal).filter(models.Animal.id == animal_id).first()
        if db_animal is None:
            raise HTTPException(status_code=404, detail="Animal not found")

        update_data = animal.dict(exclude_unset=True)
        for key, value in update_data.items():
            setattr(db_animal, key, value)

        db.commit()
        db.refresh(db_animal)
        return db_animal

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")


# Ruta para eliminar un animal@app.delete("/datos/{animal_id}", response_model=schemas.Animal   )   
@app.delete("/datos/{animal_id}", response_model=schemas.Animal)
def eliminar_animal(animal_id: int, db: Session = Depends(get_db)):
    try:
        db_animal = db.query(models.Animal).filter(models.Animal.id == animal_id).first()
        if db_animal is None:
            raise HTTPException(status_code=404, detail="Animal not found")

        db.delete(db_animal)
        db.commit()
        return db_animal

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")

@app.get("/listar_todos/")
def listar_todos(db: Session = Depends(get_db)):
    try:
        resultados = db.query(models.Animal).all()  # O usa la tabla correcta
        # Convertir cada objeto en un diccionario si es necesario
        return [{key: getattr(animal, key) for key in animal.__dict__ if not key.startswith("_")} for animal in resultados]

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")
    
@app.get("/buscar_por_nombre/{nombre}", response_model=list[schemas.Animal])
def buscar_por_nombre(nombre: str, db: Session = Depends(get_db)):
    try:
        animales = db.query(models.Animal).filter(models.Animal.nombre.ilike(f"%{nombre}%")).all()
        if not animales:
            raise HTTPException(status_code=404, detail="No se encontraron animales con ese nombre")
        return animales
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")

@app.get("/buscar_por_habitat/{habitat_id}", response_model=list[schemas.Animal])
def buscar_por_habitat(habitat_id: int, db: Session = Depends(get_db)):
    try:
        animales = db.query(models.Animal).filter(models.Animal.idhabitat == habitat_id).all()
        if not animales:
            raise HTTPException(status_code=404, detail="No se encontraron animales en ese hábitat")
        return animales
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")



