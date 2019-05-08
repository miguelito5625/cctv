
use cctv;

DROP table Gabinete;
CREATE TABLE Gabinete(
  id INT NOT NULL AUTO_INCREMENT,
  identificador varchar(50) NULL,
  ubicacion varchar(150) NULL,
  latitud DECIMAL(16, 14) NULL,
  longitud DECIMAL(16, 14) NULL,
  updated_at TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW(),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  PRIMARY KEY(id)
);

DROP VIEW view_Gabinete;
CREATE VIEW view_Gabinete AS
SELECT id, identificador, ubicacion, CONCAT(latitud, ',', longitud) AS coordenadas, 
CONCAT(updated_at, '') as updated_at, CONCAT(created_at, '') as created_at
FROM Gabinete;

drop table prueba;
CREATE TABLE prueba(
  id INT NOT NULL AUTO_INCREMENT,
  numero float(3),
  PRIMARY KEY(id)
);

insert into prueba (numero) values (-222.4444);