"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Header from "@/components/Header-adm/page.jsx";

const API_URL = "http://localhost:3001";

export default function GerenciamentoClinicas() {
  const [clinicas, setClinicas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [clinicaSelecionada, setClinicaSelecionada] = useState(null);
  const [modalAberto, setModalAberto] = useState(false);
  const [modoEdicao, setModoEdicao] = useState(false);

  const carregarClinicas = async () => {
    try {
      const response = await axios.get(`${API_URL}/Clinicas`);
      setClinicas(response.data);
    } catch (err) {
      console.error("Erro ao buscar clínicas:", err);
      alert("Erro ao carregar clínicas");
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarClinicas();
  }, []);

  const abrirModalDetalhes = (clinica) => {
    setClinicaSelecionada(clinica);
    setModalAberto(true);
    setModoEdicao(false);
  };

  const abrirModalEdicao = (clinica) => {
    setClinicaSelecionada(clinica);
    setModalAberto(true);
    setModoEdicao(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setClinicaSelecionada(null);
    setModoEdicao(false);
  };

  const handleAdicionarClinica = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/Clinicas`, {
        nome: clinicaSelecionada.nome,
        endereco: clinicaSelecionada.endereco,
        telefone: clinicaSelecionada.telefone,
        email: clinicaSelecionada.email,
        senha: clinicaSelecionada.senha
      });
      alert("Clínica adicionada!");
      fecharModal();
      carregarClinicas();
    } catch (err) {
      console.error("Erro ao adicionar clínica:", err);
      alert("Erro ao adicionar clínica");
    }
  };

  const handleAtualizarClinica = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`${API_URL}/Clinicas/${clinicaSelecionada.id}`, {
        nome: clinicaSelecionada.nome,
        endereco: clinicaSelecionada.endereco,
        telefone: clinicaSelecionada.telefone,
        email: clinicaSelecionada.email
      });
      
      // Atualiza a lista local
      setClinicas(clinicas.map(clinica => 
        clinica.id === clinicaSelecionada.id ? clinicaSelecionada : clinica
      ));
      
      alert("Clínica atualizada com sucesso!");
      fecharModal();
    } catch (err) {
      console.error("Erro ao atualizar clínica:", err);
      alert("Erro ao atualizar clínica");
    }
  };

  const handleExcluirClinica = async (id) => {
    if (confirm("Tem certeza que deseja excluir esta clínica? Esta ação não pode ser desfeita.")) {
      try {
        await axios.delete(`${API_URL}/Clinicas/${id}`);
        setClinicas(clinicas.filter(clinica => clinica.id !== id));
        alert("Clínica excluída com sucesso!");
      } catch (err) {
        console.error("Erro ao excluir clínica:", err);
        alert("Erro ao excluir clínica");
      }
    }
  };

  if (carregando) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-lg text-gray-600">Carregando clínicas...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
      <main className="flex-1 py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-blue-900">Painel Administrativo</h1>
            <p className="mt-2 text-gray-600">Gerenciamento de Clínicas do Sistema</p>
            
            <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-center sm:text-left">
                <p className="text-sm text-gray-600">
                  Total de clínicas: <span className="font-semibold text-blue-600">{clinicas.length}</span>
                </p>
              </div>
              <button
                onClick={() => {
                  setClinicaSelecionada({
                    id: null,
                    nome: "",
                    endereco: "",
                    telefone: "",
                    email: "",
                    senha: ""
                  });
                  setModoEdicao(true);
                  setModalAberto(true);
                }}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors whitespace-nowrap"
              >
                + Adicionar Nova Clínica
              </button>
            </div>
          </div>

          {clinicas.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <p className="text-gray-500 mb-4">Nenhuma clínica cadastrada.</p>
              <button
                onClick={() => {
                  setClinicaSelecionada({
                    id: null,
                    nome: "",
                    endereco: "",
                    telefone: "",
                    email: "",
                    senha: ""
                  });
                  setModoEdicao(true);
                  setModalAberto(true);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Cadastrar primeira clínica
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 py-3 text-left text-sm font-medium text-gray-700">Nome</th>
                      <th className="px-3 py-3 text-left text-sm font-medium text-gray-700 hidden sm:table-cell">Endereço</th>
                      <th className="px-3 py-3 text-left text-sm font-medium text-gray-700 hidden md:table-cell">Telefone</th>
                      <th className="px-3 py-3 text-left text-sm font-medium text-gray-700 hidden lg:table-cell">E-mail</th>
                      <th className="px-3 py-3 text-center text-sm font-medium text-gray-700">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clinicas.map((clinica) => (
                      <tr key={clinica.id} className="border-t hover:bg-gray-50">
                        <td className="px-3 py-3 text-sm text-gray-900">{clinica.nome}</td>
                        <td className="px-3 py-3 text-sm text-gray-900 hidden sm:table-cell">{clinica.endereco}</td>
                        <td className="px-3 py-3 text-sm text-gray-900 hidden md:table-cell">{clinica.telefone}</td>
                        <td className="px-3 py-3 text-sm text-gray-900 hidden lg:table-cell">{clinica.email}</td>
                        <td className="px-3 py-3 text-center">
                          <div className="flex justify-center space-x-2">
                            <button
                              onClick={() => abrirModalDetalhes(clinica)}
                              className="px-2 py-1 text-xs sm:text-sm bg-blue-100 text-blue-800 rounded hover:bg-blue-200"
                            >
                              Ver
                            </button>
                            <button
                              onClick={() => abrirModalEdicao(clinica)}
                              className="px-2 py-1 text-xs sm:text-sm bg-yellow-100 text-yellow-800 rounded hover:bg-yellow-200"
                            >
                              Editar
                            </button>
                            <button
                              onClick={() => handleExcluirClinica(clinica.id)}
                              className="px-2 py-1 text-xs sm:text-sm bg-red-100 text-red-800 rounded hover:bg-red-200"
                            >
                              Excluir
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {modalAberto && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-blue-800">
                  {modoEdicao ? (clinicaSelecionada.id ? "Editar Clínica" : "Adicionar Nova Clínica") : "Detalhes da Clínica"}
                </h2>
                <button
                  onClick={fecharModal}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
              {modoEdicao ? (
                <form 
                  className="space-y-4" 
                  onSubmit={clinicaSelecionada.id ? handleAtualizarClinica : handleAdicionarClinica}
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nome da Clínica*</label>
                    <input
                      type="text"
                      value={clinicaSelecionada.nome}
                      onChange={(e) => setClinicaSelecionada({...clinicaSelecionada, nome: e.target.value})}
                      className="text-black w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Ex: Clínica Saúde Total"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Endereço Completo*</label>
                    <textarea
                      value={clinicaSelecionada.endereco}
                      onChange={(e) => setClinicaSelecionada({...clinicaSelecionada, endereco: e.target.value})}
                      className="text-black w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows="3"
                      placeholder="Rua, número, bairro, cidade - UF"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Telefone*</label>
                      <input
                        type="tel"
                        value={clinicaSelecionada.telefone}
                        onChange={(e) => setClinicaSelecionada({...clinicaSelecionada, telefone: e.target.value})}
                        className="text-black w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="(11) 1234-5678"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">E-mail*</label>
                      <input
                        type="email"
                        value={clinicaSelecionada.email}
                        onChange={(e) => setClinicaSelecionada({...clinicaSelecionada, email: e.target.value})}
                        className="text-black w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="contato@clinica.com"
                        required
                      />
                    </div>
                  </div>
                  {!clinicaSelecionada.id && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Senha de Acesso*</label>
                      <input
                        type="password"
                        value={clinicaSelecionada.senha}
                        onChange={(e) => setClinicaSelecionada({...clinicaSelecionada, senha: e.target.value})}
                        className="text-black w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Senha para acesso da clínica"
                        required
                      />
                    </div>
                  )}
                  <div className="mt-8 flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={fecharModal}
                      className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      {clinicaSelecionada.id ? "Atualizar" : "Cadastrar"}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium text-gray-500 mb-2">Nome da Clínica</h3>
                    <p className="text-lg text-gray-800 font-semibold">{clinicaSelecionada.nome}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-500 mb-2">Endereço</h3>
                    <p className="text-gray-800">{clinicaSelecionada.endereco}</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-medium text-gray-500 mb-2">Telefone</h3>
                      <p className="text-gray-800">{clinicaSelecionada.telefone}</p>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-500 mb-2">E-mail</h3>
                      <p className="text-gray-800">{clinicaSelecionada.email}</p>
                    </div>
                  </div>
                  <div className="mt-8 flex justify-end space-x-3">
                    <button
                      onClick={() => abrirModalEdicao(clinicaSelecionada)}
                      className="px-6 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
                    >
                      Editar
                    </button>
                    <button
                      onClick={fecharModal}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Fechar
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}