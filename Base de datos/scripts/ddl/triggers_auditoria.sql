-- Trigger para INSERT
CREATE TRIGGER auditoria_insertar
AFTER INSERT ON animales
FOR EACH ROW
EXECUTE FUNCTION registrar_auditoria();

-- Trigger para UPDATE
CREATE TRIGGER auditoria_actualizar
AFTER UPDATE ON animales
FOR EACH ROW
EXECUTE FUNCTION registrar_auditoria();

-- Trigger para DELETE
CREATE TRIGGER auditoria_eliminar
AFTER DELETE ON animales
FOR EACH ROW
EXECUTE FUNCTION registrar_auditoria();

