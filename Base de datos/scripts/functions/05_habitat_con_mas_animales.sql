CREATE OR REPLACE FUNCTION habitat_con_mas_animales()
RETURNS INT
LANGUAGE plpgsql
AS $$
DECLARE
    habitat_id INT;
BEGIN
    SELECT idhabitat
    FROM animales
    GROUP BY idhabitat
    ORDER BY COUNT(*) DESC
    LIMIT 1
    INTO habitat_id;

    RETURN habitat_id;
END;
$$;

SELECT habitat_con_mas_animales();
