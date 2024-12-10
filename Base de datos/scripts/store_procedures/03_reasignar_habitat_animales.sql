CREATE OR REPLACE PROCEDURE reasignar_habitat_animales(habitat_origen INT, habitat_destino INT)
LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE animales
    SET idhabitat = habitat_destino
    WHERE idhabitat = habitat_origen;

    RAISE NOTICE 'Animales reasignados del hábitat % al hábitat %', habitat_origen, habitat_destino;
END;
$$;
CALL reasignar_habitat_animales(1, 2);
