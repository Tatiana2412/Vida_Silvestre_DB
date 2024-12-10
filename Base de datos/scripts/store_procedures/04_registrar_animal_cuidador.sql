CREATE OR REPLACE PROCEDURE registrar_animal(
    nombre_animal VARCHAR,
    fechanac_animal DATE,
    cuidador_id INT,
    habitat_id INT,
    especie_id INT
)
LANGUAGE plpgsql
AS $$
BEGIN
    -- Verificar si el hábitat existe
    IF NOT EXISTS (SELECT 1 FROM habitat WHERE id = habitat_id) THEN
        RAISE EXCEPTION 'El hábitat con ID % no existe', habitat_id;
    END IF;

    -- Verificar si el cuidador existe
    IF NOT EXISTS (SELECT 1 FROM cuidador WHERE id = cuidador_id) THEN
        RAISE EXCEPTION 'El cuidador con ID % no existe', cuidador_id;
    END IF;

    -- Insertar el nuevo animal
    INSERT INTO animales (nombre, fechanac, idcuidador, idhabitat, idespecie)
    VALUES (nombre_animal, fechanac_animal, cuidador_id, habitat_id, especie_id);

    RAISE NOTICE 'Animal % registrado correctamente', nombre_animal;
END;
$$;
CALL registrar_animal('Elefante', '2020-06-15', 1, 2, 3);
