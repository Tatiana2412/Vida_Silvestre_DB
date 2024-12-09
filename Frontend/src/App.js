import React from 'react';
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import CreateAnimalPage from './components/CreateAnimalPage';
import ReadAnimalPage from './components/ReadAnimalPage'; // Importa la página de lectura
import DeleteAnimalPage from './components/DeleteAnimalPage' ; 
import UpdateAnimalPage from './components/UpdateAnimalPage' ; 
import AnimalList from './components/AnimalList'; // Si este componente es necesario

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/create" element={<CreateAnimalPage />} />
                <Route path="/read" element={<ReadAnimalPage />} /> {/* Ruta para la página de lectura */}
                <Route path="/update" element={<UpdateAnimalPage />} />
                <Route path="/delete" element={<DeleteAnimalPage/>} />
            </Routes>
        </Router>
    );
    
}

export default App;
