
use cctv;

-- Tabla de los gabinetes --------------------------------------------------------

DROP TABLE IF EXISTS Gabinete;
CREATE TABLE IF NOT EXISTS Gabinete(
  id INT NOT NULL AUTO_INCREMENT,
  identificador varchar(50) NULL,
  ubicacion varchar(150) NULL,
  latitud DECIMAL(16, 14) NULL,
  longitud DECIMAL(16, 14) NULL,
  estado varchar(15) DEFAULT 'ACTIVO',
  updated_at TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW(),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  PRIMARY KEY(id)
);

DROP VIEW view_Gabinete;
CREATE VIEW view_Gabinete AS
SELECT id, identificador, ubicacion, CONCAT(latitud, ',', longitud) AS coordenadas, estado,
CONCAT(updated_at, '') as updated_at, CONCAT(created_at, '') as created_at
FROM Gabinete;

-- Tabla de las camaras --------------------------------------------------------

DROP TABLE IF EXISTS Dispositivo;
CREATE TABLE IF NOT EXISTS Dispositivo(
  id INT NOT NULL AUTO_INCREMENT,
  modelo varchar(25) NULL,
  n_serie varchar(25) NULL,
  descripcion varchar(150) NULL,
  id_tipoDispositivo INT NULL,
  id_marca INT NULL,
  id_gabinete int NULL,
  estado varchar(15) DEFAULT 'EN BODEGA',
  updated_at TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW(),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  PRIMARY KEY(id),
  CONSTRAINT fk_GabineteCamara FOREIGN KEY (id_gabinete) REFERENCES Gabinete(id),
  CONSTRAINT fk_tipoDispositivo FOREIGN KEY (id_tipoDispositivo) REFERENCES Dispositivo(id),
  CONSTRAINT fk_id_marca FOREIGN KEY (id_marca) REFERENCES Marca(id)
);


DROP VIEW IF EXISTS view_Dispositivo;

CREATE VIEW view_Dispositivo AS
SELECT Dispositivo.id, tipoDispositivo.dispositivo, Marca.marca, Dispositivo.modelo, Dispositivo.n_serie,
Gabinete.identificador as identificador_gabinete, Dispositivo.descripcion,
CONCAT(Gabinete.latitud, ',', Gabinete.longitud) AS coordenadas, CONCAT(Dispositivo.updated_at, '') AS updated_at, 
CONCAT(Dispositivo.created_at, '') AS created_at, Dispositivo.estado
FROM Dispositivo
INNER JOIN Gabinete ON Dispositivo.id_gabinete =  Gabinete.id
INNER JOIN tipoDispositivo ON Dispositivo.id_tipoDispositivo =  tipoDispositivo.id
INNER JOIN Marca ON Dispositivo.id_marca =  Marca.id;


-- marca
CREATE TABLE Marca(
  id INT NOT NULL AUTO_INCREMENT,
  marca varchar(25) NULL,
  estado varchar(15) NULL, 
  PRIMARY KEY(id)
);


-- tipoDispositivo
CREATE TABLE tipoDispositivo(
  id INT NOT NULL AUTO_INCREMENT,
  dispositivo varchar(25) NULL,
  estado varchar(15) NULL, 
  PRIMARY KEY(id)
);





-- Pruebas

drop table prueba;
CREATE TABLE prueba(
  id INT NOT NULL AUTO_INCREMENT,
  numero float(3),
  PRIMARY KEY(id)
);

insert into prueba (numero) values (-222.4444);