# 🩺 MedGo – Agenda Médica Online

Sistema web para agendamento de consultas médicas, desenvolvido como Projeto Integrador do SENAI-SP. O MedGo oferece uma solução simples, prática e acessível para clínicas, médicos, pacientes e administradores, permitindo a marcação, gerenciamento e acompanhamento de consultas médicas de forma digital.

---
## Integrantes
Felipe Henry Severino Sacchi

Gabriel de Lima Rossato

Lucas Soalheiro Pereira (Líder de Projeto)
---

## 📋 Índice

- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Requisitos](#requisitos)
- [Instalação e Execução](#instalação-e-execução)
- [Modelagem de Dados](#modelagem-de-dados)
- [API - Endpoints Principais](#api---endpoints-principais)
- [Responsividade](#responsividade)
- [Possíveis Melhorias Futuras](#possíveis-melhorias-futuras)
- [Integrantes](#integrantes)
- [Licença](#licença)

---

## ✅ Funcionalidades

### 👤 Pacientes
- Login e cadastro
- Agendar consultas
- Visualizar consultas agendadas
- Cancelar e remarcar consultas

### 🩺 Médicos
- Login
- Visualizar sua agenda
- Confirmar ou cancelar consultas

### 🏥 Consultórios
- Login
- Cadastrar e gerenciar médicos do próprio consultório

### 🛠️ Administrador
- Login 
- Gerenciar clínicas cadastradas no sistema

---

## 🛠️ Tecnologias Utilizadas

### Front-end
- **Next.js** – Estruturação e renderização de páginas
- **Tailwind CSS** – Estilização e responsividade

### Back-end
- **Node.js** – Ambiente de execução do servidor
- **Express.js** – Framework para criação da API RESTful

### Banco de Dados
- **MySQL** – Armazenamento de dados de pacientes, médicos, clínicas e consultas

### Ferramentas de Apoio
- **Git** – Controle de versão
- **GitHub** – Repositório do projeto
- **Notion** – Organização de tarefas e anotações
- **Vercel / Netlify** – Deploy do front-end (opcional)

---

## 📦 Requisitos

- Node.js (v18+ recomendado)
- MySQL Server (ou XAMPP/MAMP para testes locais)
- Git instalado

---

## 🚀 Instalação e Execução
```bash
### 1. Clone o repositório


git clone https://github.com/libre917/MedGo.git

### 2. Inicie o back-end



cd MedGo
npm install
cd server
npm install
node --watch app.js

### 3. Inicie o Front-end (em outro terminal)

cd MedGo
cd client/medgo
npm install
npm run dev

### 4. Configuração do banco de dados
Edite o arquivo MedGo/server/config/database.js com suas credenciais MySQL:

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "MedGoDB",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

### 5. Acesse o banco de dados 
MedGo/MedGo-DB.sql
copie e cole no seu banco de dados

### 6. Acesse o navegador 
acesse http://localhost:3000

---

## Modelagem de Dados

> A estrutura completa do banco de dados pode ser consultada [MedGo/MedGo-DB.sql] , junto com o script SQL para criação das tabelas.



## Licença
Este projeto é de uso acadêmico e está disponível sob a licença MIT. Consulte o arquivo LICENSE para mais detalhes.

