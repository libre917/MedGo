create database MedGoDB;

use MedGoDB;

-- Tabela de Clínicas
CREATE TABLE Clinicas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    endereco VARCHAR(255) NOT NULL,
    telefone VARCHAR(20) UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL
);

-- Tabela de Médicos
CREATE TABLE Medicos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    crm VARCHAR(20) NOT NULL UNIQUE,
    especialidade VARCHAR(100) NOT NULL,
    id_clinica INT,
    FOREIGN KEY (id_clinica) REFERENCES Clinicas(id) ON DELETE CASCADE
);

-- Tabela de Pacientes
CREATE TABLE Pacientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    endereco VARCHAR(100),
    telefone VARCHAR(20) NOT NULL,
    dataNascimento DATE NOT NULL
);

-- Tabela de Agendamentos
CREATE TABLE Agendamentos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_clinica INT NOT NULL,
    id_medico INT NOT NULL,
    id_paciente INT NOT NULL,
    data DATE NOT NULL,
    hora TIME NOT NULL,
    status ENUM('marcado', 'remarcando', 'cancelado', 'realizado') DEFAULT 'marcado',
    FOREIGN KEY (id_medico) REFERENCES Medicos(id) ON DELETE CASCADE,
    FOREIGN KEY (id_paciente) REFERENCES Pacientes(id) ON DELETE CASCADE,
    FOREIGN KEY (id_clinica) REFERENCES Clinicas(id) ON DELETE CASCADE
);

-- Tabela de Pacientes Antigos
CREATE TABLE PacientesAntigos (
    id_medico INT NOT NULL,
    id_paciente INT NOT NULL,
    FOREIGN KEY (id_medico) REFERENCES Medicos(id) ON DELETE CASCADE,
    FOREIGN KEY (id_paciente) REFERENCES Pacientes(id) ON DELETE CASCADE
);

-- Tabela de Horários
CREATE TABLE Horarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    hora TIME NOT NULL
);
INSERT INTO Clinicas (nome, endereco, telefone, email, senha) VALUES
('Clínica Vida Saudável', 'Rua das Flores, 100', '1112345678', 'vida.saudavel@email.com', 'senha123'),
('Centro Médico Esperança', 'Av. Brasil, 200', '1123456789', 'centro.esperanca@email.com', 'senha123'),
('Clínica Santa Luzia', 'Rua A, 300', '2134567890', 'santa.luzia@email.com', 'senha123'),
('Clínica Bem Estar', 'Rua B, 400', '3145678901', 'bem.estar@email.com', 'senha123'),
('Instituto Médico Popular', 'Av. Central, 500', '4156789012', 'instituto.popular@email.com', 'senha123'),
('Clínica do Povo', 'Rua C, 600', '5167890123', 'clinica.povo@email.com', 'senha123'),
('Centro de Saúde São João', 'Av. D, 700', '6178901234', 'saude.saojoao@email.com', 'senha123'),
('Clínica Vida Plena', 'Parque Esperança, 800', '7189012345', 'vida.plena@email.com', 'senha123'),
('Hospital Popular', 'Rua F, 900', '8190123456', 'hospital.popular@email.com', 'senha123'),
('Unidade Médica Comunitária', 'Av. G, 1000', '9101234567', 'medica.comunitaria@email.com', 'senha123');

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

INSERT INTO Horarios (hora) VALUES 
('08:00'), ('08:30'), ('09:00'), ('09:30'),
('10:00'), ('10:30'), ('11:00'), ('11:30'),
('12:00'), ('12:30'), ('13:00'), ('13:30'),
('14:00'), ('14:30'), ('15:00'), ('15:30'),
('16:00'), ('16:30'), ('17:00'), ('17:30'),
('18:00');



