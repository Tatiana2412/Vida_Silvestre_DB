import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateAnimalPage.css';

const CreateAnimalPage = () => {
    const [animalName, setAnimalName] = useState('');
    const [animalSpecies, setAnimalSpecies] = useState('');
    const [animalBirthDate, setAnimalBirthDate] = useState('');
    const [animalCaretaker, setAnimalCaretaker] = useState('');
    const [animalHabitat, setAnimalHabitat] = useState('');
    const navigate = useNavigate();

    const handleCreateAnimal = () => {
        console.log('Animal creado:', { 
            name: animalName, 
            species: animalSpecies, 
            birthDate: animalBirthDate, 
            caretaker: animalCaretaker, 
            habitat: animalHabitat 
        });
    };

    return (
        <div className="create-animal-container">
            <h1 className="create-animal-title">INGRESE LOS DATOS DEL ANIMAL</h1>
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
                    <label htmlFor="animalSpecies">Especie:</label>
                    <input
                        type="text"
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
                    <label htmlFor="animalCaretaker">Cuidador:</label>
                    <input
                        type="text"
                        id="animalCaretaker"
                        value={animalCaretaker}
                        onChange={(e) => setAnimalCaretaker(e.target.value)}
                        required
                    />
                </div>
                <div className="create-animal-form-group">
                    <label htmlFor="animalHabitat">Hábitat:</label>
                    <input
                        type="text"
                        id="animalHabitat"
                        value={animalHabitat}
                        onChange={(e) => setAnimalHabitat(e.target.value)}
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
        </div>
    );
};

export default CreateAnimalPage;
