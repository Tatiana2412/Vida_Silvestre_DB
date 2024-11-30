from .Base_de_datos import Base
from sqlalchemy import Column, Integer, String, Date, ForeignKey, Numeric
from sqlalchemy.orm import relationship


class Animal(Base):
    _tablename_ = 'ANIMALES'
    ID = Column(Integer, primary_key=True, index=True)
    Nombre = Column(String(50), nullable=False)
    FechaNac = Column(Date)
    IDCuidador = Column(Integer, ForeignKey('CUIDADOR.ID'))
    IDHabitat = Column(Integer, ForeignKey('HABITAT.ID'))
    IDEspecie = Column(Integer, ForeignKey('ESPECIE.ID'))
    
    cuidador = relationship("Cuidador", back_populates="animales")
    habitat = relationship("Habitat", back_populates="animales")
    especie = relationship("Especie", back_populates="animales")

class Cuidador(Base):
    _tablename_ = 'CUIDADOR'
    ID = Column(Integer, primary_key=True, index=True)
    Nombre = Column(String(50), nullable=False)
    FechaContratacion = Column(Date, nullable=False)
    Salario = Column(Numeric(10, 2), nullable=False)
    IDEspecialidad = Column(Integer, ForeignKey('ESPECIALIDAD.ID'))
    
    especialidad = relationship("Especialidad", back_populates="cuidadores")
    animales = relationship("Animal", back_populates="cuidador")

class Especialidad(Base):
    _tablename_ = 'ESPECIALIDAD'
    ID = Column(Integer, primary_key=True, index=True)
    Nombre = Column(String(50), nullable=False)
    
    cuidadores = relationship("Cuidador", back_populates="especialidad")

class Especie(Base):
    _tablename_ = 'ESPECIE'
    ID = Column(Integer, primary_key=True, index=True)
    Nombre = Column(String(50), nullable=False)
    IDFamilia = Column(Integer, ForeignKey('FAMILIA.ID'))
    IDEstadoConservacion = Column(Integer, ForeignKey('ESTADO_CONSERVACION.ID'))
    
    familia = relationship("Familia", back_populates="especies")
    estado_conservacion = relationship("EstadoConservacion", back_populates="especies")
    animales = relationship("Animal", back_populates="especie")

class Familia(Base):
    _tablename_ = 'FAMILIA'
    ID = Column(Integer, primary_key=True, index=True)
    NombreCientifico = Column(String(50), nullable=False)
    NombreComun = Column(String(50), nullable=False)
    
    especies = relationship("Especie", back_populates="familia")

class EstadoConservacion(Base):
    _tablename_ = 'ESTADO_CONSERVACION'
    ID = Column(Integer, primary_key=True, index=True)
    Codigo = Column(String(2), nullable=False)
    Nombre = Column(String(50), nullable=False)
    Descripcion = Column(String(50), nullable=False)
    
    especies = relationship("Especie", back_populates="estado_conservacion")

class Habitat(Base):
    _tablename_ = 'HABITAT'
    ID = Column(Integer, primary_key=True, index=True)
    Nombre = Column(String(50), nullable=False)
    IDUbicacion = Column(Integer, ForeignKey('UBICACION.ID'))
    CostoBase = Column(Numeric(10, 2), nullable=False)
    IDClima = Column(Integer, ForeignKey('CLIMA.ID'))
    
    ubicacion = relationship("Ubicacion", back_populates="habitats")
    clima = relationship("Clima", back_populates="habitats")
    animales = relationship("Animal", back_populates="habitat")

class Ubicacion(Base):
    _tablename_ = 'UBICACION'
    ID = Column(Integer, primary_key=True, index=True)
    Nombre = Column(String(50), nullable=False)
    
    habitats = relationship("Habitat", back_populates="ubicacion")

class Clima(Base):
    _tablename_ = 'CLIMA'
    ID = Column(Integer, primary_key=True, index=True)
    Nombre = Column(String(50), nullable=False)
    
    habitats = relationship("Habitat", back_populates="clima")

class TipoVisitante(Base):
    _tablename_ = 'TIPO_VISITANTES'
    ID = Column(Integer, primary_key=True, index=True)
    Nombre = Column(String(50), nullable=False)
    Descuento = Column(Numeric(5, 2), nullable=False)

class Visitante(Base):
    _tablename_ = 'VISITANTES'
    ID = Column(Integer, primary_key=True, index=True)
    Nombre = Column(String(50), nullable=False)
    IDTipoVisitante = Column(Integer, ForeignKey('TIPO_VISITANTES.ID'))
    
    tipo_visitante = relationship("TipoVisitante")

class HabitatVisitantes(Base):
    _tablename_ = 'HABITAT_VISITANTES'
    ID = Column(Integer, primary_key=True, index=True)
    IDHabitat = Column(Integer, ForeignKey('HABITAT.ID'))
    IDVisitantes = Column(Integer, ForeignKey('VISITANTES.ID'))
    CostoFinal = Column(Numeric(10, 2), nullable=False)
    FechaVisita = Column(Date, nullable=False)
    
    habitat = relationship("Habitat")
    visitante = relationship("Visitante")