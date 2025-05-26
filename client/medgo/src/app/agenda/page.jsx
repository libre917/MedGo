"use client";
import axios from "axios";
import { useState, useEffect } from "react";

const API_URL = "http://localhost:3000";

export default function AgendamentosUsuario() {
  const [agendamentos, setAgendamentos] = useState([]);
  const [medicos, setMedicos] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [detalhesAgendamento, setDetalhesAgendamento] = useState(null);
  const [tipoUsuario, setTipoUsuario] = useState('');
  const [usuarioLogado, setUsuarioLogado] = useState(null);

  useEffect(() => {
    const carregarDados = async () => {
      setCarregando(true);
      
      try {
        // Verifica se o usuário está logado
        const userData = localStorage.getItem("usuario");
        if (!userData) {
          alert('Erro: Login ou cadastro necessário para funcionamento');
          window.location.href = "/";
          return;
        }
        
        const usuario = JSON.parse(userData);
        setUsuarioLogado(usuario);
        
        // Determina se é médico ou paciente
        if (usuario.crm) {
          setTipoUsuario('medico');
        } else {
          setTipoUsuario('paciente');
        }

        // Carrega todos os dados necessários
        const [agendamentosRes, medicosRes, pacientesRes] = await Promise.all([
          axios.get(`${API_URL}/Agendamentos`),
          axios.get(`${API_URL}/Medicos`),
          axios.get(`${API_URL}/Pacientes`)
        ]);

        setMedicos(medicosRes.data);
        setPacientes(pacientesRes.data);

        // Filtra agendamentos pelo usuário logado
        const agendamentosFiltrados = agendamentosRes.data.filter(agendamento => {
          return tipoUsuario === 'medico' 
            ? agendamento.id_medico === usuario.id
            : agendamento.id_paciente === usuario.id;
        });

        setAgendamentos(agendamentosFiltrados);
      } catch (err) {
        console.error("Erro ao buscar dados:", err);
      } finally {
        setCarregando(false);
      }
    };

    carregarDados();
  }, [tipoUsuario]);

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

  const cancelarAgendamento = async (idAgendamento) => {
    try {
      await axios.patch(`${API_URL}/Agendamentos/${idAgendamento}`, {
        status: "cancelado"
      });
      
      // Atualiza a lista de agendamentos
      setAgendamentos(agendamentos.map(ag => 
        ag.id === idAgendamento ? {...ag, status: "cancelado"} : ag
      ));
      
      if (detalhesAgendamento?.id === idAgendamento) {
        setDetalhesAgendamento({
          ...detalhesAgendamento,
          status: "cancelado"
        });
      }
      
      alert("Agendamento cancelado com sucesso!");
    } catch (err) {
      console.error("Erro ao cancelar agendamento:", err);
      alert("Erro ao cancelar agendamento");
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
      <div className="max-w-6xl mx-auto">
        {/* Cabeçalho */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-800">
            {tipoUsuario === 'medico' ? 'Agendamentos do Médico' : 'Meus Agendamentos'}
          </h1>
          <p className="mt-2 text-gray-600">
            {tipoUsuario === 'medico' 
              ? 'Consultas marcadas com pacientes' 
              : 'Próximas consultas marcadas'}
          </p>
        </div>

        {/* Grid de Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {agendamentos.length === 0 ? (
            <div className="col-span-3 text-center py-12 bg-white rounded-xl shadow">
              <p className="text-gray-500 mb-4">Nenhum agendamento encontrado</p>
              <a 
                href={tipoUsuario === 'medico' ? "/medico" : "/agendar"}
                className="text-blue-600 hover:text-blue-800 font-medium"
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
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      agendamento.status === "marcado" 
                        ? "bg-green-100 text-green-800" 
                        : agendamento.status === "cancelado"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {agendamento.status === "marcado" ? "Marcado" : 
                       agendamento.status === "cancelado" ? "Cancelado" : 
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
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      Ver detalhes
                    </button>
                    {agendamento.status === "marcado" && (
                      <button
                        onClick={() => cancelarAgendamento(agendamento.id)}
                        className="text-red-600 hover:text-red-800 text-sm font-medium"
                      >
                        Cancelar
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal de Detalhes */}
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
                <span className={`px-2 py-1 rounded-full text-xs font-medium inline-block ${
                  detalhesAgendamento.status === "marcado" 
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
              <button
                onClick={() => setDetalhesAgendamento(null)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}