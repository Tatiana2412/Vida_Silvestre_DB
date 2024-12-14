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
        habitat: ''
    });
    const [selectedField, setSelectedField] = useState(''); // Controla cuál campo está habilitado para edición
    const [isEditing, setIsEditing] = useState(false); // Determina si estamos en modo de edición

    const navigate = useNavigate();

    // Función para permitir la edición del animal
    const handleEdit = () => {
        if (!animalId && !animalName) {
            alert('Ingrese el ID o el nombre del animal para editar.');
            return;
        }
        setIsEditing(true); // Habilitamos la edición
    };

    // Función para manejar el cambio de los campos de datos
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAnimalData((prev) => ({ ...prev, [name]: value }));
    };

    // Función para manejar el update de los datos
    const handleUpdate = () => {
        console.log('Datos actualizados:', animalData);
        alert('Animal actualizado correctamente');
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
            habitat: ''
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
                            setAnimalName(''); // Deshabilitar nombre
                        }}
                        disabled={isEditing}
                    />
                    <label htmlFor="animalId">ID del animal a actualizar:</label>
                    <input
                        type="text"
                        id="animalId"
                        value={animalId}
                        onChange={(e) => setAnimalId(e.target.value)}
                        disabled={selectedField !== 'id'} // Deshabilita si no está seleccionado
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
                            setAnimalId(''); // Deshabilitar ID
                        }}
                        disabled={isEditing}
                    />
                    <label htmlFor="animalName">Nombre del animal a actualizar:</label>
                    <input
                        type="text"
                        id="animalName"
                        value={animalName}
                        onChange={(e) => setAnimalName(e.target.value)}
                        disabled={selectedField !== 'name'} // Deshabilita si no está seleccionado
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
                {/* Botón de volver a la página principal */}
                <button
                    type="button"
                    className="update-animal-back-button"
                    onClick={() => navigate('/')}
                >
                    Atrás
                </button>

                {/* Botón de Actualización */}
                <button
                    type="button"
                    className="update-animal-submit-button"
                    onClick={handleUpdate}
                    disabled={!isEditing}
                 >
                    Actualizar
                </button>

                {/* Botón para reiniciar el formulario */}
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
    