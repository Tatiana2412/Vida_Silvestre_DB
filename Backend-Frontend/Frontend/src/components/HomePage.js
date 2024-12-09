import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css'; // Archivo de estilos para la página de inicio

const HomePage = () => {
    return (
        <div className="home-container">
            <h1 className="home-title">Vida Silvestre</h1>
            <div className="button-container">
                <Link to="/create" className="action-button">Create Animal</Link>
                <Link to="/read" className="action-button">Read Animal</Link>
                <Link to="/update" className="action-button">Update Animal</Link>
                <Link to="/delete" className="action-button">Delete Animal</Link>
            </div>
        </div>
    );
};

export default HomePage;
