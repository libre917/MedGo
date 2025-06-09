"use client";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from 'next/navigation';
const API_URL = "http://localhost:3001"



export default function Login() {
  // Limpa o localStorage ao carregar a página de login
  const userData = localStorage.getItem("usuario");
  if (userData) {
    localStorage.clear();
  }


  // Estados para email, senha e campos extras conforme o tipo selecionado
  const [userType, setUserType] = useState("Paciente");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [crm, setCrm] = useState(""); // campo extra para médicos
  const [codigoClinica, setCodigoClinica] = useState(""); // campo extra para clínicas
  const [chaveAdmin, setChaveAdmin] = useState(""); // campo extra para administradores

  const [mostrarModal, setMostrarModal] = useState(false);
  const [mensagemErro, setMensagemErro] = useState("");
  const router = useRouter();

  const compararDados = async () => {
    try {
      // Redireciona de acordo com o tipo de usuário
      if (userType === "ADM") {
        const response = await axios.post(`${API_URL}/auth/admLogin`, {
          email: email,
          senha: senha,
          codigo: chaveAdmin
        });
        const adm = response.data;
        localStorage.setItem("usuario", JSON.stringify(adm));
        router.push('/home-admin');
      } else if (userType === "Medico") {
        const response = await axios.post(`${API_URL}/auth/medLogin`, {
          senha: senha,
          email: email,
          crm: crm
        });
        const medicos = response.data;
        localStorage.setItem("usuario", JSON.stringify(medicos));
        router.push('/home-medico')
      } else if (userType === "Clinica") {

        const response = await axios.post(`${API_URL}/auth/clinicaLogin`, {
          email: email,
          senha: senha
        });
        const clinica = response.data;
        localStorage.setItem("usuario", JSON.stringify(clinica));
        router.push('/home-clinicas');

      } else if (userType === "Paciente") {
        const response = await axios.post(`${API_URL}/auth/login`, {
          email: email,
          senha: senha
        });
        const paciente = response.data;
        localStorage.setItem("usuario", JSON.stringify(paciente));
        router.push('/home')
      }
    } catch (err) {
      if(!err.response){
        setMensagemErro("Falha na conexão");
        setMostrarModal(true)
        return
      }
      if (err.response && err.response.status === 401) {
        setMensagemErro("Dados inseridos incorretos");
        setMostrarModal(true);
        return;
      }
      if (err.response && err.response.status === 404) {
        setMensagemErro(userType + " sem cadastro");
        setMostrarModal(true);
        return;
      }
      if (err.response && err.response.status === 500) {
        setMensagemErro("Erro interno do servidor, tente novamente mais tarde");
        setMostrarModal(true);
        return;
      }
      console.error("Erro desconhecido", err);
      setMensagemErro("Erro desconhecido, tente novamente.");
      setMostrarModal(true);
    }
  };

  const fecharModal = () => {
    setMostrarModal(false);
  };

  return (
    <>
      {/* Modal de erro */}
      {mostrarModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md w-full mx-4 relative border border-red-100">
            <div className="flex flex-col items-center mb-6">
              <div className="bg-red-100/80 p-3 rounded-full mb-4">
                <FontAwesomeIcon icon={faTriangleExclamation} className="text-3xl text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">{mensagemErro}</h3>
            </div>
            <div className="text-center mb-8">
              <div className="mt-4 h-1 w-20 bg-red-100 mx-auto rounded-full"></div>
            </div>
            <div className="flex justify-center">
              <button
                onClick={fecharModal}
                className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
              >
                Entendi
              </button>
            </div>
          </div>
        </div>
      )}

      <section className="flex flex-col md:flex-row justify-center items-center h-screen overflow-hidden text-center">
        <div className="hidden md:flex">
          <img
            src="/login-img/Wavy_Med.jpg"
            alt="Imagem ao lado dos inputs"
            className="rounded-4xl w-72 md:w-96 lg:w-[500px]"
          />
        </div>

        <form
          className="grid justify-center items-center gap-6 p-6 md:p-10"
          onSubmit={(e) => {
            e.preventDefault();
            compararDados();
          }}
        >
          <img
            src="/MEDGO_logo.png"
            alt="Logo MedGo"
            className="w-32 md:w-40 mx-25"
          />

          <h1 className="text-black font-semibold text-2xl md:text-3xl text-center font-playfair">
            Faça o login para continuar
          </h1>

          <p className="text-black text-center">
            Não tem conta?{" "}
            <Link href="/cadastro" className="text-blue-600">
              Cadastre-se
            </Link>
          </p>

          {/* Dropdown de seleção de tipo de usuário */}
          <div className="grid justify-center">
            <select
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              className="w-80 md:w-100 border-b-2 border-black focus:outline-none focus:border-blue-500 text-black p-2"
            >
              <option value="Paciente">Paciente</option>
              <option value="Medico">Médico</option>
              <option value="Clinica">Clínica</option>
              <option value="ADM">ADM</option>
            </select>
          </div>

          {/* Inputs comuns para todos os usuários */}
          <div className="grid">
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              placeholder="Email:"
              type="email"
              name="email"
              required
              onChange={(e) => setEmail(e.target.value)}
              className="w-80 md:w-100 border-b-2 border-black focus:outline-none focus:border-blue-500 text-black p-2"
            />
          </div>
          <div className="grid">
            <label htmlFor="senha" className="sr-only">
              Senha
            </label>
            <input
              placeholder="Senha:"
              type="password"
              name="password"
              required
              onChange={(e) => setSenha(e.target.value)}
              className="w-80 md:w-100 border-b-2 border-black focus:outline-none focus:border-blue-500 text-black p-2"
            />
          </div>

          {/* Exibe input adicional para Médicos */}
          {userType === "Medico" && (
            <div className="grid">
              <label htmlFor="crm" className="sr-only">
                CRM
              </label>
              <input
                placeholder="CRM:"
                type="text"
                name="crm"
                required
                onChange={(e) => setCrm(e.target.value)}
                className="w-80 md:w-100 border-b-2 border-black focus:outline-none focus:border-blue-500 text-black p-2"
              />
            </div>
          )}

          {/* Exibe input adicional para ADM */}
          {userType === "ADM" && (
            <div className="grid">
              <label htmlFor="chaveAdmin" className="sr-only">
                Chave de Acesso ADM
              </label>
              <input
                placeholder="Chave de Acesso ADM:"
                type="password"
                name="chaveAdmin"
                required
                onChange={(e) => setChaveAdmin(e.target.value)}
                className="w-80 md:w-100 border-b-2 border-black focus:outline-none focus:border-blue-500 text-black p-2"
              />
            </div>
          )}

          <div className="text-black">
            <button
              className="titulo-background-padrao-medgo hover-background-padrao-medgo text-white px-9 py-3 rounded-4xl transition"
              type="submit"
            >
              Log In
            </button>
          </div>
        </form>
      </section>
    </>
  );
}