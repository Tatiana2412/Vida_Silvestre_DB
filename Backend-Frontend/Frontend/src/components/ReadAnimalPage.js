import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ReadAnimalPage.css';

const ReadAnimalPage = () => {
    const navigate = useNavigate();

    // Estado para rastrear qué campo está habilitado
    const [enabledField, setEnabledField] = useState(null);

    // Función para manejar la activación de un campo
    const handleEnableField = (field) => {
        // Si el campo actual ya está habilitado, lo deshabilita
        setEnabledField((prevField) => (prevField === field ? null : field));
    };

    // Función para manejar la acción de búsqueda
    const handleSearch = () => {
        alert(`Buscando en el campo: ${enabledField}`);
    };

    return (
        <div className="read-container">
            <h1 className="read-title">BUSCAR ANIMALES</h1>

            <form className="read-form">
                {/* Grupo de Nombre */}
                <div className="form-group">
                    <label htmlFor="name">Buscar Nombre</label>
                    <input
                        type="text"
                        id="name"
                        placeholder="Ingrese nombre"
                        disabled={enabledField !== 'name'}
                    />
                    <input
                        type="checkbox"
                        checked={enabledField === 'name'}
                        onChange={() => handleEnableField('name')}
                    />
                </div>

                {/* Grupo de ID */}
                <div className="form-group">
                    <label htmlFor="id">Buscar por ID</label>
                    <input
                        type="text"
                        id="id"
                        placeholder="Ingrese ID"
                        disabled={enabledField !== 'id'}
                    />
                    <input
                        type="checkbox"
                        checked={enabledField === 'id'}
                        onChange={() => handleEnableField('id')}
                    />
                </div>

                {/* Grupo de Fecha */}
                <div className="form-group">
                    <label htmlFor="date">Buscar por Fecha</label>
                    <input
                        type="date"
                        id="date"
                        disabled={enabledField !== 'date'}
                    />
                    <input
                        type="checkbox"
                        checked={enabledField === 'date'}
                        onChange={() => handleEnableField('date')}
                    />
                </div>

                {/* Grupo de Hábitat */}
                <div className="form-group">
                    <label htmlFor="habitat">Buscar por Hábitat</label>
                    <input
                        type="text"
                        id="habitat"
                        placeholder="Ingrese hábitat"
                        disabled={enabledField !== 'habitat'}
                    />
                    <input
                        type="checkbox"
                        checked={enabledField === 'habitat'}
                        onChange={() => handleEnableField('habitat')}
                    />
                </div>

                {/* Grupo de Cuidador */}
                <div className="form-group">
                    <label htmlFor="caretaker">Buscar por Cuidador</label>
                    <input
                        type="text"
                        id="caretaker"
                        placeholder="Ingrese cuidador"
                        disabled={enabledField !== 'caretaker'}
                    />
                    <input
                        type="checkbox"
                        checked={enabledField === 'caretaker'}
                        onChange={() => handleEnableField('caretaker')}
                    />
                </div>
            </form>

            {/* Contenedor de botones */}
            <div className="read-buttons">
                <button className="read-search-button" onClick={handleSearch}>
                    Buscar
                </button>
                <button className="read-back-button" onClick={() => navigate('/')}>
                    Atrás
                </button>
            </div>
        </div>
    );
};

export default ReadAnimalPage;
