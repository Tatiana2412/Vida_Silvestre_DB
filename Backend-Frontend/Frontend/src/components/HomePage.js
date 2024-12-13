import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css'; // Archivo de estilos para la página de inicio

const HomePage = () => {
    return (
        <div className="home-container">
            <h1 className="home-title">VIDA SILVESTRE</h1>
            <div className="button-container">
                <Link to="/create" className="action-button">
                    <span className="button-initial">C</span>
                    <span className="button-text">Create</span>
                </Link>
                <Link to="/read" className="action-button">
                    <span className="button-initial">R</span>
                    <span className="button-text">Read</span>
                </Link>
                <Link to="/update" className="action-button">
                    <span className="button-initial">U</span>
                    <span className="button-text">Update</span>
                </Link>
                <Link to="/delete" className="action-button">
                    <span className="button-initial">D</span>
                    <span className="button-text">Delete</span>
                </Link>
            </div>
        </div>
    );
};

export default HomePage;
