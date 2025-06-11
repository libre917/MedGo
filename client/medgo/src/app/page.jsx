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

  // Sistema de notificações
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  const compararDados = async () => {
    try {
      // Redireciona de acordo com o tipo de usuário
      if (userType === "ADM") {
        const response = await axios.post(`${API_URL}/auth/admLogin`, {
          email: email,
          senha: senha,
        });
        const adm = response.data;
        localStorage.setItem("usuario", JSON.stringify(adm));
        showNotification('Login realizado com sucesso!', 'success');
        setTimeout(() => {
          router.push('/home-admin');
        }, 1500);
      } else if (userType === "Medico") {
        const response = await axios.post(`${API_URL}/auth/medLogin`, {
          senha: senha,
          email: email,
          crm: crm
        });
        const medicos = response.data;
        localStorage.setItem("usuario", JSON.stringify(medicos));
        showNotification('Login realizado com sucesso!', 'success');
        setTimeout(() => {
          router.push('/home-medico');
        }, 1500);
      } else if (userType === "Clinica") {
        const response = await axios.post(`${API_URL}/auth/clinicaLogin`, {
          email: email,
          senha: senha
        });
        const clinica = response.data;
        localStorage.setItem("usuario", JSON.stringify(clinica));
        showNotification('Login realizado com sucesso!', 'success');
        setTimeout(() => {
          router.push('/home-clinicas');
        }, 1500);
      } else if (userType === "Paciente") {
        const response = await axios.post(`${API_URL}/auth/login`, {
          email: email,
          senha: senha
        });
        const paciente = response.data;
        localStorage.setItem("usuario", JSON.stringify(paciente));
        showNotification('Login realizado com sucesso!', 'success');
        setTimeout(() => {
          router.push('/home');
        }, 1500);
      }
    } catch (err) {
      if(!err.response){
        showNotification("Falha na conexão com o servidor", 'error');
        return;
      }
      if (err.response && err.response.status === 401) {
        showNotification("Emai e/ou senha incorreto(s)", 'error');
        return;
      }
      if (err.response && err.response.status === 404) {
        showNotification(userType + " sem cadastro", 'error');
        return;
      }
      if (err.response && err.response.status === 500) {
        showNotification("Erro interno do servidor, tente novamente mais tarde", 'error');
        return;
      }
      console.error("Erro desconhecido", err);
      showNotification("Erro desconhecido, tente novamente", 'error');
    }
  };

  const fecharModal = () => {
    setMostrarModal(false);
  };

  return (
    <>
      {/* Sistema de Notificações */}
      {notification && (
        <div className="fixed top-4 right-4 z-50 max-w-sm w-full animate-slide-in">
          <div className={`p-4 rounded-lg shadow-lg border-l-4 ${
            notification.type === 'success' 
              ? 'bg-green-50 border-green-400 text-green-800' 
              : notification.type === 'error' 
              ? 'bg-red-50 border-red-400 text-red-800' 
              : 'bg-blue-50 border-blue-400 text-blue-800'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className={`flex-shrink-0 w-5 h-5 mr-3 ${
                  notification.type === 'success' 
                    ? 'text-green-400' 
                    : notification.type === 'error' 
                    ? 'text-red-400' 
                    : 'text-blue-400'
                }`}>
                  {notification.type === 'success' && (
                    <svg fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )}
                  {notification.type === 'error' && (
                    <svg fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  )}
                  {notification.type === 'info' && (
                    <svg fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <p className="text-sm font-medium">{notification.message}</p>
              </div>
              <button
                onClick={() => setNotification(null)}
                className={`ml-4 text-lg font-bold leading-none ${
                  notification.type === 'success' 
                    ? 'text-green-600 hover:text-green-500' 
                    : notification.type === 'error' 
                    ? 'text-red-600 hover:text-red-500' 
                    : 'text-blue-600 hover:text-blue-500'
                } cursor-pointer`}
              >
                ×
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de erro (mantido caso queira usar) */}
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

      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </>
  );
}