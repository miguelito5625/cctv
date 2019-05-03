CREATE TABLE Gabinete(
  id INT NOT NULL AUTO_INCREMENT,
  identificador varchar(50) NULL,
  ubicacion varchar(150) NULL,
  coordenadas varchar(100) NULL,
  updated_at TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW(),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  PRIMARY KEY(id)
);

