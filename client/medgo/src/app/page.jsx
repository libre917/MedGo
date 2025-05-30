"use client";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNotesMedical, faTriangleExclamation, faXmark } from '@fortawesome/free-solid-svg-icons';
import Image from "next/image";
import Link from "next/link";
import React from "react";
import axios from "axios";
import { useState } from "react";


export default function Login() {
  localStorage.clear();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mensagemErro, setMensagemErro] = useState("");

  const compararDados = async () => {
    try {
      const response = await axios.get("http://localhost:3000/Pacientes");
      const paciente = response.data;

      const user = paciente.find(
        (paciente) => paciente.email === email && paciente.senha === senha
      );

      if (user) {
        localStorage.setItem("usuario", JSON.stringify(user));
        window.location.href = "/home";
      } else {
        setMensagemErro("Email ou senha incorreto(s)");
        setMostrarModal(true);
      }
    } catch (err) {
      console.error("Erro ao comparar dados", err);
      setMensagemErro("Erro ao conectar-se ao servidor.");
      setMostrarModal(true);
    }
  };

  const fecharModal = () => {
    setMostrarModal(false);
  };

  return (
    <>
      {/* Modal de erro - VERSÃO ALTAMENTE ESTILIZADA */}
      {mostrarModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
          {/* Container do modal com efeito de elevação e borda sutil */}
          <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md w-full mx-4 relative border border-red-100">
            
            {/* Ícone de fechar (canto superior direito) */}
            <button
              onClick={fecharModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
            >
              <FontAwesomeIcon icon={faXmark} className="text-xl" />
            </button>
            
            {/* Cabeçalho com ícone de alerta */}
            <div className="flex flex-col items-center mb-6">
              <div className="bg-red-100/80 p-3 rounded-full mb-4">
                <FontAwesomeIcon 
                  icon={faTriangleExclamation} 
                  className="text-3xl text-red-600" 
                />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Ops, algo deu errado!</h3>
            </div>
            
            {/* Mensagem de erro */}
            <div className="text-center mb-8">
              <p className="text-gray-600 text-lg">{mensagemErro}</p>
              <div className="mt-4 h-1 w-20 bg-red-100 mx-auto rounded-full"></div>
            </div>
            
            {/* Botão de ação */}
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

      {/* 
        RESTANTE DO CÓDIGO PERMANECE EXATAMENTE IGUAL 
        (mantido conforme seu original)
      */}
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
            Não tem conta? <Link href="/cadastro" className="text-blue-600">
              Cadastre-se
            </Link>
          </p>

          <p className='text-black'>
            É médico? <Link href="/login-medico">Login</Link> 
          </p>

          <div className="grid">
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
            <input
              placeholder="Senha:"
              type="password"
              name="password"
              required
              onChange={(e) => setSenha(e.target.value)}
              className="w-80 md:w-100 border-b-2 border-black focus:outline-none focus:border-blue-500 text-black p-2"
            />
          </div>

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