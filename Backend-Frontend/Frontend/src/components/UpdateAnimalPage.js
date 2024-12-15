import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UpdateAnimalPage.css'; // Importa el archivo de estilos

const UpdateAnimalPage = () => {
    const [animalId, setAnimalId] = useState('');
    const [animalName, setAnimalName] = useState('');
    const [animalData, setAnimalData] = useState({
        name: '',
        species: '',
        birthDate: '',
        caretaker: '',
        habitat: '',
    });
    const [selectedField, setSelectedField] = useState(''); // Controla cuál campo está habilitado para edición
    const [isEditing, setIsEditing] = useState(false); // Determina si estamos en modo de edición

    const navigate = useNavigate();

    // Función para permitir la edición del animal
    const handleEdit = async () => {
        let url = '';

        if (selectedField === 'id' && animalId) {
            url = `http://127.0.0.1:8000/obtener_animal/${animalId}`;
        } else if (selectedField === 'name' && animalName) {
            url = `http://127.0.0.1:8000/buscar_por_nombre/${animalName}`;
        } else {
            alert('Por favor ingresa el ID o el Nombre del animal para editar.');
            return;
        }

        try {
            const response = await fetch(url);
            if (!response.ok) {
                alert('No se encontró el animal.');
                return;
            }

            const data = await response.json();

            // Si se busca por nombre y se reciben múltiples resultados, tomar el primero
            const animal = Array.isArray(data) ? data[0] : data;

            // Ajustar los nombres de los campos recibidos del backend
            setAnimalData({
                name: animal.nombre || '',
                species: animal.especie || '',
                birthDate: animal.fechanac || '',
                caretaker: animal.cuidador || '',
                habitat: animal.habitat || '',
            });

            setAnimalId(animal.id || animalId); // Guarda el ID en caso de buscar por nombre
            setIsEditing(true); // Activa el modo de edición
        } catch (error) {
            console.error('Error al obtener el animal:', error);
            alert('Ocurrió un error al buscar el animal.');
        }
    };

    // Función para manejar el cambio de los campos de datos
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAnimalData((prev) => ({ ...prev, [name]: value }));
    };

    // Función para manejar el update de los datos
    const handleUpdate = async () => {
        const url = `http://127.0.0.1:8000/Actualizar_animal/${animalId}`;
        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    nombre: animalData.name,
                    idespecie: animalData.species,
                    fechanac: animalData.birthDate,
                    idcuidador: animalData.caretaker,
                    idhabitat: animalData.habitat,
                }),
            });

            if (!response.ok) {
                alert('Error al actualizar el animal.');
                return;
            }

            alert('Animal actualizado correctamente.');
            handleReset();
        } catch (error) {
            console.error('Error al actualizar el animal:', error);
            alert('Ocurrió un error al actualizar el animal.');
        }
    };

    // Función para reiniciar los campos después de actualizar un animal
    const handleReset = () => {
        setAnimalId('');
        setAnimalName('');
        setAnimalData({
            name: '',
            species: '',
            birthDate: '',
            caretaker: '',
            habitat: '',
        });
        setIsEditing(false);
        setSelectedField(''); // Reinicia el campo seleccionado
    };

    return (
        <div className="update-animal-container">
            <h1 className="update-animal-title">ACTUALIZAR ANIMAL</h1>
            <form className="update-animal-form">
                {/* Casilla de selección para ID */}
                <div className="update-animal-form-group">
                    <input
                        type="checkbox"
                        id="idCheckbox"
                        checked={selectedField === 'id'}
                        onChange={() => {
                            setSelectedField('id');
                            setAnimalName('');
                        }}
                        disabled={isEditing}
                    />
                    <label htmlFor="animalId">ID del animal a actualizar:</label>
                    <input
                        type="text"
                        id="animalId"
                        value={animalId}
                        onChange={(e) => setAnimalId(e.target.value)}
                        disabled={selectedField !== 'id'}
                    />
                </div>

                {/* Casilla de selección para Nombre */}
                <div className="update-animal-form-group">
                    <input
                        type="checkbox"
                        id="nameCheckbox"
                        checked={selectedField === 'name'}
                        onChange={() => {
                            setSelectedField('name');
                            setAnimalId('');
                        }}
                        disabled={isEditing}
                    />
                    <label htmlFor="animalName">Nombre del animal a actualizar:</label>
                    <input
                        type="text"
                        id="animalName"
                        value={animalName}
                        onChange={(e) => setAnimalName(e.target.value)}
                        disabled={selectedField !== 'name'}
                    />
                </div>

                {/* Botón para editar el animal */}
                <button
                    type="button"
                    className="update-animal-edit-button"
                    onClick={handleEdit}
                    disabled={isEditing}
                >
                    Editar
                </button>

                {/* Campos para actualizar el resto de los datos */}
                <div className="update-animal-form-group">
                    <label htmlFor="name">Nombre:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={animalData.name}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                    />
                </div>

                <div className="update-animal-form-group">
                    <label htmlFor="species">Especie:</label>
                    <input
                        type="text"
                        id="species"
                        name="species"
                        value={animalData.species}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                    />
                </div>

                <div className="update-animal-form-group">
                    <label htmlFor="birthDate">Fecha de Nacimiento:</label>
                    <input
                        type="date"
                        id="birthDate"
                        name="birthDate"
                        value={animalData.birthDate}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                    />
                </div>

                <div className="update-animal-form-group">
                    <label htmlFor="caretaker">Cuidador:</label>
                    <input
                        type="text"
                        id="caretaker"
                        name="caretaker"
                        value={animalData.caretaker}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                    />
                </div>

                <div className="update-animal-form-group">
                    <label htmlFor="habitat">Hábitat:</label>
                    <input
                        type="text"
                        id="habitat"
                        name="habitat"
                        value={animalData.habitat}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                    />
                </div>
            </form>

            <div className="update-animal-button-container">
                <button
                    type="button"
                    className="update-animal-back-button"
                    onClick={() => navigate('/')}
                >
                    Atrás
                </button>
                <button
                    type="button"
                    className="update-animal-submit-button"
                    onClick={handleUpdate}
                    disabled={!isEditing}
                >
                    Actualizar
                </button>


                <button
                    type="button"
                    className="update-animal-submit-button"
                    onClick={handleReset}
                >
                    Editar otro
                </button>
            </div>
        </div>
    );
};

export default UpdateAnimalPage;