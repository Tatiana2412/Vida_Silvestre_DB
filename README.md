# Vida_Silvestre_DB

# 🚀 Vida Silvestre - Sistema CRUD para Zoológicos

**Desarrolladores**: Erwin jaime, Tatiana Nieto, Alexis Castellanos, Leyder Jaimes
**Directorio Fuente**: \src\Byte_Builders\Vida_Silvestre_DB 📂  
**Creado**: 10-Diciembre-2024 🗓️  
**Última Actualización**: 10-Diciembre-2024 ✨

## Descripción

Bienvenido a **Nuestro Proyecto**! Este repositorio alberga un sistema web diseñado para gestionar de manera eficiente la información sobre los animales de un zoológico. Este software permite realizar las operaciones básicas de CRUD (Crear, Leer, Actualizar y Eliminar) en una tabla de una base de datos, asegurando un manejo sencillo e intuitivo de los datos.

## Especificaciones Técnicas

## Tecnologías Utilizadas
- Backend: FastAPI
- Frontend: React.js
- Base de Datos: PostgreSQL
- Lenguajes: Python, JavaScript

## Estructura de la Base de Datos

La base de datos incluye una tabla principal llamada **animales,** con los siguientes campos:
## Tabla: animales 🦊
**Campo**	 **Tipo**     **Descripcion** 
id	         serial	      Identificador unico del animal
nombre	     varchar	  Nombre del animal
Fechanac	 date	      Fecha de nacimiento del animal
idcuidador	 serial	      Identificador unico del cuiador acargo del animal
idhabitat	 serial	      Identificador unico del habitat del animal
idespecie	 serial	      Identificador unico de la especie del animal

## Relaciones

## 1. animales -> cuidador
un cuiador tiene a cargo muchos animales y un animal tiene un cuiador
**uno a muchos**
## 2. animales -> habitat
un animal vive en un habitat y un habitat tiene muchos animales
**uno a muchos**
## 3. animales -> especie
un animal pertenece a una especie y a una especie pertenecen muchos animales
**uno a muchos**

## Tabla: cuidador 👮🏼

**Campo**	        **Tipo**	**Descripcion**
id	                serial	    Identificador unico del cuidador
nombre	            varchar	    Nombre del cuiador
fechacontratacion	date	    Fecha de contratcion del cuiador
idespecialidad	    serial	    Identificador unico de la especialidad del cuiador
salario	            numeric	    Salario del cuidador

## Tabla habitat 🌳

**Campo**	    **Tipo**	**Descripcion**
id	            serial	    Identificador unico del habitat
nombre	        varchar	    Nombre del habitat
idubicacion	    serial	    Identificador unico de la ubicacion del habitat
idclima	        serial	    Identificador unico del tipo de clima del habitat
costobase	    numeric	    Costo base para visitar el habitat

## Tabla especie 🦊

**Campo**	            **Tipo**	**Descripcion** 
id	                    serial	    Identificador unico de la especie
nombre	                varchar	    Nombre de la especie
idfamilia	            serial	    Identificador unico de la familia de la especie
idestadoconservacion	serial	    Identificador unico del estado de conservacion

## Instrucciones para manejar el sistema 📚

En los siguientes links encontraras el manual de usuario y el manual tecnico de la apliacion donde encontraras toda la informacion necesaria para manejar de forma adecuada nuestra apliacion esperamos sea de su agrado. 😃