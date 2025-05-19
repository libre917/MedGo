create database MedGoDB;

use MedGoDB;

create table Clinicas (
cep varchar(8) primary key,
id_clinica int,
localizacao text not null
);


-- cria a tabela para medicos, com suas informações
CREATE TABLE Medicos (
    id_medico int primary key auto_increment,
    nome varchar(100) not null,
    especialidade varchar(100),
    telefone varchar(15),
    email varchar(100) unique,
    senha varchar(100),
    disponibilidade text ,
    cep_clinica VARCHAR(8)
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

create table Agenda (
id_agenda int auto_increment primary key,
data DATETIME DEFAULT CURRENT_TIMESTAMP,
id_medico int,
id_paciente int
);
INSERT INTO Clinicas (cep, id_clinica, localizacao) VALUES 
('0100-000', '1','São Paulo - Centro'),
('0200-000', '2','São Paulo - Zona Norte'),
('0300-000', '3','São Paulo - Zona Leste'),
('0400-000', '4','São Paulo - Zona Sul'),
('0500-000', '5','São Paulo - Zona Oeste'),
('0600-000', '6','Guarulhos - Centro'),
('0700-000', '7','Santo André - Centro'),
('0800-000', '8','São Bernardo - Centro'),
('0900-000', '9','Campinas - Centro'),
('1001-000', '10','Ribeirão Preto - Centro');

select *from Clinicas;
INSERT INTO Medicos (nome, especialidade, telefone, email, senha, disponibilidade, cep_clinica) VALUES 
('Dr. João Santos', 'Cardiologia', '(11) 91234-5678', 'joao.santos@email.com', 'senha123', 'Seg-Sex 08:00-17:00', '0100-000'),
('Dra. Beatriz Lima', 'Dermatologia', '(11) 92345-6789', 'beatriz.lima@email.com', 'segura456', 'Seg-Sáb 10:00-16:00', '0200-000'),
('Dr. Ricardo Ferreira', 'Ortopedia', '(11) 93456-7890', 'ricardo.ferreira@email.com', 'forte789', 'Ter-Qui 09:00-18:00', '0300-000'),
('Dra. Fernanda Costa', 'Pediatria', '(11) 94567-8901', 'fernanda.costa@email.com', 'senhaXYZ', 'Seg-Sex 08:30-16:30', '0400-000'),
('Dr. Eduardo Nogueira', 'Ginecologia', '(11) 95678-9012', 'eduardo.nogueira@email.com', 'acessoABC', 'Seg-Sex 07:00-15:00', '0500-000'),
('Dra. Juliana Rocha', 'Oftalmologia', '(11) 96789-0123', 'juliana.rocha@email.com', 'protege456', 'Qua-Sex 08:00-14:00', '0600-000'),
('Dr. André Martins', 'Psiquiatria', '(11) 97890-1234', 'andre.martins@email.com', 'minhasenha', 'Seg-Sex 10:00-18:00', '0700-000'),
('Dra. Camila Almeida', 'Nutrição', '(11) 98901-2345', 'camila.almeida@email.com', 'pass987', 'Seg-Sáb 08:00-12:00', '0800-000'),
('Dr. Felipe Souza', 'Endocrinologia', '(11) 99012-3456', 'felipe.souza@email.com', 'codXYZ', 'Seg-Qui 09:00-17:00', '0900-000'),
('Dra. Patrícia Mendes', 'Reumatologia', '(11) 90123-4567', 'patricia.mendes@email.com', 'senha789', 'Seg-Sex 08:00-15:00', '1001-000');

select *from Medicos;

INSERT INTO Pacientes (nome, cpf, idade, email, senha) VALUES 
('Carlos Eduardo Silva', '123.456.789-01', 35, 'carlos.silva@email.com', 'senha123'),
('Maria Fernanda Oliveira', '234.567.890-02', 28, 'maria.oliveira@email.com', 'segura456'),
('João Pedro Santos', '345.678.901-03', 42, 'joao.santos@email.com', 'forte789'),
('Ana Beatriz Costa', '456.789.012-04', 30, 'ana.costa@email.com', 'senhaXYZ'),
('Fernando Henrique Lima', '567.890.123-05', 50, 'fernando.lima@email.com', 'acessoABC'),
('Juliana Alves Nogueira', '678.901.234-06', 25, 'juliana.nogueira@email.com', 'protege456'),
('Ricardo Matheus Rocha', '789.012.345-07', 38, 'ricardo.rocha@email.com', 'minhasenha'),
('Camila Patricia Mendes', '890.123.456-08', 29, 'camila.mendes@email.com', 'pass987'),
('Eduardo Vinícius Pereira', '901.234.567-09', 44, 'eduardo.pereira@email.com', 'codXYZ'),
('Natália Gabriela Souza', '012.345.678-10', 33, 'natalia.souza@email.com', 'senha789');

select *from Pacientes;

