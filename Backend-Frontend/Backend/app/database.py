from sqlalchemy import URL, create_engine
from sqlalchemy.ext.declarative import declarative_base 
from sqlalchemy.orm import sessionmaker 

from sqlalchemy.engine import URL


DATABASE_URL = "postgresql+psycopg2://postgres:Kush534@localhost:5432/zoo"
#SQLALCHEMY_DATABASE_URL = "postgresql+psycopg2://postgres:lamus.1234*@localhost:5432/zoologico"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()       