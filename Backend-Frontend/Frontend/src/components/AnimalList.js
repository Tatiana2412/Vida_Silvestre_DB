// Importa la función correcta desde el archivo api
import { listarAnimales } from '../api'; // Asegúrate de que esta línea esté en la parte superior de tu archivo

// Tu componente AnimalList
import React, { useEffect, useState } from 'react';

const AnimalList = () => {
    const [animals, setAnimals] = useState([]);

    useEffect(() => {
        const fetchAnimals = async () => {
            try {
                const data = await listarAnimales();
                setAnimals(data);
            } catch (error) {
                console.error('Error fetching animals:', error);
            }
        };

        fetchAnimals();
    }, []);

    return (
        <div>
            <h1>Lista de Animales</h1>
            <ul>
                {animals.map((animal) => (
                    <li key={animal.id}>{animal.nombre}</li>
                ))}
            </ul>
        </div>
    );
};

export default AnimalList;
