CREATE TABLE auditoria (
    id SERIAL PRIMARY KEY,
    usuario VARCHAR(50) NOT NULL,
    accion VARCHAR(10) NOT NULL, -- Tipo de acción: INSERT, UPDATE, DELETE
    tabla_afectada VARCHAR(50) NOT NULL,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    datos_anteriores JSONB,
    datos_nuevos JSONB
);
