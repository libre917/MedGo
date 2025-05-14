create database MedGoDB;

use MedGoDB;

-- cria a tabela para medicos, com suas informações
create table Medicos (
id_medico int auto_increment primary key,
nome text,
cpf varchar(16),
email varchar(50),
senha varchar(50),
area text,
status ENUM('ativo', 'inativo') DEFAULT 'ativo'
);

-- cria a tabela para pacientes, contendo suas informações
create table Pacientes (
id_paciente int auto_increment primary key,
nome text,
cpf varchar(16),
idade int,
email varchar(100),
senha varchar(100) 
),

create table Agendamentos (
id_agendamnetos int auto_increment primary key,
data DATETIME DEFAULT CURRENT_TIMESTAMP
id_medico int,
id_paciente
)