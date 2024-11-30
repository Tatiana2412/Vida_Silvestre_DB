from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "postgresql+psycopg2://postgres:lt2208%4028@localhost:5432/zoologico"
#SQLALCHEMY_DATABASE_URL = "postgresql+psycopg2://postgres:lt2208%4028@localhost:5432/zoologico"
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)