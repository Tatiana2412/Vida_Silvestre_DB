import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css'; // Archivo de estilos para la página de inicio

import CreateImage from './crear.png';
import ReadImage from './leer.png';
import UpdateImage from './Actualizar.png';
import DeleteImage from './borrar.png';

const HomePage = () => {
    return (
        <div className="home-container">
            <h1 className="home-title">VIDA SILVESTRE</h1>
            <div className="button-container">
                <Link to="/create" className="action-button">
                    <img className="button-image" src={CreateImage}/> 
                    <span className="button-text">Create</span>
                </Link>
                <Link to="/read" className="action-button">
                    <img className="button-image" src={ReadImage}/> 
                    <span className="button-text">Read</span>
                </Link>
                <Link to="/update" className="action-button">
                    <img className="button-image" src={UpdateImage}/> 
                    <span className="button-text">Update</span>
                </Link>
                <Link to="/delete" className="action-button">
                    <img className="button-image2" src={DeleteImage}/> 
                    <span className="button-text">Delete</span>
                </Link>
            </div>
        </div>
    );
};

export default HomePage;
