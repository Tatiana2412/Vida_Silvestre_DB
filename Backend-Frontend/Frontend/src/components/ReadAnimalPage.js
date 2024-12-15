import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ReadAnimalPage.css';

const ReadAnimalPage = () => {
    const navigate = useNavigate();

    const [enabledField, setEnabledField] = useState(null);
    const [fieldValue, setFieldValue] = useState('');
    const [results, setResults] = useState(null);  // Almacena los resultados de la búsqueda
    const [allAnimals, setAllAnimals] = useState(null);  // Almacena todos los animales
    const [showPopup, setShowPopup] = useState(false);    // Controla la visibilidad del popup
    const [showSearchPopup, setShowSearchPopup] = useState(false);  // Nuevo estado para el popup de búsqueda
    const [currentPage, setCurrentPage] = useState(1);    // Página actual
    const resultsPerPage = 10;  // Cantidad de resultados por página

    const handleEnableField = (field) => {
        setEnabledField((prevField) => (prevField === field ? null : field));
        setFieldValue(''); // Limpiar el valor cuando se cambia de campo
    };

    const handleSearch = async () => {
        if (!enabledField || !fieldValue) {
            alert("Seleccione un campo y proporcione un valor para buscar.");
            return;
        }

        let url = '';

        switch (enabledField) {
            case 'id':
                url = `http://127.0.0.1:8000/obtener_animal/${fieldValue}`;
                break;
            case 'name':
                url = `http://127.0.0.1:8000/buscar_por_nombre/${fieldValue}`;
                break;
            case 'date':
                url = `http://127.0.0.1:8000/buscar_por_fecha/${fieldValue}`;
                break;
            case 'habitat':
                url = `http://127.0.0.1:8000/buscar_por_habitat/${fieldValue}`;
                break;
            case 'caretaker':
                url = `http://127.0.0.1:8000/buscar_por_cuidador/${fieldValue}`;
                break;
            default:
                alert("Campo no válido.");
                return;
        }

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            const data = await response.json();

            // Verificar si la respuesta es un solo objeto (en caso de buscar por ID)
            if (enabledField === 'id' && data) {
                setResults([data]); // Si es un solo objeto, lo convertimos a un array
            } else {
                setResults(data);  // Si es una lista, simplemente lo seteamos
            }

            // Mostrar la ventana emergente con los resultados
            setShowSearchPopup(true);

        } catch (error) {
            alert(`Error al buscar: ${error.message}`);
        }
    };

    // Función para ver todos los animales con paginación
    const handleViewAllAnimals = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/listar_todos/');
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            const data = await response.json();
            setAllAnimals(data);
            setShowPopup(true); // Mostrar el popup
        } catch (error) {
            alert(`Error al obtener los animales: ${error.message}`);
        }
    };

    // Función para cerrar el popup
    const closePopup = () => {
        setShowPopup(false);
    };

    // Función para cambiar de página
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Función para obtener los animales por página
    const paginateResults = (data) => {
        if (!data) return [];

        const startIndex = (currentPage - 1) * resultsPerPage;
        const endIndex = startIndex + resultsPerPage;
        return data.slice(startIndex, endIndex);
    };

    // Función para mostrar los resultados de búsqueda en formato tabla
    const renderResultsTable = (data) => (
        <div>
            <h2>Resultados de la Búsqueda:</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Fecha Nacimiento</th>
                        <th>Hábitat</th>
                        <th>Cuidador</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(data) ? (
                        data.map((animal, index) => (
                            <tr key={index}>
                                <td>{animal.id}</td>
                                <td>{animal.nombre}</td>
                                <td>{animal.fechanac}</td>
                                <td>{animal.habitat}</td>
                                <td>{animal.cuidador}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td>{data.id}</td>
                            <td>{data.nombre}</td>
                            <td>{data.fechonac}</td>
                            <td>{data.habitat}</td>
                            <td>{data.cuidador}</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Paginación */}
            <div className="pagination">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Anterior
                </button>
                <span>Página {currentPage}</span>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={data.length <= currentPage * resultsPerPage}
                >
                    Siguiente
                </button>
            </div>
        </div>
    );

    // Paginación para ver todos los animales
    const paginateAllAnimals = () => paginateResults(allAnimals);

    return (
        <div className="read-container">
            <h1 className="read-title">BUSCAR ANIMALES</h1>

            <form className="read-form">
                <div className="form-group">
                    <label htmlFor="id">Buscar por ID</label>
                    <input
                        type="text"
                        id="id"
                        value={enabledField === 'id' ? fieldValue : ''}
                        placeholder="Ingrese ID"
                        disabled={enabledField !== 'id'}
                        onChange={(e) => setFieldValue(e.target.value)}
                    />
                    <input
                        type="checkbox"
                        checked={enabledField === 'id'}
                        onChange={() => handleEnableField('id')}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="name">Buscar por Nombre</label>
                    <input
                        type="text"
                        id="name"
                        value={enabledField === 'name' ? fieldValue : ''}
                        placeholder="Ingrese Nombre"
                        disabled={enabledField !== 'name'}
                        onChange={(e) => setFieldValue(e.target.value)}
                    />
                    <input
                        type="checkbox"
                        checked={enabledField === 'name'}
                        onChange={() => handleEnableField('name')}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="date">Buscar por Fecha de Nacimiento</label>
                    <input
                        type="date"
                        id="date"
                        value={enabledField === 'date' ? fieldValue : ''}
                        disabled={enabledField !== 'date'}
                        onChange={(e) => setFieldValue(e.target.value)}
                    />
                    <input
                        type="checkbox"
                        checked={enabledField === 'date'}
                        onChange={() => handleEnableField('date')}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="habitat">Buscar por Hábitat</label>
                    <input
                        type="text"
                        id="habitat"
                        value={enabledField === 'habitat' ? fieldValue : ''}
                        placeholder="Ingrese Hábitat"
                        disabled={enabledField !== 'habitat'}
                        onChange={(e) => setFieldValue(e.target.value)}
                    />
                    <input
                        type="checkbox"
                        checked={enabledField === 'habitat'}
                        onChange={() => handleEnableField('habitat')}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="caretaker">Buscar por Cuidador</label>
                    <input
                        type="text"
                        id="caretaker"
                        value={enabledField === 'caretaker' ? fieldValue : ''}
                        placeholder="Ingrese Cuidador"
                        disabled={enabledField !== 'caretaker'}
                        onChange={(e) => setFieldValue(e.target.value)}
                    />
                    <input
                        type="checkbox"
                        checked={enabledField === 'caretaker'}
                        onChange={() => handleEnableField('caretaker')}
                    />
                </div>
            </form>

            <div className="read-buttons">
                
                <button className="read-back-button" onClick={() => navigate('/')}>
                    Atrás
                </button>
                <button className="read-search-button" onClick={handleSearch}>
                    Buscar
                </button>
                <button className="read-view-all-button" onClick={handleViewAllAnimals}>
                    Ver Todos
                </button>
            </div>

            {/* Mostrar resultados de búsqueda en un popup */}
            {showSearchPopup && results && (
                <div className="table-popup">
                    <h2>Resultados de la Búsqueda</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Fecha Nacimiento</th>
                                <th>Hábitat</th>
                                <th>Cuidador</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(results) ? (
                                results.map((animal) => (
                                    <tr key={animal.id}>
                                        <td>{animal.id}</td>
                                        <td>{animal.nombre}</td>
                                        <td>{animal.fechanac}</td>
                                        <td>{animal.habitat}</td>
                                        <td>{animal.cuidador}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td>{results.id}</td>
                                    <td>{results.nombre}</td>
                                    <td>{results.fechanac}</td>
                                    <td>{results.habitat}</td>
                                    <td>{results.cuidador}</td>
                                </tr>
                            )}
                        </tbody>
                        
                        
                        
                    </table>
                    <button className="close-popup" onClick={() => setShowSearchPopup(false)}>
                        Cerrar
                    </button>
                    
                </div>
            )}

            {/* Ver Todos Popup */}
            {/* Ver Todos Popup */}
            {/* Ver Todos Popup */}
            {showPopup && allAnimals && (
                <div className="table-popup">
                    <h2>Lista de Animales</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Fecha Nacimiento</th>
                                <th>Hábitat</th>
                                <th>Cuidador</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginateAllAnimals().map((animal) => (
                                <tr key={animal.id}>
                                    <td>{animal.id}</td>
                                    <td>{animal.nombre}</td>
                                    <td>{animal.fechanac}</td>
                                    <td>{animal.habitat}</td>
                                    <td>{animal.cuidador}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Botones de paginación y "Cerrar" en el mismo contenedor */}
                    <div className="pagination-container">
                        <button className="close-popup" onClick={closePopup}>
                            Cerrar
                        </button>
                        <div className="pagination">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                Anterior
                            </button>
                            <span>Página {currentPage}</span>
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={allAnimals.length <= currentPage * resultsPerPage}
                            >
                                Siguiente
                            </button>
                        </div>
                    </div>
                </div>
            )}


        </div>
    );
};

export default ReadAnimalPage;