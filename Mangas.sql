CREATE DATABASE  `db_mangas`;

USE `db_mangas`;


CREATE TABLE mangas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome_manga VARCHAR(255),
  caracteristicas_manga VARCHAR(255),
  imagem_manga VARCHAR(255),
  apresentacao_manga VARCHAR(255)
);

CREATE TABLE capitulos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(255),
  num_capitulo INT,
  id_identificacao INT,
  FOREIGN KEY (id_identificacao) REFERENCES mangas(id)
);

CREATE TABLE paginas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  num_pagina INT,
  desing VARCHAR(255),
  id_capitulo INT,
  FOREIGN KEY (id_capitulo) REFERENCES capitulos(id)
);

CREATE TABLE leitura (
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_usuario INT,
  capitulo_atual INT,
  data_leitura INT,
  FOREIGN KEY (capitulo_atual) REFERENCES capitulos(id)
);


 

