create database MedGoDB;

use MedGoDB;

-- cria a tabela para medicos, com suas informações
CREATE TABLE Medicos (
    id_medico int primary key auto_increment,
    nome varchar(100) not null,
    especialidade varchar(100),
    telefone varchar(15),
    email varchar(100) unique,
    disponibilidade text 
);

-- cria a tabela para pacientes, contendo suas informações
create table Pacientes (
id_paciente int auto_increment primary key,
nome text,
cpf varchar(16),
idade int,
email varchar(100),
senha varchar(100) 
);

create table Agendamentos (
id_agendamnetos int auto_increment primary key,
data DATETIME DEFAULT CURRENT_TIMESTAMP,
id_medico int,
id_paciente int
);

INSERT INTO Medicos (nome, especialidade, telefone, email, disponibilidade) VALUES 
('Dr. João Silva', 'Cardiologia', '(11) 99999-0001', 'joao.silva@email.com', 'Seg-Sex 08:00-17:00'),
('Dra. Maria Oliveira', 'Dermatologia', '(11) 99999-0002', 'maria.oliveira@email.com', 'Seg-Sáb 10:00-16:00'),
('Dr. Carlos Mendes', 'Ortopedia', '(11) 99999-0003', 'carlos.mendes@email.com', 'Ter-Qui 09:00-18:00'),
('Dra. Fernanda Souza', 'Pediatria', '(11) 99999-0004', 'fernanda.souza@email.com', 'Seg-Sex 08:30-16:30'),
('Dr. Ricardo Lima', 'Ginecologia', '(11) 99999-0005', 'ricardo.lima@email.com', 'Seg-Sex 07:00-15:00'),
('Dra. Juliana Costa', 'Oftalmologia', '(11) 99999-0006', 'juliana.costa@email.com', 'Qua-Sex 08:00-14:00'),
('Dr. Eduardo Martins', 'Psiquiatria', '(11) 99999-0007', 'eduardo.martins@email.com', 'Seg-Sex 10:00-18:00'),
('Dra. Camila Rocha', 'Nutrição', '(11) 99999-0008', 'camila.rocha@email.com', 'Seg-Sáb 08:00-12:00'),
('Dr. André Santos', 'Endocrinologia', '(11) 99999-0009', 'andre.santos@email.com', 'Seg-Qui 09:00-17:00'),
('Dra. Patrícia Nogueira', 'Reumatologia', '(11) 99999-0010', 'patricia.nogueira@email.com', 'Seg-Sex 08:00-15:00');

select *from Medicos;