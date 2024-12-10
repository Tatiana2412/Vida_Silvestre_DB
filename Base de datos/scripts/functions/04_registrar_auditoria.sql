CREATE OR REPLACE FUNCTION registrar_auditoria()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    -- Insertar datos en la tabla de auditoría
    INSERT INTO auditoria (
        usuario,
        accion,
        tabla_afectada,
        datos_anteriores,
        datos_nuevos
    )
    VALUES (
        SESSION_USER, -- Usuario actual que ejecuta la acción
        TG_OP, -- Tipo de operación (INSERT, UPDATE, DELETE)
        TG_TABLE_NAME, -- Nombre de la tabla afectada
        CASE WHEN TG_OP = 'UPDATE' OR TG_OP = 'DELETE' THEN row_to_json(OLD) ELSE NULL END, -- Datos antes de la operación
        CASE WHEN TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN row_to_json(NEW) ELSE NULL END -- Datos después de la operación
    );

    RETURN NEW;
END;
$$;

