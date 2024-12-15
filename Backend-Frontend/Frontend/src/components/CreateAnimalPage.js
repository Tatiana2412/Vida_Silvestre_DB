import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateAnimalPage.css';

const CreateAnimalPage = () => {
    const [animalName, setAnimalName] = useState('');
    const [animalSpecies, setAnimalSpecies] = useState('');
    const [animalBirthDate, setAnimalBirthDate] = useState('');
    const [animalCaretakerId, setAnimalCaretakerId] = useState('');
    const [animalHabitatId, setAnimalHabitatId] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [showModal, setShowModal] = useState(false); // Estado para mostrar el modal
    const navigate = useNavigate();

    const handleCreateAnimal = async () => {
        // Validación básica
        if (!animalName || !animalSpecies || !animalBirthDate || !animalCaretakerId || !animalHabitatId) {
            setError('Por favor, complete todos los campos.');
            return;
        }

        const animalData = {
            nombre: animalName,
            fechanac: animalBirthDate,
            idcuidador: parseInt(animalCaretakerId, 10),
            idhabitat: parseInt(animalHabitatId, 10),
            idespecie: parseInt(animalSpecies, 10),
        };

        try {
            const response = await fetch('http://127.0.0.1:8000/crear_animal/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(animalData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Error desconocido al crear el animal.');
            }

            const result = await response.json();
            setSuccessMessage(`Animal creado con éxito: ${result.nombre}`);
            setError(null);
            setShowModal(true); // Mostrar modal de éxito

            // Limpiar formulario
            setAnimalName('');
            setAnimalSpecies('');
            setAnimalBirthDate('');
            setAnimalCaretakerId('');
            setAnimalHabitatId('');
        } catch (err) {
            setError(`Error: ${err.message}`);
            setSuccessMessage(null);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false); // Cerrar modal
    };

    return (
        <div className="create-animal-container">
            <h1 className="create-animal-title">INGRESE LOS DATOS DEL ANIMAL</h1>
            {error && <div className="error-message">{error}</div>}
            <form className="create-animal-form">
                <div className="create-animal-form-group">
                    <label htmlFor="animalName">Nombre:</label>
                    <input
                        type="text"
                        id="animalName"
                        value={animalName}
                        onChange={(e) => setAnimalName(e.target.value)}
                        required
                    />
                </div>
                <div className="create-animal-form-group">
                    <label htmlFor="animalSpecies">ID de Especie:</label>
                    <input
                        type="number"
                        id="animalSpecies"
                        value={animalSpecies}
                        onChange={(e) => setAnimalSpecies(e.target.value)}
                        required
                    />
                </div>
                <div className="create-animal-form-group">
                    <label htmlFor="animalBirthDate">Fecha de nacimiento:</label>
                    <input
                        type="date"
                        id="animalBirthDate"
                        value={animalBirthDate}
                        onChange={(e) => setAnimalBirthDate(e.target.value)}
                        required
                    />
                </div>
                <div className="create-animal-form-group">
                    <label htmlFor="animalCaretakerId">ID de Cuidador:</label>
                    <input
                        type="number"
                        id="animalCaretakerId"
                        value={animalCaretakerId}
                        onChange={(e) => setAnimalCaretakerId(e.target.value)}
                        required
                    />
                </div>
                <div className="create-animal-form-group">
                    <label htmlFor="animalHabitatId">ID de Hábitat:</label>
                    <input
                        type="number"
                        id="animalHabitatId"
                        value={animalHabitatId}
                        onChange={(e) => setAnimalHabitatId(e.target.value)}
                        required
                    />
                </div>
                <div className="create-animal-button-container">
                    <button
                        type="button"
                        className="create-animal-back-button"
                        onClick={() => navigate('/')}
                    >
                        Atrás
                    </button>
                    <button
                        type="button"
                        className="create-animal-submit-button"
                        onClick={handleCreateAnimal}
                    >
                        Crear
                    </button>
                    
                </div>
            </form>

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>{successMessage}</h2>
                        <button onClick={handleCloseModal}>Cerrar</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreateAnimalPage;
