create database MedGoDB;


use MedGoDB;

CREATE TABLE Clinicas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  endereco VARCHAR(255) not null,
  telefone VARCHAR(20) unique
);

CREATE TABLE Medicos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email varchar(100) not null unique,
  senha varchar(255) not null,
  crm VARCHAR(20) NOT NULL UNIQUE,
  especialidade VARCHAR(100) NOT NULL, 
  id_clinica INT,
  FOREIGN KEY (id_clinica) REFERENCES Clinicas(id) on delete Cascade
);

CREATE TABLE Pacientes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
   email varchar(100) not null unique,
  senha varchar(255) not null,
  endereco varchar(100),
  telefone VARCHAR(20) not null,
 idade INT
);

CREATE TABLE Agendamentos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_clinica INT not null,
  id_medico INT not null,
  id_paciente INT not null,
  data DATE NOT NULL,
  hora TIME NOT NULL,
  status ENUM('marcado', 'remarcando','cancelado', 'realizado') DEFAULT 'marcado',
  FOREIGN KEY (id_medico) REFERENCES Medicos(id) on delete Cascade,
  FOREIGN KEY (id_paciente) REFERENCES Pacientes(id) on delete cascade,
  foreign key (id_clinica) references Clinicas(id) on delete cascade
);

create table Horarios (
id int auto_increment primary key,
hora time not null,
status enum('ocupado','aberto') default 'aberto'
);

INSERT INTO Clinicas (nome, endereco, telefone) VALUES
('Clínica Vida Saudável', 'Rua das Flores, 100', '1112345678'),
('Centro Médico Esperança', 'Av. Brasil, 200', '1123456789'),
('Clínica Santa Luzia', 'Rua A, 300', '2134567890'),
('Clínica Bem Estar', 'Rua B, 400', '3145678901'),
('Instituto Médico Popular', 'Av. Central, 500', '4156789012'),
('Clínica do Povo', 'Rua C, 600', '5167890123'),
('Centro de Saúde São João', 'Av. D, 700', '6178901234'),
('Clínica Vida Plena', 'Parque esperança, 800', '7189012345'),
('Hospital Popular', 'Rua F, 900', '819012-3456'),
('Unidade Médica Comunitária', 'Av. G, 1000', '9101234567');

INSERT INTO Medicos (nome, email, senha, crm, especialidade, id_clinica) VALUES
('Ana Souza', 'ana.souza@med.com', '$2b$10$kT5gC202dSWyGWFXGZ5fKOktbadv5SknlWYc.L8iyyspGlpb.Vv/u', '123456-SP', 'Clínico Geral', 1),
('Pedro Lima', 'pedro.lima@med.com', '$2b$10$TFXBNFh/fWU1ChZCJMORcu501j19/f0nlIrb/El8RXnQbWj/mB8Ka', '654321-SP', 'Cardiologia', 2),
('Carla Mendes', 'carla.mendes@med.com', '$2b$10$jFyuf3I7uMjrrOcMTGt6W.MnwIuIQ6L9Yzoz1qDeQw8KAFctDiGt2', '112233-RJ', 'Dermatologia', 3),
('Bruno Silva', 'bruno.silva@med.com', '$2b$10$Pq2dSa8NN8no8gz0tF.Rju5IjN27ppWqlQHQOUtKKWv.iGxuvKrzG', '223344-MG', 'Pediatria', 4),
('Fernanda Rocha', 'fernanda.rocha@med.com', '$2b$10$Oe7oOJl3M6rWtX7pry16K.n.4wdYCztQypY0RORmSGd51gr06Z8Qu', '334455-PR', 'Ortopedia', 5),
('Marcos Pinto', 'marcos.pinto@med.com', '$2b$10$r8uW8VbZHJH.lRdOMZDcTuSbuvWlbSchekdIvIuoGS8AYr64VxWZy', '445566-RS', 'Ginecologia', 6),
('Paula Dias', 'paula.dias@med.com', '$2b$10$Ce5yVCIRP9fK48X.wY9/2eLE5iSDY04Yh5rh/OX6g4zk3V1IrJl4S', '556677-DF', 'Neurologia', 7),
('Rafael Costa', 'rafael.costa@med.com', '$2b$10$r.WIHQUPR32QDof0DDNdgOn.wmJPAfd5HRuIqEZRKn.jkUv/tFzPi', '667788-BA', 'Psiquiatria', 8),
('Juliana Alves', 'juliana.alves@med.com', '$2b$10$MyoSk447UaIblwdj43Z9rOQu4HJnBSV.CyfKyIMVMprPb3kgxXw5K', '778899-PE', 'Endocrinologia', 9),
('Tiago Martins', 'tiago.martins@med.com', '$2b$10$u.G6tuobulcJAxqvzikX5.8FckQhxD0rAPhLL6EAkBUZJR7zEGrRu', '889900-PA', 'Urologia', 10);

INSERT INTO Horarios (hora, status) VALUES 
('08:00', 'aberto'), ('08:30', 'aberto'), ('09:00', 'aberto'), ('09:30', 'aberto'),
('10:00', 'aberto'), ('10:30', 'aberto'), ('11:00', 'aberto'), ('11:30', 'aberto'),
('12:00', 'aberto'), ('12:30', 'aberto'), ('13:00', 'aberto'), ('13:30', 'aberto'),
('14:00', 'aberto'), ('14:30', 'aberto'), ('15:00', 'aberto'), ('15:30', 'aberto'),
('16:00', 'aberto'), ('16:30', 'aberto'), ('17:00', 'aberto'), ('17:30', 'aberto'),
('18:00', 'aberto');



