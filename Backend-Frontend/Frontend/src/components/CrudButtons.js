import React from 'react';

const CrudButtons = () => {
  return (
    <div style={{ marginTop: '20px' }}>
      <button style={buttonStyle} onClick={() => window.location.href = '/create'}>Crear</button>
      <button style={buttonStyle} onClick={() => window.location.href = '/read'}>Leer</button>
      <button style={buttonStyle} onClick={() => window.location.href = '/update'}>Actualizar</button>
      <button style={buttonStyle} onClick={() => window.location.href = '/delete'}>Eliminar</button>
    </div>
  );
};

const containerStyle = {
  display: "flex",
  justifyContent: "center",
  gap: "20px", // Espaciado entre los botones
  margin: "2rem",
};



export default CrudButtons;
