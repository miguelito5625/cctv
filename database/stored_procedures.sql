-- drop procedure if exists cambiar_estado_gabinete;

DROP PROCEDURE IF EXISTS cambiar_estado_gabinete;


DELIMITER //
CREATE PROCEDURE cambiar_estado_gabinete(IN id_gabinete INT)
BEGIN
DECLARE var_estado VARCHAR(25);
select estado into var_estado from Gabinete where id = id_gabinete limit 1;
IF var_estado = "Activo" 
THEN
UPDATE Gabinete SET estado = 'Inactivo' WHERE id = id_gabinete;
ELSEIF var_estado = "Inactivo" 
THEN
UPDATE Gabinete SET estado = 'Activo' WHERE id = id_gabinete;
END IF;
select estado from Gabinete limit 1;
END //
DELIMITER ;


DROP PROCEDURE IF EXISTS cambiar_estado_dispositivo;

DELIMITER //
CREATE PROCEDURE cambiar_estado_dispositivo(IN id_dispositivo INT, IN nuevo_estado VARCHAR(15))
BEGIN
UPDATE Dispositivo SET estado = nuevo_estado WHERE id = id_dispositivo;
select estado from Dispositivo limit 1;
END //
DELIMITER ;