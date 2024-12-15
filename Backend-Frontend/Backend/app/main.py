from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import text
from . import crud, models, schemas
from .database import SessionLocal, engine

from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import joinedload
from .schemas import Animal2, AnimalUpdate2

#models.Base.metadata.create_all(bind=engine)



app = FastAPI()

#---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React generalmente corre en el puerto 3000
    allow_credentials=True,
    allow_methods=["*"],  # Permitir todos los métodos HTTP
    allow_headers=["*"],  # Permitir todos los encabezados
)
#---

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
@app.post("/crear_animal/", response_model=schemas.Animal2) 
def crear_animal(animal: schemas.AnimalCreate2, db: Session = Depends(get_db)): 
    try: 
        # Crear un nuevo registro de animal en la base de datos
        db_animal = models.Animal(
            nombre=animal.nombre,
            fechanac=animal.fechanac,
            idcuidador=animal.idcuidador,
            idhabitat=animal.idhabitat,
            idespecie=animal.idespecie
        )
        # Agregar y confirmar la transacción en la base de datos
        db.add(db_animal)
        db.commit()
        db.refresh(db_animal)
        return db_animal

    except Exception as e: 
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")


# Ruta para obtener todos los animales
@app.get("/listar_animales/", response_model=list[schemas.Animal])
def listar_animales(skip: int = 0, db: Session = Depends(get_db)):
    try:
        animales = (
            db.query(models.Animal)
            .options(
                joinedload(models.Animal.cuidador),
                joinedload(models.Animal.habitat),
                joinedload(models.Animal.especie),
            )
            .offset(skip)
            #.limit(limit)
            .all()
        )
        # Transformar resultados
        return [
            {
                "id": animal.id,
                "nombre": animal.nombre,
                "fechanac": animal.fechanac,
                "cuidador": animal.cuidador.nombre,
                "habitat": animal.habitat.nombre,
                "especie": animal.especie.nombre,
            }
            for animal in animales
        ]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")

# Ruta para obtener un animal por ID
@app.get("/obtener_animal/{animal_id}", response_model=schemas.Animal)
def obtener_animal(animal_id: int, db: Session = Depends(get_db)):
    try:
        animal = (
            db.query(models.Animal)
            .options(
                joinedload(models.Animal.cuidador),
                joinedload(models.Animal.habitat),
                joinedload(models.Animal.especie),
            )
            .filter(models.Animal.id == animal_id)
            .first()
        )
        if animal is None:
            raise HTTPException(status_code=404, detail="Animal not found")
        
        return {
            "id": animal.id,
            "nombre": animal.nombre,
            "fechanac": animal.fechanac,
            "cuidador": animal.cuidador.nombre,
            "habitat": animal.habitat.nombre,
            "especie": animal.especie.nombre,
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")




# Ruta para actualizar un animal
@app.put("/Actualizar_animal/{animal_id}", response_model=schemas.Animal2)
def actualizar_animal(animal_id: int, animal: schemas.AnimalUpdate2, db: Session = Depends(get_db)):
    try:
        # Busca el animal por ID en la base de datos
        db_animal = db.query(models.Animal).filter(models.Animal.id == animal_id).first()
        if db_animal is None:
            raise HTTPException(status_code=404, detail="Animal no encontrado")

        # Actualiza los campos especificados en la solicitud
        update_data = animal.dict(exclude_unset=True)
        for key, value in update_data.items():
            setattr(db_animal, key, value)

        # Guarda los cambios en la base de datos
        db.commit()
        db.refresh(db_animal)
        return db_animal

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")


# Ruta para eliminar un animal
@app.delete("/datos/{animal_id}", response_model=schemas.Animal2)
def eliminar_animal(animal_id: int, db: Session = Depends(get_db)):
    try:
        # Busca el animal por ID en la base de datos
        db_animal = db.query(models.Animal).filter(models.Animal.id == animal_id).first()
        if db_animal is None:
            raise HTTPException(status_code=404, detail="Animal no encontrado")

        # Elimina el registro encontrado
        db.delete(db_animal)
        db.commit()
        return db_animal

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")

    

#Ruta para eliminar un animal por medio del nombre
@app.delete("/eliminar_por_nombre/{animal_nombre}", response_model=schemas.Animal)
def eliminar_animal_por_nombre(animal_nombre: str, db: Session = Depends(get_db)):
    try:
        # Buscar el animal por nombre
        db_animal = db.query(models.Animal).filter(models.Animal.nombre == animal_nombre).first()
        
        # Si no se encuentra el animal, devolver un error 404
        if db_animal is None:
            raise HTTPException(status_code=404, detail="Animal not found")

        # Eliminar el animal encontrado
        db.delete(db_animal)
        db.commit()
        
        # Devolver el animal eliminado
        return db_animal

    except Exception as e:
        # En caso de error, devolver un mensaje con el error
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")


@app.get("/listar_todos/")
def listar_todos(db: Session = Depends(get_db)):
    try:
        # Usamos joinedload para cargar las relaciones y acceder a los nombres directamente
        animales = (
            db.query(models.Animal)
            .options(
                joinedload(models.Animal.cuidador),
                joinedload(models.Animal.habitat),
                joinedload(models.Animal.especie),
            )
            .all()
        )
        # Transformamos el resultado para incluir los nombres en lugar de los IDs
        return [
            {
                "id": animal.id,
                "nombre": animal.nombre,
                "fechanac": animal.fechanac,
                "cuidador": animal.cuidador.nombre if animal.cuidador else None,
                "habitat": animal.habitat.nombre if animal.habitat else None,
                "especie": animal.especie.nombre if animal.especie else None,
            }
            for animal in animales
        ]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")

    
@app.get("/buscar_por_nombre/{nombre}", response_model=list[schemas.Animal])
def buscar_por_nombre(nombre: str, db: Session = Depends(get_db)):
    try:
        animales = (
            db.query(models.Animal)
            .options(
                joinedload(models.Animal.cuidador),
                joinedload(models.Animal.habitat),
                joinedload(models.Animal.especie),
            )
            .filter(models.Animal.nombre.ilike(f"%{nombre}%"))
            .all()
        )
        if not animales:
            raise HTTPException(status_code=404, detail="No se encontraron animales con ese nombre")
        return [
            {
                "id": animal.id,
                "nombre": animal.nombre,
                "fechanac": animal.fechanac,
                "cuidador": animal.cuidador.nombre,
                "habitat": animal.habitat.nombre,
                "especie": animal.especie.nombre,
            }
            for animal in animales
        ]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")


@app.get("/buscar_por_habitat/{habitat_id}", response_model=list[schemas.Animal])
def buscar_por_habitat(habitat_id: int, db: Session = Depends(get_db)):
    try:
        animales = (
            db.query(models.Animal)
            .options(
                joinedload(models.Animal.cuidador),
                joinedload(models.Animal.habitat),
                joinedload(models.Animal.especie),
            )
            .filter(models.Animal.idhabitat == habitat_id)
            .all()
        )
        if not animales:
            raise HTTPException(status_code=404, detail="No se encontraron animales en ese hábitat")
        return [
            {
                "id": animal.id,
                "nombre": animal.nombre,
                "fechanac": animal.fechanac,
                "cuidador": animal.cuidador.nombre,
                "habitat": animal.habitat.nombre,
                "especie": animal.especie.nombre,
            }
            for animal in animales
        ]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")


@app.get("/buscar_por_cuidador/{cuidador_id}", response_model=list[schemas.Animal])
def buscar_por_cuidador(cuidador_id: int, db: Session = Depends(get_db)):
    try:
        animales = (
            db.query(models.Animal)
            .options(
                joinedload(models.Animal.cuidador),
                joinedload(models.Animal.habitat),
                joinedload(models.Animal.especie),
            )
            .filter(models.Animal.idcuidador == cuidador_id)
            .all()
        )
        if not animales:
            raise HTTPException(status_code=404, detail="No se encontraron animales bajo ese cuidador")
        return [
            {
                "id": animal.id,
                "nombre": animal.nombre,
                "fechanac": animal.fechanac,
                "cuidador": animal.cuidador.nombre,
                "habitat": animal.habitat.nombre,
                "especie": animal.especie.nombre,
            }
            for animal in animales
        ]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")


@app.get("/buscar_por_fecha/{fecha_nacimiento}", response_model=list[schemas.Animal])
def buscar_por_fecha(fecha_nacimiento: str, db: Session = Depends(get_db)):
    try:
        animales = (
            db.query(models.Animal)
            .options(
                joinedload(models.Animal.cuidador),
                joinedload(models.Animal.habitat),
                joinedload(models.Animal.especie),
            )
            .filter(models.Animal.fechanac == fecha_nacimiento)
            .all()
        )
        if not animales:
            raise HTTPException(status_code=404, detail="No se encontraron animales con esa fecha de nacimiento")
        return [
            {
                "id": animal.id,
                "nombre": animal.nombre,
                "fechanac": animal.fechanac,
                "cuidador": animal.cuidador.nombre,
                "habitat": animal.habitat.nombre,
                "especie": animal.especie.nombre,
            }
            for animal in animales
        ]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")
