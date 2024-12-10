CREATE OR REPLACE FUNCTION contar_animales_por_habitat(habitat_id INT)
RETURNS INT
LANGUAGE plpgsql
AS $$
DECLARE
    total_animales INT;
BEGIN
    SELECT COUNT(*) INTO total_animales
    FROM animales
    WHERE idhabitat = habitat_id;
    RETURN total_animales;
END;
$$;
SELECT contar_animales_por_habitat(1);

