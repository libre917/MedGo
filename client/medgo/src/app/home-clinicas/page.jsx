"use client";
import { useState, useEffect } from "react";
import axios from "axios";
const API_URL = "http://localhost:3001"

export default function GerenciamentoMedicos() {
  const [medicos, setMedicos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [medicoSelecionado, setMedicoSelecionado] = useState(null);
  const [modalAberto, setModalAberto] = useState(false);
  const [modoEdicao, setModoEdicao] = useState(false);

  const clinicaDados = localStorage.getItem("usuario");
  const clinicaLogada = JSON.parse(clinicaDados);

  // Carrega lista de médicos ao montar o componente
  useEffect(() => {
    const carregarMedicos = async () => {
      try {
        const resposta = await axios.get(`${API_URL}/medicos`);
        const listaFiltrada = resposta.data.filter(
          (medico) => medico.id_clinica === clinicaLogada.id
        );
        setMedicos(listaFiltrada);
      } catch (err) {
        console.error("Erro ao buscar médicos:", err);
      } finally {
        setCarregando(false);
      }
    };

    carregarMedicos();
  }, [clinicaLogada.id]);

  const abrirModalDetalhes = (medico) => {
    setMedicoSelecionado(medico);
    setModalAberto(true);
    setModoEdicao(false);
  };

  const abrirModalEdicao = (medico) => {
    setMedicoSelecionado(medico);
    setModalAberto(true);
    setModoEdicao(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setMedicoSelecionado(null);
    setModoEdicao(false);
  };

  const handleExcluirMedico = async (id) => {
    try {
      if (confirm("Tem certeza que deseja excluir este médico?")) {
        await axios.delete(`${API_URL}/medicos/${id}`);
        setMedicos((prev) => prev.filter((m) => m.id !== id));
        alert("Médico excluído com sucesso!");
      }
    } catch (err) {
      console.error('Erro ao deletar:', err);
      alert("Erro ao deletar médico do banco de dados");
    }
  };

  const handleSalvarMedico = async (e) => {
    e.preventDefault();

    try {
      const dadosMedico = {
        nome: medicoSelecionado.nome,
        email: medicoSelecionado.email,
        senha: medicoSelecionado.senha,
        crm: medicoSelecionado.crm,
        especialidade: medicoSelecionado.especialidade,
        telefone: medicoSelecionado.telefone,
        id_clinica: clinicaLogada.id,
      };

      if (medicoSelecionado.id) {
        // Atualização (PUT)
        await axios.put(`${API_URL}/medicos/${medicoSelecionado.id}`, dadosMedico);
        
        // Atualiza a lista local
        setMedicos(medicos.map(m => 
          m.id === medicoSelecionado.id ? { ...m, ...dadosMedico } : m
        ));
        
        alert("Médico atualizado com sucesso!");
      } else {
        // Criação (POST)
        const response = await axios.post(`${API_URL}/medicos`, dadosMedico);
        
        // Adiciona o novo médico à lista
        setMedicos([...medicos, response.data]);
        
        alert("Médico cadastrado com sucesso!");
      }

      fecharModal();
    } catch (err) {
      console.error("Erro ao salvar médico:", err);
      alert("Ocorreu um erro ao salvar o médico. Por favor, tente novamente.");
    }
  };

  if (carregando) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-gray-600">Carregando médicos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-900">Gerenciamento de Médicos</h1>
          <p className="mt-2 text-gray-600">
            Clínica: {clinicaLogada.nome} - CNPJ: {clinicaLogada.cnpj}
          </p>

          <div className="mt-6 flex justify-end">
            <button
              onClick={() => {
                setMedicoSelecionado({
                  id: null,
                  nome: "",
                  email: "",
                  senha: "",
                  crm: "",
                  especialidade: "",
                  telefone: "",
                });
                setModoEdicao(true);
                setModalAberto(true);
              }}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Adicionar Novo Médico
            </button>
          </div>
        </div>

        {medicos.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-500 mb-4">Nenhum médico cadastrado nesta clínica.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {medicos.map((medico) => (
              <div
                key={medico.id}
                className="bg-white rounded-lg shadow-md overflow-hidden border-l-4 border-blue-500"
              >
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-800">{medico.nome}</h2>
                      <p className="text-sm text-gray-600">{medico.crm}</p>
                    </div>
                  </div>

                  <div className="mt-3 space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Especialidade:</span>
                      <span className="font-medium text-gray-800">
                        {medico.especialidade}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Telefone:</span>
                      <span className="font-medium text-gray-800">{medico.telefone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">E-mail:</span>
                      <span className="font-medium text-gray-800 truncate">
                        {medico.email}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 flex space-x-2">
                    <button
                      onClick={() => abrirModalDetalhes(medico)}
                      className="flex-1 py-1 text-sm bg-blue-100 text-blue-800 rounded hover:bg-blue-200"
                    >
                      Detalhes
                    </button>
                    <button
                      onClick={() => abrirModalEdicao(medico)}
                      className="flex-1 py-1 text-sm bg-yellow-100 text-yellow-800 rounded hover:bg-yellow-200"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleExcluirMedico(medico.id)}
                      className="flex-1 py-1 text-sm bg-red-100 text-red-800 rounded hover:bg-red-200"
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal de Detalhes/Edição */}
      {modalAberto && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-blue-800">
                {modoEdicao
                  ? medicoSelecionado.id
                    ? "Editar Médico"
                    : "Adicionar Médico"
                  : "Detalhes do Médico"}
              </h2>
              <button onClick={fecharModal} className="text-gray-500 hover:text-gray-700">
                ×
              </button>
            </div>

            {modoEdicao ? (
              <form className="space-y-4" onSubmit={handleSalvarMedico}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nome completo*
                  </label>
                  <input
                    type="text"
                    value={medicoSelecionado.nome}
                    onChange={(e) =>
                      setMedicoSelecionado({ ...medicoSelecionado, nome: e.target.value })
                    }
                    className="text-black w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    E-mail*
                  </label>
                  <input
                    type="email"
                    value={medicoSelecionado.email}
                    onChange={(e) =>
                      setMedicoSelecionado({ ...medicoSelecionado, email: e.target.value })
                    }
                    className="text-black w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                {!medicoSelecionado.id && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Senha*
                    </label>
                    <input
                      type="password"
                      value={medicoSelecionado.senha}
                      onChange={(e) =>
                        setMedicoSelecionado({ ...medicoSelecionado, senha: e.target.value })
                      }
                      className="text-black w-full px-3 py-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      CRM*
                    </label>
                    <input
                      type="text"
                      value={medicoSelecionado.crm}
                      onChange={(e) =>
                        setMedicoSelecionado({ ...medicoSelecionado, crm: e.target.value })
                      }
                      className="text-black w-full px-3 py-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Especialidade*
                    </label>
                    <input
                      type="text"
                      value={medicoSelecionado.especialidade}
                      onChange={(e) =>
                        setMedicoSelecionado({
                          ...medicoSelecionado,
                          especialidade: e.target.value,
                        })
                      }
                      className="text-black w-full px-3 py-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Telefone
                  </label>
                  <input
                    type="tel"
                    value={medicoSelecionado.telefone}
                    onChange={(e) =>
                      setMedicoSelecionado({ ...medicoSelecionado, telefone: e.target.value })
                    }
                    className="text-black w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={fecharModal}
                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    {medicoSelecionado.id ? "Salvar" : "Adicionar"}
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                {/* ... (código do modal de detalhes permanece o mesmo) ... */}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}