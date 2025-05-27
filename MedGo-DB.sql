create database MedGoDB;


use MedGoDB;

CREATE TABLE Clinicas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  endereco VARCHAR(255),
  telefone VARCHAR(20) unique
);

CREATE TABLE Medicos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email varchar(100) not null unique,
  senha varchar(50) not null,
  crm VARCHAR(20) NOT NULL UNIQUE,
  especialidade VARCHAR(100) NOT NULL, 
  id_clinica INT,
  FOREIGN KEY (id_clinica) REFERENCES Clinicas(id) on delete Cascade
);

CREATE TABLE Pacientes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
   email varchar(100) not null unique,
  senha varchar(50) not null,
  endereco varchar(100),
  telefone VARCHAR(20),
 idade INT
);

CREATE TABLE Agendamentos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_clinica INT,
  id_medico INT,
  id_paciente INT,
  data DATE NOT NULL,
  hora TIME NOT NULL,
  status ENUM('marcado', 'remarcando','cancelado', 'realizado') DEFAULT 'marcado',
  FOREIGN KEY (id_medico) REFERENCES Medicos(id) on delete Cascade,
  FOREIGN KEY (id_paciente) REFERENCES Pacientes(id) on delete cascade,
  foreign key (id_clinica) references Clinicas(id) on delete cascade
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
('Dr. Ana Souza', 'ana.souza@med.com', 'senha123', '123456-SP', 'Clínico Geral', 1),
('Dr. Pedro Lima', 'pedro.lima@med.com', 'senha123', '654321-SP', 'Cardiologia', 2),
('Dr. Carla Mendes', 'carla.mendes@med.com', 'senha123', '112233-RJ', 'Dermatologia', 3),
('Dr. Bruno Silva', 'bruno.silva@med.com', 'senha123', '223344-MG', 'Pediatria', 4),
('Dr. Fernanda Rocha', 'fernanda.rocha@med.com', 'senha123', '334455-PR', 'Ortopedia', 5),
('Dr. Marcos Pinto', 'marcos.pinto@med.com', 'senha123', '445566-RS', 'Ginecologia', 6),
('Dr. Paula Dias', 'paula.dias@med.com', 'senha123', '556677-DF', 'Neurologia', 7),
('Dr. Rafael Costa', 'rafael.costa@med.com', 'senha123', '667788-BA', 'Psiquiatria', 8),
('Dr. Juliana Alves', 'juliana.alves@med.com', 'senha123', '778899-PE', 'Endocrinologia', 9),
('Dr. Tiago Martins', 'tiago.martins@med.com', 'senha123', '889900-PA', 'Urologia', 10);

INSERT INTO Pacientes (nome, email, senha, telefone, endereco, idade) VALUES
('João Carlos', 'joao.carlos@pac.com', 'senha123', '11912345678', 'Rua A, 123', 35),
('Mariana Oliveira', 'mariana.oliveira@pac.com', 'senha123', '11923456789', 'Rua B, 456', 40),
('Carlos Eduardo', 'carlos.eduardo@pac.com', 'senha123', '21934567890', 'Rua C, 789', 33),
('Ana Paula', 'ana.paula@pac.com', 'senha123', '31945678901', 'Rua D, 321', 37),
('Lucas Ferreira', 'lucas.ferreira@pac.com', 'senha123', '41956789012', 'Rua E, 654', 25),
('Camila Santos', 'camila.santos@pac.com', 'senha123', '51967890123', 'Rua F, 987', 30),
('Roberta Lima', 'roberta.lima@pac.com', 'senha123', '61978901234', 'Rua G, 741', 45),
('Felipe Alves', 'felipe.alves@pac.com', 'senha123', '71989012345', 'Rua H, 852', 26),
('Tatiane Souza', 'tatiane.souza@pac.com', 'senha123', '81990123456', 'Rua I, 963', 43),
('Rafael Mendes', 'rafael.mendes@pac.com', 'senha123', '91901234567', 'Rua J, 159', 34);

INSERT INTO Agendamentos (id_medico, id_paciente, data, hora, status) VALUES
(1, 1, '2025-06-01', '09:00:00', 'marcado'),
(2, 2, '2025-06-01', '10:00:00', 'marcado'),
(3, 3, '2025-06-01', '11:00:00', 'marcado'),
(4, 4, '2025-06-01', '14:00:00', 'marcado'),
(5, 5, '2025-06-01', '15:00:00', 'marcado'),
(6, 6, '2025-06-02', '09:30:00', 'marcado'),
(7, 7, '2025-06-02', '10:30:00', 'marcado'),
(8, 8, '2025-06-02', '13:00:00', 'marcado'),
(9, 9, '2025-06-03', '14:30:00', 'marcado'),
(10, 10, '2025-06-03', '15:30:00', 'marcado');


drop database medgodb;
