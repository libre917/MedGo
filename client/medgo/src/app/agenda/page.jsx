"use client";
import axios from "axios";
import { useState, useEffect } from "react";

const API_URL = "http://localhost:3001";

// Helper function for consistent date formatting
const formatDateForMySQL = (dateString) => {
  if (!dateString) return null;
  return dateString.split('T')[0]; // YYYY-MM-DD
};

async function listarHorarios() {
  try {
    const response = await axios.get(`${API_URL}/horarios`);
    return response.data;
  } catch (err) {
    console.error('Erro ao exibir horarios');
    return [];
  }
}

export default function AgendamentosUsuario() {
  const [agendamentos, setAgendamentos] = useState([]);
  const [medicos, setMedicos] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [horarios, setHorarios] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [detalhesAgendamento, setDetalhesAgendamento] = useState(null);
  const [remarcarAgendamento, setRemarcarAgendamento] = useState(null);

  const [dataSelecionada, setDataSelecionada] = useState("");
  const [horarioSelecionado, setHorarioSelecionado] = useState("");
  const [tipoUsuario, setTipoUsuario] = useState('');
  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const [isRemarcando, setIsRemarcando] = useState(false);

  // Notification system
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  // Load available time slots
  useEffect(() => {
    async function fetchHorarios() {
      const dados = await listarHorarios();
      setHorarios(dados);
    }
    fetchHorarios();
  }, []);

  // Load main data
  useEffect(() => {
    const carregarDados = async () => {
      setCarregando(true);
      try {
        const userData = localStorage.getItem("usuario");
        if (!userData) {
          showNotification('Erro: Login ou cadastro necessário para funcionamento', 'error');
          window.location.href = "/";
          return;
        }
        const medVerification = JSON.parse(userData)
        if (medVerification.crm) {
          window.location.href = "/home-medico"
        }

        const usuario = JSON.parse(userData);
        setUsuarioLogado(usuario);

        // Determine user type directly from the user object
        const userType = usuario.crm ? 'medico' : 'paciente';
        setTipoUsuario(userType);

        const [agendamentosRes, medicosRes, pacientesRes] = await Promise.all([
          axios.get(`${API_URL}/agendamentos`),
          axios.get(`${API_URL}/medicos`),
          axios.get(`${API_URL}/pacientes`)
        ]);

        setMedicos(medicosRes.data);
        setPacientes(pacientesRes.data);

        // Filter appointments based on user type
        const agendamentosFiltrados = agendamentosRes.data.filter(agendamento => {
          return userType === 'medico'
            ? agendamento.id_medico === usuario.id
            : agendamento.id_paciente === usuario.id;
        });

        setAgendamentos(agendamentosFiltrados);
      } catch (err) {
        console.error("Erro ao buscar dados:", err);
        showNotification('Erro ao carregar dados', 'error');
      } finally {
        setCarregando(false);
      }
    };

    carregarDados();
  }, []);

  // Helper functions
  const encontrarNomeMedico = (idMedico) => {
    const medico = medicos.find(m => m.id === idMedico);
    return medico ? medico.nome : "Médico não encontrado";
  };

  const encontrarNomePaciente = (idPaciente) => {
    const paciente = pacientes.find(p => p.id === idPaciente);
    return paciente ? paciente.nome : "Paciente não encontrado";
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

  // Appointment actions
  const cancelarAgendamento = async (idAgendamento) => {
    if (!confirm('Tem certeza que deseja cancelar este agendamento?')) return;

    try {
      const response = await axios.get(`${API_URL}/agendamentos/${idAgendamento}`);
      const agendamentoDados = response.data;

      // Format the date properly before sending to the backend
      const formattedData = {
        ...agendamentoDados,
        status: "cancelado",
        data: formatDateForMySQL(agendamentoDados.data)
      };

      await axios.put(`${API_URL}/agendamentos/${idAgendamento}`, formattedData);

      // Update local state
      setAgendamentos(agendamentos.map(ag =>
        ag.id === idAgendamento ? { ...ag, status: "cancelado" } : ag
      ));

      if (detalhesAgendamento?.id === idAgendamento) {
        setDetalhesAgendamento({
          ...detalhesAgendamento,
          status: "cancelado"
        });
      }

      if (remarcarAgendamento?.id === idAgendamento) {
        setRemarcarAgendamento({
          ...detalhesAgendamento,
          status: "cancelado"
        });
      }

      showNotification('Agendamento cancelado com sucesso!', 'success');
    } catch (err) {
      console.error("Erro ao cancelar agendamento:", err);
      showNotification("Erro ao cancelar agendamento", 'error');
    }
  };

  const remarcarAgendamentoSubmit = async (idAgendamento) => {
    setIsRemarcando(true);
    try {
      if (horarioSelecionado === "00:00") {
        showNotification('Horário inválido', 'error');
        return;
      }

      if (!horarioSelecionado) {
        showNotification("Selecione um horário", 'error');
        return
      }

      if (!dataSelecionada) {
        showNotification('Selecione uma data', 'error');
        return;
      }
      const ano = new Date().getFullYear()
      const [dia, mes] = dataSelecionada.split("/")


      function verificarData(dia, mes, ano) {
        const data = new Date(ano, mes - 1, dia);
        return data.getFullYear() == ano &&
          data.getMonth() + 1 == mes &&
          data.getDate() == dia;
      }

      if (!verificarData(dia, mes, ano)) {
        showNotification('Data inválida', 'error');
       
        return;
      }

      // Cria a data da consulta e verifica se ela é futura
      const consultaDate = new Date(ano, mes - 1, dia);
      if (consultaDate <= new Date()) {
        showNotification('A data da consulta deve ser futura', 'error');
        return;
      }

      // Formata dia e mês para ter dois dígitos (ex.: "05" em vez de "5")
      const diaFormatado = dia.toString().padStart(2, '0');
      const mesFormatado = mes.toString().padStart(2, '0');
      const mysqlDate = `${ano}-${mesFormatado}-${diaFormatado}`;

      // Consulta o agendamento atual e todos os agendamentos para verificação de conflitos
      const response = await axios.get(`${API_URL}/agendamentos/${idAgendamento}`);
      const newResponse = await axios.get(`${API_URL}/agendamentos`);
      const agendamentoDados = response.data;
      const allAppointments = newResponse.data;

      const doctorId = agendamentoDados.id_medico;
      const conflito = allAppointments.some(agenda =>
        agenda.id_medico === doctorId &&
        agenda.data === mysqlDate &&
        agenda.hora === horarioSelecionado &&
        agenda.id !== idAgendamento
      );

      if (conflito) {
        showNotification('Data ou horário indisponíveis', 'error');
        return;
      }

      // Formata os dados a serem enviados para remarcar o agendamento
      const formattedData = {
        ...agendamentoDados,
        data: mysqlDate,
        hora: horarioSelecionado,
        status: "remarcando"
      };

      await axios.put(`${API_URL}/agendamentos/${idAgendamento}`, formattedData);

      // Atualiza os agendamentos na interface, se necessário
      setAgendamentos(agendamentos.map(ag =>
        ag.id === idAgendamento
          ? { ...ag, data: mysqlDate, hora: horarioSelecionado, status: "remarcando" }
          : ag
      ));

      // Fecha o modal e reseta os campos
      setRemarcarAgendamento(null);
      setDataSelecionada("");
      setHorarioSelecionado("");

      showNotification('Agendamento remarcado com sucesso!', 'success');
    } catch (err) {
      console.error("Erro ao remarcar agendamento:", err);
      showNotification("Erro ao remarcar agendamento", 'error');
    } finally {
      setIsRemarcando(false);
    }
  };


  const deletarAgendamento = async (idAgendamento) => {
    if (!confirm('Tem certeza que deseja deletar este agendamento?')) return;

    try {
      axios.delete(`${API_URL}/agendamentos/${idAgendamento}`);
      setAgendamentos(agendamentos.filter(ag => ag.id !== idAgendamento));
      showNotification('Agendamento deletado com sucesso!', 'success');
    } catch (err) {
      console.error("Erro ao deletar agendamento:", err);
      showNotification("Erro ao deletar agendamento", 'error');
    }
  };

  if (carregando) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-gray-600">Carregando agendamentos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      {/* Notification System */}
      {notification && (
        <div className="fixed top-4 right-4 z-50 max-w-sm w-full">
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
                className={`ml-4 text-sm font-medium ${
                  notification.type === 'success' 
                    ? 'text-green-600 hover:text-green-500' 
                    : notification.type === 'error' 
                    ? 'text-red-600 hover:text-red-500' 
                    : 'text-blue-600 hover:text-blue-500'
                }`}
              >
                ×
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold titulo-cor-padrao-medgo">
            {tipoUsuario === 'medico' ? 'Agendamentos do Médico' : 'Meus Agendamentos'}
          </h1>
          <p className="mt-2 text-gray-600">
            {tipoUsuario === 'medico'
              ? 'Consultas marcadas com pacientes'
              : 'Próximas consultas marcadas'}
          </p>
        </div>

        {/* Appointments Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {agendamentos.length === 0 ? (
            <div className="col-span-3 text-center py-12 bg-white rounded-xl shadow">
              <p className="text-gray-500 mb-4">Nenhum agendamento encontrado</p>
              <a
                href={tipoUsuario === 'medico' ? "/medico" : "/marcar-consulta"}
                className="text-blue-600 hover:titulo-cor-padrao-medgo font-medium"
              >
                {tipoUsuario === 'medico' ? "Voltar ao painel" : "Marcar consulta"}
              </a>
            </div>
          ) : (
            agendamentos.map((agendamento) => (
              <div
                key={agendamento.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="p-6 h-full flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">
                      {tipoUsuario === 'medico'
                        ? encontrarNomePaciente(agendamento.id_paciente)
                        : encontrarNomeMedico(agendamento.id_medico)}
                    </h2>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${agendamento.status === "marcado"
                      ? "bg-green-100 text-green-800"
                      : agendamento.status === "cancelado"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                      }`}>
                      {agendamento.status === "marcado" ? "Marcado" :
                        agendamento.status === "cancelado" ? "Cancelado" :
                          agendamento.status === "remarcando" ? "Remarcando" :
                            agendamento.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <p className="text-sm text-gray-500">Data</p>
                      <p className="font-medium text-gray-800">
                        {formatarData(agendamento.data)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Horário</p>
                      <p className="font-medium text-gray-800">
                        {formatarHora(agendamento.hora)}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between">
                    <button
                      onClick={() => setDetalhesAgendamento(agendamento)}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium cursor-pointer"
                    >
                      Ver detalhes
                    </button>
                    {agendamento.status === "marcado" && (
                      <>
                        <button
                          onClick={() => setRemarcarAgendamento(agendamento)}
                          className="text-blue-600 hover:titulo-cor-padrao-medgo text-sm font-medium cursor-pointer"
                        >
                          Remarcar
                        </button>
                        <button
                          onClick={() => cancelarAgendamento(agendamento.id)}
                          className="text-red-600 hover:text-red-800 text-sm font-medium cursor-pointer"
                        >
                          Cancelar
                        </button>
                      </>
                    )}
                    {agendamento.status === "cancelado" && (
                      <button
                        onClick={() => deletarAgendamento(agendamento.id)}
                        className="text-red-600 hover:text-red-800 text-sm font-medium cursor-pointer"
                      >
                        Deletar
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Appointment Details Modal */}
      {detalhesAgendamento && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-blue-800">Detalhes do Agendamento</h2>
              <button
                onClick={() => setDetalhesAgendamento(null)}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  {tipoUsuario === 'medico' ? 'Paciente' : 'Médico'}
                </h3>
                <p className="text-lg text-gray-800">
                  {tipoUsuario === 'medico'
                    ? encontrarNomePaciente(detalhesAgendamento.id_paciente)
                    : encontrarNomeMedico(detalhesAgendamento.id_medico)}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Data</h3>
                  <p className="text-gray-800">
                    {formatarData(detalhesAgendamento.data)}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Horário</h3>
                  <p className="text-gray-800">
                    {formatarHora(detalhesAgendamento.hora)}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Status</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium inline-block ${detalhesAgendamento.status === "marcado"
                  ? "bg-green-100 text-green-800"
                  : detalhesAgendamento.status === "cancelado"
                    ? "bg-red-100 text-red-800"
                    : "bg-yellow-100 text-yellow-800"
                  }`}>
                  {detalhesAgendamento.status === "marcado" ? "Marcado" :
                    detalhesAgendamento.status === "cancelado" ? "Cancelado" :
                      detalhesAgendamento.status}
                </span>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              {detalhesAgendamento.status === "marcado" && (
                <button
                  onClick={() => {
                    cancelarAgendamento(detalhesAgendamento.id);
                    setDetalhesAgendamento(null);
                  }}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Cancelar Consulta
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Reschedule Modal */}
      {remarcarAgendamento && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <form onSubmit={(e) => {
              e.preventDefault();
              remarcarAgendamentoSubmit(remarcarAgendamento.id);
            }}>
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-blue-800">
                  Remarcar consulta com:<br></br> {encontrarNomeMedico(remarcarAgendamento.id_medico)}
                </h2>

                <button
                  type="button"
                  onClick={() => setRemarcarAgendamento(null)}
                  className="text-gray-500 hover:text-gray-700 text-xl"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">
                      Nova Data
                    </label>
                    <input
                      type="text"
                      placeholder="dd/mm"
                      pattern="\d{2}/\d{2}"
                      value={dataSelecionada}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value === "" || /^\d{0,2}\/?\d{0,2}$/.test(value)) {
                          setDataSelecionada(value);
                        }
                      }}

                      required
                      className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">
                      Novo Horário
                    </label>
                    <select
                      className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      value={horarioSelecionado}
                      onChange={(e) => setHorarioSelecionado(e.target.value)}
                      required
                    >
                      <option value="">Selecione</option>
                      {horarios.map((horario) => (
                        <option key={horario.id} value={horario.hora}>
                          {horario.hora.slice(0, 5)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setRemarcarAgendamento(null)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isRemarcando}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {isRemarcando ? 'Remarcando...' : 'Confirmar Remarcação'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}