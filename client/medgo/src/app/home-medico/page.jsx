"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import Header from "@/components/Header-adm/page.jsx";

const API_URL = "http://localhost:3001";

const formatDateForMySQL = (dateString) => {
  if (!dateString) return null;
  return dateString.split('T')[0];
};

const formatarData = (dataISO) => {
  if (!dataISO) return "--/--/----";
  const data = new Date(dataISO);
  return data.toLocaleDateString('pt-BR');
};

const formatarHora = (hora) => {
  if (!hora) return "--:--";
  return hora.substring(0, 5);
};

export default function AgendaMedico() {
  const [consultas, setConsultas] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [detalhesConsulta, setDetalhesConsulta] = useState(null);
  const [filtroStatus, setFiltroStatus] = useState("todos");

  // Sistema de notificações
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  useEffect(() => {
    const carregarDados = async () => {
      setCarregando(true);
      
      try {
        const userData = localStorage.getItem("usuario");
        if (!userData) {
          showNotification('Erro: Login ou cadastro necessário para funcionamento', 'error');
          setTimeout(() => {
            window.location.href = "/";
          }, 2000);
          return;
        }
        
        const usuario = JSON.parse(userData);
        
        if (!usuario.crm) {
          showNotification('Acesso permitido apenas para médicos', 'error');
          setTimeout(() => {
            window.location.href = "/";
          }, 2000);
          return;
        }

        const [consultasRes, pacientesRes] = await Promise.all([
          axios.get(`${API_URL}/agendamentos`),
          axios.get(`${API_URL}/pacientes`)
        ]);

        setPacientes(pacientesRes.data);
        const consultasFiltradas = consultasRes.data.filter(consulta => 
          consulta.id_medico === usuario.id
        );
        setConsultas(consultasFiltradas);
        showNotification('Dados carregados com sucesso!', 'success');
      } catch (err) {
        console.error("Erro ao buscar dados:", err);
        showNotification('Erro ao carregar dados', 'error');
      } finally {
        setCarregando(false);
      }
    };

    carregarDados();
  }, []);

  const encontrarPaciente = (idPaciente) => {
    return pacientes.find(p => p.id === idPaciente) || {
      nome: "Paciente não encontrado",
      idade: "--",
      telefone: "--",
      endereco: "--"
    };
  };

  const atualizarStatusConsulta = async (idConsulta, novoStatus) => {
    try {
      const response = await axios.get(`${API_URL}/agendamentos/${idConsulta}`);
      const agendamentoDados = response.data;
      
      const formattedData = {
        ...agendamentoDados,
        status: novoStatus,
        data: agendamentoDados.data
      };

      await axios.put(`${API_URL}/agendamentos/${idConsulta}`, formattedData);
      
      setConsultas(consultas.map(consulta => 
        consulta.id === idConsulta ? {...consulta, status: novoStatus} : consulta
      ));
      
      if (detalhesConsulta?.id === idConsulta) {
        setDetalhesConsulta({
          ...detalhesConsulta,
          status: novoStatus
        });
      }
      
      const statusText = novoStatus === "cancelado" ? "cancelada" : 
                        novoStatus === "marcado" ? "confirmada" : 
                        novoStatus === "realizado" ? "marcada como realizada" : "atualizada";
      
      showNotification(`Consulta ${statusText} com sucesso!`, 'success');
    } catch (err) {
      if (err.response) {
        console.error("Server responded with:", err.response.data);
        showNotification(`Erro: ${err.response.data.message || "Erro ao atualizar consulta"}`, 'error');
      } else {
        console.error("Request error:", err.message);
        showNotification("Erro de conexão com o servidor", 'error');
      }
    }
  };

  const consultasFiltradas = consultas.filter(consulta => {
    if (filtroStatus === "todos") return true;
    return consulta.status === filtroStatus;
  });

  if (carregando) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-gray-600">Carregando consultas...</p>
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

      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <div className="py-6 sm:py-8 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-6 sm:mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-blue-900">Minha Agenda</h1>
              <p className="mt-1 sm:mt-2 text-sm sm:text-base text-gray-600">Consultas agendadas pelos pacientes</p>

              <div className="flex flex-wrap justify-center mt-3 sm:mt-4 gap-2">
                {["todos", "a marcar", "marcado", "cancelado", "remarcando", "realizado"].map((status) => (
                  <button
                    key={status}
                    onClick={() => setFiltroStatus(status)}
                    className={`px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-full ${
                      filtroStatus === status
                        ? "bg-blue-900 text-white"
                        : "bg-white text-blue-800 border border-blue-200"
                    }`}
                  >
                    {status === "todos" ? "Todos" : 
                     status === "a marcar" ? "A confirmar" : 
                     status === "marcado" ? "Agendados" : 
                     status === "cancelado" ? "Cancelados" : 
                     status === "remarcando" ? "Remarcação" : "Realizados"}
                  </button>
                ))}
              </div>
            </div>

            {consultasFiltradas.length === 0 ? (
              <div className="text-center py-8 sm:py-12 bg-white rounded-lg shadow">
                <p className="text-gray-500 mb-4">Nenhuma consulta encontrada.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {consultasFiltradas.map((consulta) => {
                  const paciente = encontrarPaciente(consulta.id_paciente);
                  
                  return (
                    <div
                      key={consulta.id}
                      className={`bg-white rounded-lg shadow-md overflow-hidden border-l-4 ${
                        consulta.status === "a marcar" ? "border-gray-900" :
                        consulta.status === "marcado" ? "border-blue-900" :
                        consulta.status === "cancelado" ? "border-red-500" :
                        consulta.status === "remarcando" ? "border-yellow-500" :
                        "border-green-500"
                      }`}
                    >
                      <div className="p-3 sm:p-4">
                        <div className="flex justify-between items-start">
                          <div className="truncate">
                            <h2 className="text-base sm:text-lg font-semibold text-gray-800 truncate">{paciente.nome}</h2>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            consulta.status === "a marcar" ? "bg-gray-100 text-gray-800" :
                            consulta.status === "marcado" ? "bg-blue-100 text-blue-800" :
                            consulta.status === "cancelado" ? "bg-red-100 text-red-800" :
                            consulta.status === "remarcando" ? "bg-yellow-100 text-yellow-800":  
                            "bg-green-100 text-green-800"
                          }`}>
                            {consulta.status === "a marcar" ? "A marcar" : 
                             consulta.status === "marcado" ? "Agendado" : 
                             consulta.status === "cancelado" ? "Cancelado" : 
                             consulta.status === "remarcando" ? "Solicitação para remarcar": "Realizado"}
                          </span>
                        </div>

                        <div className="mt-2 sm:mt-3 space-y-1 text-xs sm:text-sm">
                          <div className="flex justify-between">
                            <span className="text-black">Data:</span>
                            <span className="font-medium text-black">{formatarData(consulta.data)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-black">Horário:</span>
                            <span className="font-medium text-black">{formatarHora(consulta.hora)}</span>
                          </div>
                        </div> 
                        <div className="mt-3 sm:mt-4 flex flex-wrap gap-2">
                          <button
                            onClick={() => setDetalhesConsulta({...consulta, paciente})}
                            className="flex-1 py-1 text-xs sm:text-sm bg-gray-100 text-gray-900 rounded hover:bg-gray-200">
                            Detalhes
                          </button>

                          {consulta.status === "remarcando" && (
                            <>
                              <button
                                onClick={() => atualizarStatusConsulta(consulta.id, "marcado")}
                                className="flex-1 py-1 text-xs sm:text-sm bg-blue-100 text-green-900 rounded hover:bg-blue-200"
                              >
                                Confirmar
                              </button>
                               
                              <button
                                onClick={() => atualizarStatusConsulta(consulta.id, "cancelado")}
                                className="flex-1 py-1 text-xs sm:text-sm bg-red-100 text-red-900 rounded hover:bg-red-200"
                              >
                                Cancelar
                              </button>
                            </>
                          )}
                          {consulta.status === "marcado" && (
                            <>
                              <button
                                onClick={() => atualizarStatusConsulta(consulta.id, "realizado")}
                                className="flex-1 py-1 text-xs sm:text-sm bg-green-100 text-green-900 rounded hover:bg-green-200"
                              >
                                Realizado
                              </button>
                               
                              <button
                                onClick={() => atualizarStatusConsulta(consulta.id, "cancelado")}
                                className="flex-1 py-1 text-xs sm:text-sm bg-red-100 text-red-900 rounded hover:bg-red-200"
                              >
                                Cancelar
                              </button>
                            </>
                          )} 
                          {consulta.status === "a marcar" && (
                            <>
                              <button
                                onClick={() => atualizarStatusConsulta(consulta.id, "marcado")}
                                className="flex-1 py-1 text-xs sm:text-sm bg-blue-100 text-green-900 rounded hover:bg-blue-200"
                              >
                                Confirmar
                              </button>
                             
                              <button
                                onClick={() => atualizarStatusConsulta(consulta.id, "cancelado")}
                                className="flex-1 py-1 text-xs sm:text-sm bg-red-100 text-red-900 rounded hover:bg-red-200"
                              >
                                Cancelar
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {detalhesConsulta && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 sm:mx-0 p-4 sm:p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl sm:text-2xl font-bold text-blue-800">Detalhes da Consulta</h2>
                  <button
                    onClick={() => setDetalhesConsulta(null)}
                    className="text-gray-500 hover:text-gray-700 text-xl"
                  >
                    ×
                  </button>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <h3 className="text-sm sm:text-base font-medium text-black">Paciente</h3>
                    <p className="text-lg sm:text-xl text-gray-800 font-semibold">{detalhesConsulta.paciente.nome}</p>
                    <p className="text-sm sm:text-base text-gray-600">{detalhesConsulta.paciente.idade || "--"} anos</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <h3 className="text-sm sm:text-base font-medium text-black">Data</h3>
                      <p className="text-gray-800">{formatarData(detalhesConsulta.data)}</p>
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-medium text-gray-500">Horário</h3>
                      <p className="text-black">{formatarHora(detalhesConsulta.hora)}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm sm:text-base font-medium text-gray-500">Telefone</h3>
                    <p className="text-gray-900">{detalhesConsulta.paciente.telefone || "--"}</p>
                  </div>

                  <div>
                    <h3 className="text-sm sm:text-base font-medium text-gray-500">Status</h3>
                    <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm inline-block ${
                      detalhesConsulta.status === "a marcar" ? "bg-gray-100 text-gray-800" :
                      detalhesConsulta.status === "marcado" ? "bg-blue-100 text-blue-800" :
                      detalhesConsulta.status === "cancelado" ? "bg-red-100 text-red-800" :
                      detalhesConsulta.status === "remarcando" ? "bg-yellow-100 text-yellow-800": 
                      "bg-green-100 text-green-800"
                    }`}>
                      {detalhesConsulta.status === "a marcar" ? "A confirmar" :
                       detalhesConsulta.status === "marcado" ? "Agendado" : 
                       detalhesConsulta.status === "cancelado" ? "Cancelado" : 
                       detalhesConsulta.status === "remarcando" ? "Remarcando" : "Realizado"}
                    </span>
                  </div>
                </div>

                <div className="mt-4 sm:mt-6 flex flex-wrap justify-end gap-2 sm:gap-3">
                  {detalhesConsulta.status === "marcado" && (
                    <>
                      <button
                        onClick={() => {
                          atualizarStatusConsulta(detalhesConsulta.id, "cancelado");
                          setDetalhesConsulta(null);
                        }}
                        className="px-3 sm:px-4 py-1 sm:py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm sm:text-base"
                      >
                        Cancelar
                      </button>
                      <button
                        onClick={() => {
                          atualizarStatusConsulta(detalhesConsulta.id, "realizado");
                          setDetalhesConsulta(null);
                        }}
                        className="px-3 sm:px-4 py-1 sm:py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm sm:text-base"
                      >
                        Realizado
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => setDetalhesConsulta(null)}
                    className="px-3 sm:px-4 py-1 sm:py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm sm:text-base"
                  >
                    Fechar
                  </button>
                </div>
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
      `}</style>
    </>
  );
}