"use client";
import axios from "axios";
import { useState, useEffect } from "react";

const API_URL = "http://localhost:3000";

export default function AgendaMedico() {
  const [consultas, setConsultas] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [detalhesConsulta, setDetalhesConsulta] = useState(null);
  const [filtroStatus, setFiltroStatus] = useState("todos");

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
        
        // Verifica se é médico
        if (!usuario.crm) {
          alert('Acesso permitido apenas para médicos');
          window.location.href = "/";
          return;
        }

        // Carrega todos os dados necessários
        const [consultasRes, pacientesRes] = await Promise.all([
          axios.get(`${API_URL}/Agendamentos`),
          axios.get(`${API_URL}/Pacientes`)
        ]);

        setPacientes(pacientesRes.data);

        // Filtra agendamentos pelo médico logado
        const consultasFiltradas = consultasRes.data.filter(consulta => 
          consulta.id_medico === usuario.id
        );

        setConsultas(consultasFiltradas);
      } catch (err) {
        console.error("Erro ao buscar dados:", err);
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

  const formatarData = (dataISO) => {
    if (!dataISO) return "--/--/----";
    const data = new Date(dataISO);
    return data.toLocaleDateString('pt-BR');
  };

  const formatarHora = (hora) => {
    if (!hora) return "--:--";
    return hora.substring(0, 5);
  };

  const atualizarStatusConsulta = async (idConsulta, novoStatus) => {
    try {
      const response = await axios.get(`${API_URL}/Agendamentos/${idConsulta}`)
      const agendamentoDados = response.data
      await axios.put(`${API_URL}/Agendamentos/${idConsulta}`, {
        ...agendamentoDados,
        status: novoStatus
      });
      
      // Atualiza a lista de consultas
      setConsultas(consultas.map(consulta => 
        consulta.id === idConsulta ? {...consulta, status: novoStatus} : consulta
      ));
      
      if (detalhesConsulta?.id === idConsulta) {
        setDetalhesConsulta({
          ...detalhesConsulta,
          status: novoStatus
        });
      }
   
      
      alert(`Consulta ${novoStatus === "cancelado" ? "cancelada" : "confirmada"} com sucesso!`);
    } catch (err) {
      console.error("Erro ao atualizar consulta:", err);
      alert("Erro ao atualizar consulta");
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
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold titulo-cor-padrao-medgo ">Minha Agenda</h1>
          <p className="mt-2 text-gray-600">Consultas agendadas pelos pacientes</p>

          <div className="flex justify-center mt-4 space-x-2">
            {["todos", "marcado", "cancelado", "remarcando","realizado"].map((status) => (
              <button
                key={status}
                onClick={() => setFiltroStatus(status)}
                className={`px-3 py-1 text-sm rounded-full cursor-pointer ${
                  filtroStatus === status
                    ? "bg-blue-900 text-white"
                    : "bg-white text-blue-800 border border-blue-200"
                }`}
              >
                {status === "todos" ? "Todos" : 
                 status === "marcado" ? "Agendados" :
                 status === "cancelado" ? "Cancelados" : 
                 status === "remarcando" ? "Pedidos para remarcar" : "Realizado"}
              </button>
            ))}
          </div>
        </div>

        {consultasFiltradas.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-500 mb-4">Nenhuma consulta encontrada.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {consultasFiltradas.map((consulta) => {
              const paciente = encontrarPaciente(consulta.id_paciente);
              
              return (
                <div
                  key={consulta.id}
                  className={`bg-white rounded-lg shadow-md overflow-hidden border-l-4 ${
                    consulta.status === "marcado" ? "border-blue-900" :
                    consulta.status === "cancelado" ? "border-red-500" :
                    consulta.status === "remarcando" ? "border-yellow-500" :
                    "border-green-500"
                  }`}
                >
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="text-lg font-semibold text-gray-800">{paciente.nome}</h2>
                        <p className="text-sm text-gray-600">{paciente.idade || "--"} anos</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        consulta.status === "marcado" ? "bg-blue-100 text-blue-800" :
                        consulta.status === "cancelado" ? "bg-red-100 text-red-800" :
                        consulta.status === "remarcando" ? " bg-yellow-100 text-yellow-800":  
                        "bg-green-100 text-green-800"
                      }`}>
                        {consulta.status === "marcado" ? "Agendado" : 
                         consulta.status === "cancelado" ? "Cancelado" : 
                         consulta.status === "remarcando" ? "Solicitação para remarcar": "Realizado"}
                      </span>
                    </div>

                    <div className="mt-3 space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-black">Data:</span>
                        <span className="font-medium text-black">{formatarData(consulta.data)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-black">Horário:</span>
                        <span className="font-medium text-black">{formatarHora(consulta.hora)}</span>
                      </div>
                    </div>

                    <div className="mt-4 flex space-x-2">
                      <button
                        onClick={() => setDetalhesConsulta({...consulta, paciente})}
                        className="flex-1 py-1 text-sm bg-gray-100 text-gray-900 rounded hover:bg-gray-200"
                      >
                        Detalhes
                      </button>
                      <button
                        onClick={() => atualizarStatusConsulta(consulta.id, "marcado")}
                        className="flex-1 py-1 text-sm bg-green-100 text-green-900 rounded hover:bg-green-200"
                      >
                        Confirmar
                      </button>
                      <button
                        onClick={() => atualizarStatusConsulta(consulta.id, "cancelado")}
                        className="flex-1 py-1 text-sm bg-red-100 text-red-900 rounded hover:bg-red-200"
                      >
                        Cancelar
                      </button>
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
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-blue-800">Detalhes da Consulta</h2>
              <button
                onClick={() => setDetalhesConsulta(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-black">Paciente</h3>
                <p className="text-lg text-gray-800 font-semibold">{detalhesConsulta.paciente.nome}</p>
                <p className="text-gray-600">{detalhesConsulta.paciente.idade || "--"} anos</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium text-black">Data</h3>
                  <p className="text-gray-800">{formatarData(detalhesConsulta.data)}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-500">Horário</h3>
                  <p className="text-black">{formatarHora(detalhesConsulta.hora)}</p>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-500">Telefone</h3>
                <p className="text-gray-900">{detalhesConsulta.paciente.telefone || "--"}</p>
              </div>

              <div>
                <h3 className="font-medium text-gray-500">Status</h3>
                <span className={`px-3 py-1 rounded-full text-sm inline-block ${
                  detalhesConsulta.status === "marcado" ? "bg-blue-100 text-blue-800" :
                  detalhesConsulta.status === "cancelado" ? "bg-red-100 text-red-800" :
                  detalhesConsulta.status === "remarcando" ? "bg-yellow-100 text-yellow-800": 
                  "bg-green-100 text-green-800"
                }`}>
                  {detalhesConsulta.status === "marcado" ? "Agendado" : 
                   detalhesConsulta.status === "cancelado" ? "Cancelado" : 
                   detalhesConsulta.status === "remarcando" ? "Remarcando" : "Realizado"}
                </span>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              {detalhesConsulta.status === "marcado" && (
                <>
                  <button
                    onClick={() => {
                      atualizarStatusConsulta(detalhesConsulta.id, "cancelado");
                      setDetalhesConsulta(null);
                    }}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={() => {
                      atualizarStatusConsulta(detalhesConsulta.id, "realizado");
                      setDetalhesConsulta(null);
                    }}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Marcar como Realizado
                  </button>
                </>
              )}
              <button
                onClick={() => setDetalhesConsulta(null)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
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