import React from 'react';
import CreateAnimal from './components/CreateAnimal';
import ReadAnimals from './components/ReadAnimals';
import UpdateAnimal from './components/UpdateAnimal';
import DeleteAnimal from './components/DeleteAnimal';

function App() {
    return (
        <div className="App">
            <h1>Vida Silvestre CRUD</h1>
            <CreateAnimal />
            <ReadAnimals />
            <UpdateAnimal />
            <DeleteAnimal />
        </div>
    );
}

export default App;
