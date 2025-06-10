"use client";
import { useState, useEffect } from "react";
import axios from "axios";
const API_URL = "http://localhost:3001";
import Header from "@/components/Header-adm/page.jsx";

export default function GerenciamentoMedicos() {
  const [medicos, setMedicos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [medicoSelecionado, setMedicoSelecionado] = useState(null);
  const [modalAberto, setModalAberto] = useState(false);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [showConfirmacao, setShowConfirmacao] = useState(false);
  const [confirmacaoCallback, setConfirmacaoCallback] = useState(null);
  const [mensagemConfirmacao, setMensagemConfirmacao] = useState("");
  const [clinicaLogada, setClinicaLogada] = useState(null);

  // Sistema de notificações melhorado
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type = 'info') => {
    console.log('Mostrando notificação:', message, type); // Debug
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  useEffect(() => {
    const clinicaDados = localStorage.getItem("usuario");
    if (clinicaDados) {
      const parsedClinica = JSON.parse(clinicaDados);
      console.log('Clínica carregada:', parsedClinica); // Debug
      setClinicaLogada(parsedClinica);
    }
  }, []);

  const confirmarAcao = (mensagemTexto, callback) => {
    setMensagemConfirmacao(mensagemTexto);
    setConfirmacaoCallback(() => callback);
    setShowConfirmacao(true);
  };

  useEffect(() => {
    if (!clinicaLogada) return;

    const carregarMedicos = async () => {
      try {
        console.log('Carregando médicos...'); // Debug
        const resposta = await axios.get(`${API_URL}/medicos`);
        const listaFiltrada = resposta.data.filter(
          (medico) => medico.id_clinica === clinicaLogada.id
        );
        setMedicos(listaFiltrada);
        console.log('Médicos carregados:', listaFiltrada); // Debug
      } catch (err) {
        console.error("Erro ao buscar médicos:", err);
        showNotification("Erro ao buscar médicos", "error");
      } finally {
        setCarregando(false);
      }
    };

    carregarMedicos();
  }, [clinicaLogada]);

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

  const abrirModalNovoMedico = () => {
    setMedicoSelecionado({
      id: null,
      nome: "",
      email: "",
      senha: "",
      crm: "",
      especialidade: "clinico geral"
    });
    setModoEdicao(true);
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setMedicoSelecionado(null);
    setModoEdicao(false);
  };

  const handleExcluirMedico = (id) => {
    confirmarAcao("Tem certeza que deseja excluir este médico?", async () => {
      try {
        await axios.delete(`${API_URL}/medicos/${id}`);
        setMedicos((prev) => prev.filter((m) => m.id !== id));
        showNotification("Médico excluído com sucesso!", "success");
      } catch (err) {
        console.error('Erro ao deletar:', err);
        showNotification("Erro ao deletar médico do banco de dados", "error");
      }
    });
  };

  const handleSalvarMedico = async (e) => {
    e.preventDefault();

    try {
      const dadosMedico = {
        nome: medicoSelecionado.nome,
        email: medicoSelecionado.email,
        crm: medicoSelecionado.crm,
        especialidade: medicoSelecionado.especialidade,
        id_clinica: clinicaLogada.id,
      };

      if (medicoSelecionado.id) {
        // Editando médico existente
        await axios.patch(`${API_URL}/medicos/${medicoSelecionado.id}`, dadosMedico);
        setMedicos(medicos.map(m =>
          m.id === medicoSelecionado.id ? { ...m, ...dadosMedico } : m
        ));
        showNotification("Médico atualizado com sucesso!", "success");
      } else {
        // Adicionando novo médico
        dadosMedico.senha = medicoSelecionado.senha;
        const response = await axios.post(`${API_URL}/medicos`, dadosMedico);
        showNotification("Médico cadastrado com sucesso!", "success");
        
        // Atualizar lista sem reload da página
        setMedicos([...medicos, response.data]);
      }

      fecharModal();
    } catch (err) {
      console.error("Erro ao salvar médico:", err);
      
      // Handle specific error messages from backend
      if (err.response && err.response.data && err.response.data.mensagem) {
        showNotification(err.response.data.mensagem, "error");
      } else {
        showNotification("Ocorreu um erro ao salvar o médico. Por favor, tente novamente.", "error");
      }
    }
  };

  const handleInputChange = (field, value) => {
    setMedicoSelecionado(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Componente de notificação separado para melhor organização
  const NotificationComponent = () => {
    if (!notification) return null;

    return (
      <div className="fixed top-4 right-4 z-[9999] max-w-sm w-full">
        <div 
          className={`p-4 rounded-lg shadow-lg border-l-4 transform transition-all duration-300 ease-in-out ${
            notification.type === 'success' 
              ? 'bg-green-50 border-green-400 text-green-800' 
              : notification.type === 'error' 
              ? 'bg-red-50 border-red-400 text-red-800' 
              : 'bg-blue-50 border-blue-400 text-blue-800'
          }`}
          style={{
            animation: 'slideInRight 0.3s ease-out'
          }}
        >
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
              } cursor-pointer transition-colors duration-200`}
            >
              ×
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (carregando || !clinicaLogada) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Sistema de Notificações */}
      <NotificationComponent />

      {/* Modal de Confirmação */}
      {showConfirmacao && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[9998]">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-black text-lg font-bold mb-4">Confirmação</h3>
            <p className="text-black mb-6">{mensagemConfirmacao}</p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowConfirmacao(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition-colors duration-200"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  confirmacaoCallback();
                  setShowConfirmacao(false);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-200"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

      <Header />
      <main className="flex-1 py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-blue-900">Gerenciamento de Médicos</h1>
            <p className="mt-2 text-gray-600">
              Clínica: {clinicaLogada.nome}
            </p>

            <div className="mt-6 flex justify-end">
              <button
                onClick={abrirModalNovoMedico}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors duration-200"
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
                        <span className="text-gray-500">E-mail:</span>
                        <span className="font-medium text-gray-800 truncate">
                          {medico.email}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 flex space-x-2">
                      <button
                        onClick={() => abrirModalDetalhes(medico)}
                        className="flex-1 py-1 text-sm bg-blue-100 text-blue-800 rounded hover:bg-blue-200 transition-colors duration-200"
                      >
                        Detalhes
                      </button>
                      <button
                        onClick={() => abrirModalEdicao(medico)}
                        className="flex-1 py-1 text-sm bg-yellow-100 text-yellow-800 rounded hover:bg-yellow-200 transition-colors duration-200"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleExcluirMedico(medico.id)}
                        className="flex-1 py-1 text-sm bg-red-100 text-red-800 rounded hover:bg-red-200 transition-colors duration-200"
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
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[9997]">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-blue-800">
                  {modoEdicao
                    ? medicoSelecionado.id
                      ? "Editar Médico"
                      : "Adicionar Médico"
                    : "Detalhes do Médico"}
                </h2>
                <button 
                  onClick={fecharModal} 
                  className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
                >
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
                      onChange={(e) => handleInputChange('nome', e.target.value)}
                      className="text-black w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="text-black w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                        onChange={(e) => handleInputChange('senha', e.target.value)}
                        className="text-black w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                        minLength={6}
                      />
                      <p className="text-xs text-gray-500 mt-1">Mínimo 6 caracteres</p>
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
                        onChange={(e) => handleInputChange('crm', e.target.value)}
                        className="text-black w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                        placeholder="12345678/SP"
                      />
                      <p className="text-xs text-gray-500 mt-1">Formato: 12345678/SP</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Especialidade*
                      </label>
                      <select 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                        value={medicoSelecionado.especialidade}
                        onChange={(e) => handleInputChange('especialidade', e.target.value)}
                        required
                      >
                        <option value="clinico geral">Clínico Geral</option>
                        <option value="cardiologista">Cardiologista</option>
                        <option value="dermatologista">Dermatologista</option>
                        <option value="gastroenterologista">Gastroenterologista</option>
                        <option value="neurologista">Neurologista</option>
                        <option value="ortopedia">Ortopedia</option>
                        <option value="pediatria">Pediatria</option>
                        <option value="psiquiatria">Psiquiatria</option>
                        <option value="ginecologista">Ginecologista</option>
                        <option value="urologista">Urologista</option>
                        <option value="endocrinologista">Endocrinologista</option>
                        <option value="oftalmologista">Oftalmologista</option>
                        <option value="otorrinolaringologista">Otorrinolaringologista</option>
                        <option value="fisioterapeuta">Fisioterapeuta</option>
                        <option value="nutrição">Nutrição</option>
                        <option value="odontologia">Odontologia</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={fecharModal}
                      className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition-colors duration-200"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-200"
                    >
                      {medicoSelecionado.id ? "Salvar" : "Adicionar"}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-gray-500">Nome</h3>
                    <p className="text-lg text-gray-800 font-semibold">{medicoSelecionado.nome}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-medium text-gray-500">CRM</h3>
                      <p className="text-gray-800">{medicoSelecionado.crm}</p>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-500">Especialidade</h3>
                      <p className="text-gray-800">{medicoSelecionado.especialidade}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-500">E-mail</h3>
                    <p className="text-gray-800">{medicoSelecionado.email}</p>
                  </div>
                  <div className="mt-6 flex justify-end">
                    <button
                      onClick={fecharModal}
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-200"
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

      <style jsx>{`
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}