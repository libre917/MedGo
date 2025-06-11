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
  
  // Sistema de notificações
  const [notification, setNotification] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState(null);

  const showNotification = (message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  const showConfirm = (message, onConfirm, onCancel = null) => {
    setConfirmDialog({
      message,
      onConfirm: () => {
        onConfirm();
        setConfirmDialog(null);
      },
      onCancel: () => {
        if (onCancel) onCancel();
        setConfirmDialog(null);
      }
    });
  };

  const deletarConta = async (idUser) => {
    showConfirm(
      'Tem certeza que deseja deletar sua conta? Todos os seus dados serão permanentemente removidos.',
      async () => {
        try {
          await axios.delete(`${API_URL}/pacientes/${idUser}`);
          localStorage.removeItem("usuario");
          showNotification('Conta deletada com sucesso!', 'success');
          setTimeout(() => {
            window.location = "/";
          }, 1500);
        } catch (err) {
          console.error("Erro ao excluir conta:", err);
          showNotification("Ocorreu um erro ao tentar excluir sua conta", 'error');
        }
      }
    );
  }

  // Obter dados do usuário logado
  const userData = localStorage.getItem("usuario");
  const usuarioLogado = userData ? JSON.parse(userData) : null;

  // Calcular idade - CORRIGIDO
  const calcularIdade = (dataNascimento) => {
    if (!dataNascimento) return null;
    
    try {
      const hoje = new Date();
      let nascimento;
      
      // Se é uma string ISO (como no seu JSON)
      if (typeof dataNascimento === 'string') {
        nascimento = new Date(dataNascimento);
      } else {
        nascimento = new Date(dataNascimento);
      }
      
      let idade = hoje.getFullYear() - nascimento.getFullYear();
      const mesAtual = hoje.getMonth();
      const mesNascimento = nascimento.getMonth();
      
      // Ajustar se ainda não fez aniversário este ano
      if (mesAtual < mesNascimento || (mesAtual === mesNascimento && hoje.getDate() < nascimento.getDate())) {
        idade--;
      }
      
      return idade;
    } catch (err) {
      console.error("Erro ao calcular idade:", err);
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
     
      showNotification('Senha alterada com sucesso!', 'success');
      setAltSenha(null);
      setSenha("");
      setNewSenha("");
    } catch (err) {
      if (err.response && err.response.status === 401) {
        showNotification("Senha atual incorreta", 'error');
      } else {
        console.error('Erro ao atualizar senha:', err);
        showNotification("Ocorreu um erro ao atualizar sua senha", 'error');
      }
    }
  }

  useEffect(() => {
    // Redirecionar se não estiver logado
    if (!userData) {
      showNotification('Faça login para acessar seu perfil', 'error');
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
      return;
    }

    const fetchPerfil = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/pacientes/${usuarioLogado.id}`);

        // Calcular idade baseado na data de nascimento - CORRIGIDO
        let idadeCalculada = null;
        if (data.dataNascimento) { // Note: 'dataNascimento' no camelCase conforme seu JSON
          idadeCalculada = calcularIdade(data.dataNascimento);
        }

        setUsuario({
          ...data,
          idade: data.idade || idadeCalculada
        });
      } catch (err) {
        console.error("Erro ao carregar perfil:", err);
        showNotification("Erro ao carregar perfil", 'error');
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

      {/* Dialog de Confirmação */}
      {confirmDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 animate-scale-in">
            <div className="flex items-center mb-4">
              <div className="flex-shrink-0 w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 19.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Confirmação</h3>
            </div>
            <p className="text-gray-600 mb-6">{confirmDialog.message}</p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={confirmDialog.onCancel}
                className="px-4 py-2 text-gray-600 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={confirmDialog.onConfirm}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

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

            <div className="grid md:grid-cols-2 gap-8 ">
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
                  </div>
                </div>
              </div>

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
          
          {altSenha && (
            <div className="fixed inset-0 bg-gray-900/60 bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 animate-scale-in">
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
                        value={senha}
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
                        value={newSenha}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                        onChange={(e) => setNewSenha(e.target.value)} 
                      />
                    </div>
                  </div>
                  <div className="mt-6 flex justify-end space-x-3">
                    <button 
                      type="button"
                      onClick={() => setAltSenha(null)}
                      className="px-4 py-2 text-gray-600 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
                    >
                      Cancelar
                    </button>
                    <button 
                      type="submit" 
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
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
        
        @keyframes scale-in {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-scale-in {
          animation: scale-in 0.2s ease-out;
        }
      `}</style>
    </>
  );
}