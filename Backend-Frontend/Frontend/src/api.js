const API_URL = process.env.REACT_APP_API_URL;

// Esta es la función para listar animales
export const listarAnimales = async () => {
    const response = await fetch('/listar_animales/');
    if (!response.ok) {
        throw new Error('Error al obtener los animales');
    }
    return await response.json();
};


export const crearAnimal = async (animal) => {
  const response = await fetch(`${API_URL}/crear_animal/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(animal),
  });
  return response.json();
};
