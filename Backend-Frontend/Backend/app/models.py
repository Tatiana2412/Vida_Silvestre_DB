from .database import Base
from sqlalchemy import Column, Integer, String, Date, ForeignKey, Numeric
from sqlalchemy.orm import relationship

class Animal(Base):
    __tablename__ = 'animales'
    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(50), nullable=False)
    fechanac = Column(Date)
    idcuidador = Column(Integer, ForeignKey('cuidador.id'))
    idhabitat = Column(Integer, ForeignKey('habitat.id'))
    idespecie = Column(Integer, ForeignKey('especie.id'))
    
    cuidador = relationship("Cuidador", back_populates="animales")
    habitat = relationship("Habitat", back_populates="animales")
    especie = relationship("Especie", back_populates="animales")

class Cuidador(Base):
    __tablename__ = 'cuidador'
    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(50), nullable=False)
    fechacontratacion = Column(Date, nullable=False)
    salario = Column(Numeric(10, 2), nullable=False)
    idespecialidad = Column(Integer, ForeignKey('especialidad.id'))
    
    especialidad = relationship("Especialidad", back_populates="cuidadores")
    animales = relationship("Animal", back_populates="cuidador")

class Especialidad(Base):
    __tablename__ = 'especialidad'
    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(50), nullable=False)
    
    cuidadores = relationship("Cuidador", back_populates="especialidad")

class Especie(Base):
    __tablename__ = 'especie'
    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(50), nullable=False)
    idfamilia = Column(Integer, ForeignKey('familia.id'))
    idestadoconservacion = Column(Integer, ForeignKey('estado_conservacion.id'))
    
    familia = relationship("Familia", back_populates="especies")
    estado_conservacion = relationship("EstadoConservacion", back_populates="especies")
    animales = relationship("Animal", back_populates="especie")

class Familia(Base):
    __tablename__ = 'familia'
    id = Column(Integer, primary_key=True, index=True)
    nombreCientifico = Column(String(50), nullable=False)
    nombrecomun = Column(String(50), nullable=False)
    
    especies = relationship("Especie", back_populates="familia")

class EstadoConservacion(Base):
    __tablename__ = 'estado_conservacion'
    id = Column(Integer, primary_key=True, index=True)
    codigo = Column(String(2), nullable=False)
    nombre = Column(String(50), nullable=False)
    descripcion = Column(String(50), nullable=False)
    
    especies = relationship("Especie", back_populates="estado_conservacion")

class Habitat(Base):
    __tablename__ = 'habitat'
    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(50), nullable=False)
    idubicacion = Column(Integer, ForeignKey('ubicacion.id'))
    costobase = Column(Numeric(10, 2), nullable=False)
    idclima = Column(Integer, ForeignKey('clima.id'))
    
    ubicacion = relationship("Ubicacion", back_populates="habitats")
    clima = relationship("Clima", back_populates="habitats")
    animales = relationship("Animal", back_populates="habitat")

class Ubicacion(Base):
    __tablename__ = 'ubicacion'
    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(50), nullable=False)
    
    habitats = relationship("Habitat", back_populates="ubicacion")

class Clima(Base):
    __tablename__ = 'clima'
    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(50), nullable=False)
    
    habitats = relationship("Habitat", back_populates="clima")

class TipoVisitante(Base):
    __tablename__ = 'tipo_visitantes'
    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(50), nullable=False)
    descuento = Column(Numeric(5, 2), nullable=False)

class Visitante(Base):
    __tablename__ = 'visitantes'
    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(50), nullable=False)
    idtipovisitante = Column(Integer, ForeignKey('tipo_visitantes.id'))
    
    tipo_visitante = relationship("TipoVisitante")

class HabitatVisitantes(Base):
    __tablename__ = 'habitat_visitantes'
    id = Column(Integer, primary_key=True, index=True)
    idhabitat = Column(Integer, ForeignKey('habitat.id'))
    idvisitantes = Column(Integer, ForeignKey('visitantes.id'))
    CostoFinal = Column(Numeric(10, 2), nullable=False)
    FechaVisita = Column(Date, nullable=False)
    
    habitat = relationship("Habitat")
    visitante = relationship("Visitante")
