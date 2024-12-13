import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DeleteAnimalPage.css'; // Importa el archivo de estilos

const DeleteAnimalPage = () => {
    const [searchBy, setSearchBy] = useState({ name: false, id: false, habitat: false });
    const [searchValue, setSearchValue] = useState('');
    const [results, setResults] = useState([]);
    const [selectedAnimalId, setSelectedAnimalId] = useState(null);

    const navigate = useNavigate();

    const handleCheckboxChange = (field) => {
        setSearchBy({
            name: field === 'name',
            id: field === 'id',
            habitat: field === 'habitat'
        });
        setSearchValue(''); // Limpia el campo de búsqueda al cambiar el filtro
        setResults([]); // Limpia los resultados
    };

    const handleSearch = () => {
        // Simula una búsqueda basada en los filtros seleccionados
        const mockResults = [
            { id: '123', name: 'Lola', habitat: 'Marina' },
            { id: '456', name: 'Felipe', habitat: 'Selva' },
            { id: '789', name: 'Foca', habitat: 'Polar' }
        ];

        const filteredResults = mockResults.filter((animal) => {
            if (searchBy.name) {
                return animal.name.toLowerCase().includes(searchValue.toLowerCase());
            }
            if (searchBy.id) {
                return animal.id.includes(searchValue);
            }
            if (searchBy.habitat) {
                return animal.habitat.toLowerCase().includes(searchValue.toLowerCase());
            }
            return false;
        });

        setResults(filteredResults);
    };

    const handleDelete = () => {
        if (!selectedAnimalId) {
            alert('Por favor, seleccione un animal para eliminar.');
            return;
        }

        // Lógica para eliminar el animal
        console.log('Animal eliminado con ID:', selectedAnimalId);
        alert('Animal eliminado correctamente.');
        setResults(results.filter((animal) => animal.id !== selectedAnimalId));
    };

    return (
        <div className="delete-animal-container">
            <h1 className="delete-animal-title">ELIMINAR ANIMAL</h1>
            <form className="delete-animal-form">
                <div className="delete-animal-form-group">
                    <input
                        type="checkbox"
                        checked={searchBy.name}
                        onChange={() => handleCheckboxChange('name')}
                    />
                    <label htmlFor="searchName">Buscar por Nombre:</label>
                    <input
                        type="text"
                        id="searchName"
                        value={searchBy.name ? searchValue : ''}
                        onChange={(e) => setSearchValue(e.target.value)}
                        disabled={!searchBy.name}
                    />
                </div>

                <div className="delete-animal-form-group">
                    <input
                        type="checkbox"
                        checked={searchBy.id}
                        onChange={() => handleCheckboxChange('id')}
                    />
                    <label htmlFor="searchId">Buscar por ID:</label>
                    <input
                        type="text"
                        id="searchId"
                        value={searchBy.id ? searchValue : ''}
                        onChange={(e) => setSearchValue(e.target.value)}
                        disabled={!searchBy.id}
                    />
                </div>

                <div className="delete-animal-form-group">
                    <input
                        type="checkbox"
                        checked={searchBy.habitat}
                        onChange={() => handleCheckboxChange('habitat')}
                    />
                    <label htmlFor="searchHabitat">Buscar por Hábitat:</label>
                    <input
                        type="text"
                        id="searchHabitat"
                        value={searchBy.habitat ? searchValue : ''}
                        onChange={(e) => setSearchValue(e.target.value)}
                        disabled={!searchBy.habitat}
                    />
                </div>
            </form>

            <div className="delete-animal-results-container">
                {results.map((animal) => (
                    <div
                        key={animal.id}
                        className="delete-animal-results-item"
                        onClick={() => setSelectedAnimalId(animal.id)}
                        style={{
                            backgroundColor: selectedAnimalId === animal.id ? '#dff9fb' : '#f7f7f7'
                        }}
                    >
                        <span>{animal.name}</span>
                        <span>{animal.id}</span>
                        <span>{animal.habitat}</span>
                    </div>
                ))}
            </div>

            <div className="delete-animal-button-container">
                <button
                    type="button"
                    className="delete-animal-search-button"
                    onClick={handleSearch}
                >
                    Buscar
                </button>
                <button
                    type="button"
                    className="delete-animal-delete-button"
                    onClick={handleDelete}
                >
                    Eliminar
                </button>
                <button
                    type="button"
                    className="delete-animal-back-button"
                    onClick={() => navigate('/')}
                >
                    Volver
                </button>
            </div>
        </div>
    );
};

export default DeleteAnimalPage;
