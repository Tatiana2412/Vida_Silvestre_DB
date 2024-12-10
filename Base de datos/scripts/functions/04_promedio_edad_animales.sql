CREATE OR REPLACE FUNCTION promedio_edad_animales_por_habitat(habitat_id INT)
RETURNS NUMERIC
LANGUAGE plpgsql
AS $$
DECLARE
    promedio NUMERIC;
BEGIN
    SELECT AVG(EXTRACT(YEAR FROM AGE(fechanac))) INTO promedio
    FROM animales
    WHERE idhabitat = habitat_id;

    RETURN COALESCE(promedio, 0);
END;
$$;
SELECT promedio_edad_animales_por_habitat(1);
