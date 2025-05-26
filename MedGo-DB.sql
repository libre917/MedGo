create database MedGoDB;

use MedGoDB;

CREATE TABLE Clinicas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  endereco VARCHAR(255),
  telefone VARCHAR(20)
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
  telefone VARCHAR(20),
  idade int not null
);

CREATE TABLE Agendamentos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_clinica INT,
  id_medico INT,
  id_paciente INT,
  data DATE NOT NULL,
  hora TIME NOT NULL,
  status ENUM('marcado', 'cancelado', 'realizado') DEFAULT 'marcado',
  FOREIGN KEY (id_medico) REFERENCES Medicos(id) on delete Cascade,
  FOREIGN KEY (id_paciente) REFERENCES Pacientes(id) on delete cascade,
  foreign key (id_clinica) references Clinicas(id) on delete cascade
);

INSERT INTO Clinicas (nome, endereco, telefone) VALUES
('Clínica Vida Saudável', 'Rua das Flores, 100', '(11) 1234-5678'),
('Centro Médico Esperança', 'Av. Brasil, 200', '(11) 2345-6789'),
('Clínica Santa Luzia', 'Rua A, 300', '(21) 3456-7890'),
('Clínica Bem Estar', 'Rua B, 400', '(31) 4567-8901'),
('Instituto Médico Popular', 'Av. Central, 500', '(41) 5678-9012'),
('Clínica do Povo', 'Rua C, 600', '(51) 6789-0123'),
('Centro de Saúde São João', 'Av. D, 700', '(61) 7890-1234'),
('Clínica Vida Plena', 'Parque esperança, 800', '(71) 8901-2345'),
('Hospital Popular', 'Rua F, 900', '(81) 9012-3456'),
('Unidade Médica Comunitária', 'Av. G, 1000', '(91) 0123-4567');

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

INSERT INTO Pacientes (nome, email, senha, telefone, idade) VALUES
('João Carlos', 'joao.carlos@pac.com', 'senha123', '(11) 91234-5678', 34),
('Mariana Oliveira', 'mariana.oliveira@pac.com', 'senha123', '(11) 92345-6789', 39),
('Carlos Eduardo', 'carlos.eduardo@pac.com', 'senha123', '(21) 93456-7890', 32),
('Ana Paula', 'ana.paula@pac.com', 'senha123', '(31) 94567-8901', 36),
('Lucas Ferreira', 'lucas.ferreira@pac.com', 'senha123', '(41) 95678-9012', 25),
('Camila Santos', 'camila.santos@pac.com', 'senha123', '(51) 96789-0123', 29),
('Roberta Lima', 'roberta.lima@pac.com', 'senha123', '(61) 97890-1234', 44),
('Felipe Alves', 'felipe.alves@pac.com', 'senha123', '(71) 98901-2345', 26),
('Tatiane Souza', 'tatiane.souza@pac.com', 'senha123', '(81) 99012-3456', 43),
('Rafael Mendes', 'rafael.mendes@pac.com', 'senha123', '(91) 90123-4567', 33);

INSERT INTO Agendamentos (id_clinica, id_medico, id_paciente, data, hora, status) VALUES
(1, 1, 1, '2025-06-01', '09:00:00', 'marcado'),
(2, 2, 2, '2025-06-01', '10:00:00', 'marcado'),
(3, 3, 3, '2025-06-01', '11:00:00', 'marcado'),
(4, 4, 4, '2025-06-01', '14:00:00', 'marcado'),
(5, 5, 5, '2025-06-01', '15:00:00', 'marcado'),
(6, 6, 6, '2025-06-02', '09:30:00', 'marcado'),
(7, 7, 7, '2025-06-02', '10:30:00', 'marcado'),
(8, 8, 8, '2025-06-02', '13:00:00', 'marcado'),
(9, 9, 9, '2025-06-03', '14:30:00', 'marcado'),
(10, 10, 10, '2025-06-03', '15:30:00', 'marcado');



drop database medgodb;
