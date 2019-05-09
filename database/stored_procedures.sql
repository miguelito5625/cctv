-- drop procedure if exists cambiar_estado_gabinete;

DELIMITER //
CREATE PROCEDURE cambiar_estado_gabinete(IN id_recibido INT)
BEGIN
DECLARE var_estado VARCHAR(25);
select estado into var_estado from Gabinete where id = id_recibido limit 1;
IF var_estado = "Activo" 
THEN
UPDATE Gabinete SET estado = 'Inactivo' WHERE id = id_recibido;
ELSEIF var_estado = "Inactivo" 
THEN
UPDATE Gabinete SET estado = 'Activo' WHERE id = id_recibido;
END IF;
select estado from Gabinete limit 1;
END //
DELIMITER ;

call cambiar_estado_gabinete(1);