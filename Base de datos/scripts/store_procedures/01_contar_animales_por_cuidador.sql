CREATE OR REPLACE FUNCTION contar_animales_por_cuidador(cuidador_id INT)
RETURNS INT
LANGUAGE plpgsql
AS $$
DECLARE
    total INT;
BEGIN
    SELECT COUNT(*) INTO total
    FROM animales
    WHERE idcuidador = cuidador_id;

    RETURN total;
END;
$$;
SELECT contar_animales_por_cuidador(1);
