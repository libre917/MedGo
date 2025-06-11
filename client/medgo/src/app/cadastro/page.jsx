"use client";
import React from "react";
import Link from "next/link";
import axios from "axios";
import { useState } from "react";
const API_URL = "http://localhost:3001"

export default function Cadastro() {

  // Limpa apenas dados específicos ao invés de todo localStorage

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [endereco, setEndereco] = useState("");
  const dataAtual = new Date()

  // Sistema de notificações
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  // Função para validar data de nascimento
  const validarDataNascimento = (dataString) => {
    const [dia, mes, ano] = dataString.split("/").map(Number);

    // Validações básicas
    if (!dia || !mes || !ano) return { valido: false, erro: "Data inválida" };
    if (mes < 1 || mes > 12) return { valido: false, erro: "Mês inválido" };
    if (ano < 1900 || ano > dataAtual.getFullYear()) return { valido: false, erro: "Ano inválido" };

    // Dias por mês (considerando ano bissexto)
    const diasPorMes = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // Verifica ano bissexto
    if (mes === 2 && ((ano % 4 === 0 && ano % 100 !== 0) || (ano % 400 === 0))) {
      diasPorMes[1] = 29;
    }

    if (dia < 1 || dia > diasPorMes[mes - 1]) {
      return { valido: false, erro: "Dia inválido para este mês" };
    }

    // Verifica idade
    const idade = dataAtual.getFullYear() - ano;
    if (idade > 120) return { valido: false, erro: "Idade inválida" };
    if (idade < 18) return { valido: false, erro: "É necessário ser maior de idade" };

    return { valido: true, idade };
  };

  // Função para validar telefone brasileiro
  const validarTelefone = (telefone) => {
    // Remove caracteres não numéricos
    const numeroLimpo = telefone.replace(/\D/g, '');

    // Verifica se tem 10 ou 11 dígitos (com DDD)
    if (numeroLimpo.length < 10 || numeroLimpo.length > 11) {
      return false;
    }

    // Verifica se o DDD é válido (11-99)
    const ddd = parseInt(numeroLimpo.substring(0, 2));
    if (ddd < 11 || ddd > 99) {
      return false;
    }

    return true;
  };

  const adicionarDados = async () => {
    try {
      // Validações
      if (nome.trim().length < 2) {
        showNotification("Nome deve ter pelo menos 2 caracteres", 'error');
        return;
      }

      if (!validarTelefone(telefone)) {
        showNotification("Telefone inválido. Use formato: (11) 99999-9999", 'error');
        return;
      }

      if (endereco.trim().length < 5) {
        showNotification("Endereço deve ter pelo menos 5 caracteres", 'error');
        return;
      }

      const validacaoData = validarDataNascimento(dataNascimento);
      if (!validacaoData.valido) {
        showNotification(validacaoData.erro, 'error');
        return;
      }

      if (senha.length < 6) {
        showNotification("A senha deve ter pelo menos 6 caracteres", 'error');
        return;
      }

      // Verifica se email já existe
      const response = await axios.get(`${API_URL}/pacientes`);
      const pacientes = response.data;

      const usuarioExistente = pacientes.find(
        (paciente) => paciente.email.toLowerCase() === email.toLowerCase()
      );

      if (usuarioExistente) {
        showNotification('Este email já está cadastrado', 'error');
        return;
      }

      // Cadastra o usuário
      await axios.post(`${API_URL}/pacientes`, {
        nome: nome.trim(),
        email: email.toLowerCase(),
        senha: senha,
        endereco: endereco.trim(),
        telefone: telefone,
        dataNascimento: dataNascimento
      });

      // Faz login automático
      const loginResponse = await axios.post(`${API_URL}/auth/login`, {
        email: email.toLowerCase(),
        senha: senha
      });

      const dadosUsuario = loginResponse.data;
      localStorage.setItem("usuario", JSON.stringify(dadosUsuario));

      showNotification('Cadastro realizado com sucesso!', 'success');

      // Redireciona após um delay para mostrar a notificação
      setTimeout(() => {
        window.location.href = "/home";
      }, 1500);

    } catch (err) {
      console.error("Erro ao cadastrar:", err);

      if (err.response?.status === 400) {
        showNotification("Dados inválidos. Verifique as informações.", 'error');
      } else if (err.response?.status === 409) {
        showNotification("Email já cadastrado.", 'error');
      } else {
        showNotification("Erro ao conectar com o servidor. Tente novamente.", 'error');
      }
    }
  };

  return (
    <>
      {/* Sistema de Notificações */}
      {notification && (
        <div className="fixed top-4 right-4 z-50 max-w-sm w-full animate-slide-in">
          <div className={`p-4 rounded-lg shadow-lg border-l-4 ${notification.type === 'success'
              ? 'bg-green-50 border-green-400 text-green-800'
              : notification.type === 'error'
                ? 'bg-red-50 border-red-400 text-red-800'
                : 'bg-blue-50 border-blue-400 text-blue-800'
            }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className={`flex-shrink-0 w-5 h-5 mr-3 ${notification.type === 'success'
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
                className={`ml-4 text-lg font-bold leading-none ${notification.type === 'success'
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

      {/* form de cadastro */}
      <section className="flex flex-col md:flex-row justify-center items-center min-h-screen py-8">
        <div className="hidden md:flex">
          <img
            src="/login-img/Wavy_Med.jpg"
            alt="Imagem ao lado dos inputs"
            className="rounded-4xl w-90 md:w-100 lg:w-[500px]"
          />
        </div>

        <form
          className="grid justify-center items-center gap-6 p-6 md:p-10 text-center justify-items-center max-w-md w-full"
          onSubmit={(e) => {
            e.preventDefault();
            adicionarDados();
          }}
        >
          <img
            src="/MEDGO_logo.png"
            alt="Logo MedGo"
            className="w-32 md:w-40 mx-25 md:mx-30 mt-20 xl:mt-0"
          />
          <h1 className="text-black font-semibold text-2xl md:text-2xl text-center font-playfair">
            Faça o cadastro para continuar
          </h1>
          <p className="text-black text-center">
            Já possui conta?{" "}
            <Link href="/" className="text-blue-600 hover:text-blue-800 transition-colors">
              Login
            </Link>
          </p>

          <input
            placeholder="Nome completo"
            type="text"
            name="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
            className="w-full max-w-80 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 text-black p-2 transition-colors"
          />

          <input
            placeholder="Telefone (ex: 11999887766)"
            type="tel"
            name="tel"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            required
            className="w-full max-w-80 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 text-black p-2 transition-colors"
          />

          <input
            placeholder="Endereço completo"
            type="text"
            name="endereco"
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
            required
            className="w-full max-w-80 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 text-black p-2 transition-colors"
          />

          <input
            placeholder="Data de nascimento (DD/MM/AAAA)"
            type="text"
            name="dataNascimento"
            value={dataNascimento}
            pattern="[0-9]{2}/[0-9]{2}/[0-9]{4}"
            onChange={(e) => setDataNascimento(e.target.value)}
            required
            className="w-full max-w-80 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 text-black p-2 transition-colors"
          />

          <input
            placeholder="Email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full max-w-80 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 text-black p-2 transition-colors"
          />

          <input
            placeholder="Senha (mínimo 6 caracteres)"
            type="password"
            name="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            minLength="6"
            className="w-full max-w-80 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 text-black p-2 transition-colors"
          />

          <div className="text-black text-sm">
            <label className="flex items-center justify-center gap-2 cursor-pointer">
              <input type="checkbox" required className="cursor-pointer" />
              <span>
                Li e entendi os termos da{" "}
                <Link
                  className="text-blue-500 hover:text-blue-700 transition-colors"
                  href="/politicadeprivacidade"
                >
                  Política de Privacidade
                </Link>{" "}
                de MedGo.
              </span>
            </label>

            <button
              className="titulo-background-padrao-medgo hover-background-padrao-medgo text-white px-9 py-3 rounded-4xl transition-all hover:shadow-lg mt-5 w-full max-w-48"
              type="submit"
            >
              Cadastre-se
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