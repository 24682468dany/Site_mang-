CREATE DATABASE  `db_mangas`;

USE `db_mangas`;

CREATE TABLE capitulos (
  id INT PRIMARY KEY,
  titulo VARCHAR(255),
  num_capitulo INT,
  id_identificacao INT

);
CREATE TABLE mangas (
   id INT PRIMARY KEY,
  nome_manga VARCHAR(255),
  caracteristicas_manga varchar(255),
  imagem_manga VARCHAR(255),
  apresentacao_manga varchar(255)
   
);

CREATE TABLE paginas (
  id INT PRIMARY KEY,
  num_pagina INT,
  desing VARCHAR(255),
  id_capitulo INT

);
CREATE TABLE leitura (
  id INT PRIMARY KEY,
  id_usuario INT,
  capitulo_atual INT,
  data_leitura INT

);
 

