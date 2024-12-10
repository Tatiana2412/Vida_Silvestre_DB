CREATE OR REPLACE PROCEDURE insertar_animal(
    nombre_param TEXT,
    fechanac_param DATE,
    idcuidador_param INT,
    idhabitat_param INT,
    idespecie_param INT
)
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO animal (nombre, fechanac, idcuidador, idhabitat, idespecie)
    VALUES (nombre_param, fechanac_param, idcuidador_param, idhabitat_param, idespecie_param);
END;
$$;
