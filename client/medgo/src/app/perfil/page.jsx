"use client";

import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
const API_URL = "http://localhost:3001";

export default function Perfil() {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [altSenha, setAltSenha] = useState(null);
  const [senha, setSenha] = useState("");
  const [newSenha, setNewSenha] = useState("");

  const deletarConta = async (idUser) => {
    if (!confirm('Tem certeza que deseja deletar sua conta? Todos os seus dados serão permanentemente removidos.')) return;
    try {
      await axios.delete(`${API_URL}/pacientes/${idUser}`);
      localStorage.removeItem("usuario");
      window.location = "/";
    } catch (err) {
      console.error("Erro ao excluir conta:", err);
      alert("Ocorreu um erro ao tentar excluir sua conta");
    }
  }

  // Obter dados do usuário logado
  const userData = localStorage.getItem("usuario");
  const usuarioLogado = userData ? JSON.parse(userData) : null;

  // Calcular idade
  const calcularIdade = (dataNascimento) => {
    if (!dataNascimento) return null;
    
    try {
      const data = new Date();
      const anoAtual = data.getFullYear();
      
      // Tenta diferentes formatos de data
      if (typeof dataNascimento === 'string') {
        if (dataNascimento.includes(' ')) {
          // Formato: "Wed Oct 25 1995 00:00:00 GMT-0300"
          const dataNasc = dataNascimento.split(" ");
          return anoAtual - parseInt(dataNasc[3]);
        } else if (dataNascimento.includes('-')) {
          // Formato: "1995-10-25"
          const dataNasc = new Date(dataNascimento);
          return anoAtual - dataNasc.getFullYear();
        }
      }
      
      return null;
    } catch (err) {
      console.err("Erro ao calcular idade:", err);
      return null;
    }
  }

  const atualizarSenha = async (idUser) => {
    try {
      // Verificar senha atual
      await axios.post(`${API_URL}/auth/login`, {
        email: usuarioLogado.email, 
        senha: senha
      });
      
      // Atualizar senha
      await axios.put(`${API_URL}/pacientes/${idUser}`, {
        ...usuario,
        senha: newSenha
      });
     
      alert('Senha alterada com sucesso!');
      setAltSenha(null);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        alert("Senha atual incorreta");
      } else {
        console.err('Erro ao atualizar senha:', err);
        alert("Ocorreu um erro ao atualizar sua senha");
      }
    }
  }

  useEffect(() => {
    // Redirecionar se não estiver logado
    if (!userData) {
      alert('Faça login para acessar seu perfil');
      window.location.href = "/login";
      return;
    }

    const fetchPerfil = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/pacientes/${usuarioLogado.id}`);

        // Calcular idade se necessário
        let idadeCalculada = null;
        if (!data.idade && data.data_nascimento) {
          idadeCalculada = calcularIdade(data.data_nascimento);
        }

        setUsuario({
          ...data,
          idade: data.idade || idadeCalculada
        });
      } catch (err) {
        console.err("Erro ao carregar perfil:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPerfil();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!usuario) {
    return (
      <div className="h-screen flex items-center justify-center bg-white">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-light text-gray-800">Perfil não disponível</h1>
          <p className="text-gray-500">Não foi possível carregar suas informações</p>
          <button 
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => window.location.reload()}
          >
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="space-y-12">
          <div className="text-center">
            <div className="inline-block relative">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center transition-all duration-300 hover:scale-105">
                <span className="text-4xl text-blue-600 font-light">
                  {usuario.nome.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-500 rounded-full border-4 border-white"></div>
            </div>
            <h1 className="mt-6 text-4xl font-light text-gray-900">
              {usuario.nome}
            </h1>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-8">
              <div>
                <h2 className="text-xs text-blue-600 font-bold uppercase tracking-wider">
                  Informações Pessoais
                </h2>
                <div className="mt-4 space-y-4">
                  {usuario.idade && (
                    <div className="pb-4 border-b border-gray-100">
                      <p className="text-sm text-gray-500">Idade</p>
                      <p className="mt-1 text-lg font-light text-gray-800">
                        {usuario.idade} anos
                      </p>
                    </div>
                  )}
                  {usuario.telefone && (
                    <div className="pb-4 border-b border-gray-100">
                      <p className="text-sm text-gray-500">Telefone</p>
                      <p className="mt-1 text-lg font-light text-gray-800">
                        {usuario.telefone}
                      </p>
                    </div>
                  )}
              

            <div className="space-y-8">
              <div>
                <h2 className="text-xs text-blue-600 font-bold uppercase tracking-wider">
                  Contato
                </h2>
                <div className="mt-4 space-y-4">
                  <div className="pb-4 border-b border-gray-100">
                    <p className="text-sm text-gray-500">E-mail</p>
                    <p className="mt-1 text-lg font-light text-gray-800">
                      {usuario.email}
                    </p>
                  </div>
                  {usuario.endereco && (
                    <div className="pb-4 border-b border-gray-100">
                      <p className="text-sm text-gray-500">Endereço</p>
                      <p className="mt-1 text-lg font-light text-gray-800">
                        {usuario.endereco}
                      </p>
                    </div>
                  )}
                </div>
              </div>
                  <div className="flex justify-center pt-4">
                    <button 
                      className="m-2 px-4 py-2 rounded-lg bg-yellow-100 text-yellow-800 hover:bg-yellow-200 transition-colors"
                      onClick={() => setAltSenha(usuario)}
                    >
                      Alterar senha
                    </button>
                    <button 
                      className="m-2 px-4 py-2 rounded-lg bg-red-100 text-red-800 hover:bg-red-200 transition-colors"
                      onClick={() => deletarConta(usuario.id)}
                    >
                      Excluir conta
                    </button>
                  </div>
                </div>
              </div>
            </div>
            </div>
            
            {altSenha && (
              <div className="fixed inset-0 bg-gray-900/60 bg-opacity-50 flex items-center justify-center p-4 z-50">
                <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    atualizarSenha(usuario.id);
                  }}>
                    <div className="flex justify-between items-start mb-4">
                      <h2 className="text-2xl font-bold text-blue-800">Alterar Senha</h2>
                      <button
                        type="button"
                        onClick={() => setAltSenha(null)}
                        className="text-gray-500 hover:text-gray-700 text-xl"
                      >
                        ×
                      </button>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Senha atual
                        </label>
                        <input 
                          required 
                          type="password" 
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                          onChange={(e) => setSenha(e.target.value)} 
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Nova senha
                        </label>
                        <input 
                          required 
                          type="password" 
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                          onChange={(e) => setNewSenha(e.target.value)} 
                        />
                      </div>
                    </div>
                    <div className="mt-6 flex justify-end space-x-3">
                      <button 
                        type="submit" 
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                      >
                        Salvar
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}