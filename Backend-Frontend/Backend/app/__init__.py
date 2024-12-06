# __init__.py file can be empty or include initializations
# Here, you can import all the necessary components if needed

# For example:
from sqlalchemy.engine import URL
from .database import Base, engine, SessionLocal
from .models import Animal, Cuidador, Especialidad, Especie, Familia, EstadoConservacion, Habitat, Ubicacion, Clima, TipoVisitante, Visitante, HabitatVisitantes
from .schemas import AnimalBase, AnimalCreate, AnimalUpdate, Animal
from .crud import create_animal, get_animals, get_animal_by_id, update_animal, delete_animal
