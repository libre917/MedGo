"use client";
import React from "react";
import Link from "next/link";
import axios from "axios";
import { useState, useEffect } from "react";

const API_URL = "http://localhost:3000";

export default function CadastroMedico() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");
  const [crm, setCrm] = useState("");
  const [especialidade, setEspecialidade] = useState("");
  const [clinicas, setClinicas] = useState([]);
  const [clinicaSelecionada, setClinicaSelecionada] = useState(null);

  // Carrega a lista de clínicas ao montar o componente
  useEffect(() => {
    async function fetchClinicas() {
      try {
        const response = await axios.get(`${API_URL}/clinicas`);
        setClinicas(response.data);
      } catch (err) {
        console.error("Erro ao carregar clínicas", err);
        alert("Erro ao carregar lista de clínicas");
      }
    }
    fetchClinicas();
  }, []);

  const adicionarMedico = async (e) => {
    e.preventDefault();
    
    try {
      // Verifica se todos os campos obrigatórios foram preenchidos
      if (!nome || !email || !senha || !crm || !especialidade || !clinicaSelecionada) {
        alert("Por favor, preencha todos os campos obrigatórios");
        return;
      }

      // Verifica se o CRM tem o formato correto
      if (!/^\d{6}-[A-Za-z]{2}$/.test(crm)) {
        alert("Por favor, insira o CRM no formato correto (123456-SP)");
        return;
      }

      // Verifica se o email ou CRM já estão cadastrados
      const response = await axios.get(`${API_URL}/medicos`);
      const medicos = response.data;

      const medicoExistente = medicos.find(
        (medico) => medico.email === email || medico.crm === crm
      );

      if (medicoExistente) {
        alert('Email ou CRM já cadastrado');
      } else {
        // Cria o médico associado à clínica selecionada
        const novoMedico = {
          nome: nome,
          email: email,
          senha: senha,
          crm: crm,
          especialidade: especialidade,
          id_clinica: clinicaSelecionada.id
        };

        await axios.post(`${API_URL}/medicos`, novoMedico);
        
        // Busca o médico recém-criado para obter o ID
        const newResponse = await axios.get(`${API_URL}/medicos`);
        const newMedico = newResponse.data.find(
          (m) => m.email === email && m.crm === crm
        );
        
        // Armazena os dados do médico no localStorage e redireciona
        localStorage.setItem("usuario", JSON.stringify(newMedico));
        window.location.href = "/home-medico";
      }
    } catch (err) {
      console.error("Erro ao cadastrar médico", err);
      alert("Erro ao conectar-se ao servidor.");
    }
  };

  return (
    <>
      <section className="flex flex-col md:flex-row justify-center items-center h-screen">
        <div className="hidden md:flex">
          <img
            src="/login-img/Wavy_Med.jpg"
            alt="Imagem ao lado dos inputs"
            className="rounded-4xl w-90 md:w-100 lg:w-[500px]"
          />
        </div>

        <form
          className="grid justify-center items-center gap-6 p-6 md:p-10 text-center justify-items-center"
          onSubmit={adicionarMedico}
        >
          <img
            src="/MEDGO_logo.png"
            alt="Logo MedGo"
            className="w-32 md:w-40 mx-25"
          />
          <h1 className="text-black font-semibold text-2xl md:text-2xl text-center font-playfair">
            Cadastro Médico
          </h1>
          <p className="text-black text-center">
            Já possui cadastro?{" "}
            <Link href="/login-medico" className="text-blue-600">
              Login Médico
            </Link>
          </p>

          <input
            placeholder="Nome completo:"
            type="text"
            name="nome"
            onChange={(e) => setNome(e.target.value)}
            required
            className="w-80 md:w-100 border-b-2 border-black focus:outline-none focus:border-blue-500 text-black p-2"
          />

          <input
            placeholder="CRM (ex: 123456-SP):"
            type="text"
            name="crm"
            onChange={(e) => setCrm(e.target.value)}
            required
            pattern="[0-9]{6}-[A-Za-z]{2}"
            title="Formato: 123456-SP"
            className="w-80 md:w-100 border-b-2 border-black focus:outline-none focus:border-blue-500 text-black p-2"
          />

          <input
            placeholder="Especialidade:"
            type="text"
            name="especialidade"
            onChange={(e) => setEspecialidade(e.target.value)}
            required
            className="w-80 md:w-100 border-b-2 border-black focus:outline-none focus:border-blue-500 text-black p-2"
          />

          {/* Seletor de Clínicas */}
          <div className="w-80 md:w-100">
            <select
              onChange={(e) => {
                const clinicaId = parseInt(e.target.value);
                const clinica = clinicas.find(c => c.id === clinicaId);
                setClinicaSelecionada(clinica);
              }}
              required
              className="w-full border-b-2 border-black focus:outline-none focus:border-blue-500 text-black p-2"
            >
              <option value="">Selecione uma clínica</option>
              {clinicas.map((clinica) => (
                <option key={clinica.id} value={clinica.id}>
                  {clinica.nome}
                </option>
              ))}
            </select>
            {clinicaSelecionada && (
              <p className="text-sm text-gray-600 mt-1 text-left">
                Clínica selecionada: {clinicaSelecionada.nome}
              </p>
            )}
          </div>

          <input
            placeholder="Email:"
            type="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-80 md:w-100 border-b-2 border-black focus:outline-none focus:border-blue-500 text-black p-2"
          />

          <input
            placeholder="Senha:"
            type="password"
            name="password"
            onChange={(e) => setSenha(e.target.value)}
            required
            className="w-80 md:w-100 border-b-2 border-black focus:outline-none focus:border-blue-500 text-black p-2"
          />

          <div className="text-black">
            <input type="checkbox" required /> Li e entendi os termos da{" "}
            <Link className="text-blue-500" href="/politicadeprivacidade">
              Política de Privacidade
            </Link>{" "}
            de Medgo.
            <div className="text-black mt-4">
              <button
                className="titulo-background-padrao-medgo hover-background-padrao-medgo text-white px-9 py-3 rounded-4xl transition"
                type="submit"
              >
                Cadastrar Médico
              </button>
            </div>
          </div>
        </form>
      </section>
    </>
  );
}