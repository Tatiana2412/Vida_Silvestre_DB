// DeleteAnimalPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DeleteAnimalPage.css';

const DeleteAnimalPage = () => {
    const [enabledField, setEnabledField] = useState(null);
    const [fieldValue, setFieldValue] = useState('');
    const [animal, setAnimal] = useState(null);
    const [showModal, setShowModal] = useState(false); // Para manejar la ventana emergente de confirmación
    const [animalToDelete, setAnimalToDelete] = useState(null); // Para almacenar el animal a eliminar
    const navigate = useNavigate();

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
                url = `http://127.0.0.1:8000/obtener_animal/${fieldValue}`; // Buscar por ID
                break;
            case 'name':
                url = `http://127.0.0.1:8000/buscar_por_nombre/${fieldValue}`; // Buscar por Nombre
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

            // Si estamos buscando por nombre y la respuesta es un arreglo de animales
            if (Array.isArray(data)) {
                if (data.length > 0) {
                    setAnimal(data[0]); // Mostrar el primer animal encontrado
                } else {
                    alert("No se encontraron animales con ese nombre.");
                    setAnimal(null); // Limpiar el estado si no se encuentra ningún animal
                }
            } else {
                setAnimal(data); // Si se encuentra un solo animal (por ID)
            }
        } catch (error) {
            alert(`Error al buscar: ${error.message}`);
        }
    };

    const handleDelete = async () => {
        if (!animalToDelete) {
            alert("No se ha seleccionado un animal para eliminar.");
            return;
        }

        try {
            const response = await fetch(`http://127.0.0.1:8000/datos/${animalToDelete.id}`, {
                method: 'DELETE', // Usamos DELETE para eliminar
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            alert(`El animal ${animalToDelete.nombre} ha sido eliminado.`);
            setAnimal(null); // Limpiar el estado del animal después de la eliminación
            setShowModal(false); // Cerrar el modal
        } catch (error) {
            alert(`Error al eliminar el animal: ${error.message}`);
        }
    };

    const handleConfirmDelete = () => {
        handleDelete(); // Confirmar eliminación
        setShowModal(false); // Cerrar el modal después de eliminar
    };

    const handleCancelDelete = () => {
        setShowModal(false); // Cerrar el modal si se cancela
    };

    return (
        <div className="delete-animal-container">
            <h1 className="delete-animal-title">ELIMINAR ANIMAL</h1>

            <form className="delete-animal-form">
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
            </form>

            <div className="delete-animal-button-container">
                <button className="delete-animal-back-button" onClick={() => navigate('/')}>Atrás</button>
                <button className="delete-animal-search-button" onClick={handleSearch}>
                    Buscar
                </button>
                
            </div>

            {animal && (
                <div className="animal-details">
                    <h2>Animal encontrado:</h2>
                    <p><strong>Nombre:</strong> {animal.nombre}</p>
                    {animal.especie && <p><strong>Especie:</strong> {animal.especie}</p>}
                    <p><strong>Fecha de nacimiento:</strong> {animal.fechanac}</p>
                    {animal.cuidador && <p><strong>Cuidador:</strong> {animal.cuidador}</p>}
                    {animal.habitat && <p><strong>Hábitat:</strong> {animal.habitat}</p>}

                    <button className="delete-animal-delete-button" onClick={() => {
                        setAnimalToDelete(animal); // Guardar el animal seleccionado para eliminar
                        setShowModal(true); // Mostrar el modal de confirmación
                    }}>
                        Eliminar
                    </button>
                </div>
            )}

            {showModal && (
                <div className="confirmation-modal">
                    <div className="modal-content">
                        <h3>¿Estás seguro de que deseas eliminar al animal "{animalToDelete?.nombre}"?</h3>
                        <button className="confirm-button" onClick={handleConfirmDelete}>Confirmar</button>
                        <button className="cancel-button" onClick={handleCancelDelete}>Cancelar</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DeleteAnimalPage;