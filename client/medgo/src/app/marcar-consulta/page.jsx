"use client";
import axios from "axios"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation, faXmark, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
const API_URL = "http://localhost:3001"

import { useState } from "react";
import { useEffect } from "react";

async function listarClinicas() {
  try {
    const response = await axios.get(`${API_URL}/clinicas`);
    return response.data;
  } catch (err) {
    console.error("Erro ao exibir clinicas");
    return [];
  }
}

async function listarMedicos() {
  try {
    const response = await axios.get(`${API_URL}/medicos`)
    return response.data
  } catch (err) {
    console.error("Erro ao exibir medicos");
    return [];
  }
}

async function listarHorarios() {
  try {
    const response = await axios.get(`${API_URL}/horarios`)
    return response.data
  } catch (err) {
    console.error('Erro ao exibir horarios');
    return []
  }
}

export default function MarcarConsulta() {
  const [clinicas, setClinicas] = useState([]);
  const [medicos, setMedicos] = useState([])
  const [horarios, setHorarios] = useState([])

  // Sistema de notificações (igual ao código 1)
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

  // Verificação de login
  useEffect(() => {
    const userId = localStorage.getItem("usuario");
    if (!userId) {
      showNotification('Erro: Login ou cadastro necessário para funcionamento', 'error');
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    }
  }, []);

  const userId = localStorage.getItem("usuario");
  const user = userId ? JSON.parse(userId) : null;

  useEffect(() => {
    async function fetchClinicas() {
      const dados = await listarClinicas();
      setClinicas(dados);
    }
    fetchClinicas();
  }, []);

  useEffect(() => {
    async function fetchMedicos() {
      const dados = await listarMedicos();
      setMedicos(dados);
    }
    fetchMedicos();
  }, []);

  useEffect(() => {
    async function fetchHorarios() {
      const dados = await listarHorarios();
      setHorarios(dados);
    }
    fetchHorarios();
  }, []);

  // Estados do formulário
  const [passo, setPasso] = useState(1);
  const [clinicaSelecionada, setClinicaSelecionada] = useState(null);
  const [medicoSelecionado, setMedicoSelecionado] = useState(null);
  const [dataSelecionada, setDataSelecionada] = useState("");
  const [horarioSelecionado, setHorarioSelecionado] = useState("08:00:00");

  // Filtrar médicos pela clínica selecionada
  const medicosDaClinica = clinicaSelecionada
    ? medicos.filter(medico => medico.id_clinica === clinicaSelecionada.id)
    : [];

  const proximoPasso = () => {
    if (
      (passo === 1 && clinicaSelecionada) ||
      (passo === 2 && medicoSelecionado) ||
      (passo === 3 && dataSelecionada && horarioSelecionado)
    ) {
      setPasso(passo + 1);
    } else {
      showNotification("Por favor, selecione uma opção antes de continuar", 'error');
    }
  };

  const finalizarAgendamento = async () => {
    if (!clinicaSelecionada || !medicoSelecionado || !dataSelecionada || !horarioSelecionado) {
      showNotification("Preencha todos os campos antes de agendar.", 'error');
      return;
    }

    try {
      const id = JSON.parse(localStorage.getItem('usuario'));
      const [dia, mes] = dataSelecionada.split("/");
      const ano = new Date().getFullYear()
      const status = "a marcar";
      
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

      const consultaDate = new Date(ano, mes - 1, dia);
      if (consultaDate <= new Date()) {
        showNotification('A data da consulta deve ser futura', 'error');
        return;
      }

      if (horarioSelecionado == "00:00") {
        showNotification('Horário inválido', 'error');
        return
      }

      const consulta = {
        id_clinica: clinicaSelecionada.id,
        id_medico: medicoSelecionado.id,
        id_paciente: id.id,
        data: `${ano}-${mes}-${dia}`,
        hora: `${horarioSelecionado}`,
        status: status
      };

      const responseCompare = await axios.get(`${API_URL}/agendamentos`)
      const compare = responseCompare.data
      const conflito = compare.some(agenda =>
        agenda.id_medico === medicoSelecionado.id &&
        agenda.data === `${ano}-${mes}-${dia}T03:00:00.000Z` &&
        agenda.hora === horarioSelecionado
      );

      if (!conflito) {
        // Usar confirmação antes de agendar
        showConfirm(
          'Confirma o agendamento desta consulta?',
          async () => {
            try {
              await axios.post(`${API_URL}/agendamentos`, consulta);
              showNotification('Agendamento realizado com sucesso! Você será redirecionado para a agenda.', 'success');
              setTimeout(() => {
                window.location.href = "/agenda";
              }, 2000);
            } catch (err) {
              console.error('Erro ao agendar:', err);
              showNotification("Erro ao realizar o agendamento. Tente novamente.", 'error');
            }
          }
        );
      } else {
        showNotification('Horário indisponível', 'error');
      }
    } catch (err) {
      console.error('Erro ao agendar:', err);
      showNotification("Erro ao realizar o agendamento. Tente novamente.", 'error');
    }
  };

  return (
    <>
      {/* Sistema de Notificações (igual ao código 1) */}
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

      {/* Dialog de Confirmação (igual ao código 1) */}
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
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold titulo-cor-padrao-medgo mb-2">Agendar Consulta</h1>
            <p className="text-md text-black ">Preencha as informações passo a passo</p>
          </div>

          {/* Indicador de Passos */}
          <div className="flex justify-between mb-8 relative">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex flex-col items-center z-10">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-medium ${passo >= step ? "titulo-background-padrao-medgo" : "bg-gray-300"
                  }`}>
                  {step}
                </div>
                <span className="mt-2 text-xs font-medium text-gray-600">
                  {step === 1 && "Clínica"}
                  {step === 2 && "Médico"}
                  {step === 3 && "Horário"}
                  {step === 4 && "Confirmar"}
                </span>
              </div>
            ))}
            <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200 -z-1">
              <div
                className="h-full bg-indigo-600 transition-all duration-300"
                style={{ width: `${(passo - 1) * 33.33}%` }}
              ></div>
            </div>
          </div>

          {/* Passo 1 - Selecionar Clínica */}
          {passo === 1 && (
            <div className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Selecione a Clínica</h2>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {clinicas.map((clinica) => (
                  <div
                    key={clinica.id}
                    onClick={() => {
                      setClinicaSelecionada(clinica)
                    }}
                    className={`p-3 border rounded-md cursor-pointer transition-all ${clinicaSelecionada?.id === clinica.id
                      ? "border-indigo-500 bg-indigo-50"
                      : "border-gray-200 hover:border-indigo-300"
                      }`}
                  >
                    <h3 className="font-semibold text-gray-800">{clinica.nome}</h3>
                    <p className="text-sm text-gray-600">{clinica.endereco}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Passo 2 - Selecionar Médico */}
          {passo === 2 && (
            <div className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Selecione o Médico</h2>
              <div className="mb-3 p-3 bg-indigo-50 rounded-md text-sm">
                <p className="font-medium text-indigo-800">Clínica selecionada:</p>
                <p className="text-gray-800">{clinicaSelecionada.nome}</p>
              </div>
              <div className="space-y-2 max-h-80 overflow-y-auto">
                {medicosDaClinica.map((medico) => (
                  <div
                    key={medico.id}
                    onClick={() => {
                      setMedicoSelecionado(medico)
                    }}
                    className={`p-3 border rounded-md cursor-pointer transition-all ${medicoSelecionado?.id === medico.id
                      ? "border-indigo-500 bg-indigo-50"
                      : "border-gray-200 hover:border-indigo-300"
                      }`}
                  >
                    <h3 className="font-semibold text-gray-800">{medico.nome}</h3>
                    <p className="text-sm titulo-cor-padrao-medgo">{medico.especialidade}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Passo 3 - Selecionar Horário */}
          {passo === 3 && (
            <div className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Selecione o Horário</h2>
              <div className="mb-3 p-3 bg-indigo-50 rounded-md text-sm">
                <p className="font-medium titulo-cor-padrao-medgo">Médico selecionado:</p>
                <p className="text-gray-800">{medicoSelecionado.nome} - {medicoSelecionado.especialidade}</p>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2 text-sm">Data da Consulta</label>
                <input
                  type="text"
                  placeholder="dd/mm"
                  onChange={(e) => setDataSelecionada(e.target.value)}
                  maxLength="5"
                  pattern="\d{2}/\d{2}"
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2 text-sm">Horário</label>
                <select className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" type="text" onChange={(e) => setHorarioSelecionado(e.target.value)}>
                  {horarios.map((horario) => (
                    <option key={horario.id} value={horario.hora}>{horario.hora.slice(0, 5)}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Passo 4 - Confirmar Agendamento */}
          {passo === 4 && (
            <div className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Confirme seu Agendamento</h2>

              <div className="space-y-3 mb-4">
                <div className="p-3 border border-gray-200 rounded-md">
                  <p className="text-sm text-gray-500 font-medium">Clínica</p>
                  <p className=" text-black font-semibold">{clinicaSelecionada.nome}</p>
                  <p className="text-xs text-gray-600">{clinicaSelecionada.endereco}</p>
                </div>

                <div className="p-3 border border-gray-200 rounded-md">
                  <p className="text-sm text-gray-500 font-medium">Médico</p>
                  <p className=" text-black font-semibold">{medicoSelecionado.nome}</p>
                  <p className="text-xs text-indigo-600">{medicoSelecionado.especialidade}</p>
                </div>

                <div className="p-3 border border-gray-200 rounded-md">
                  <p className="text-sm text-gray-500 font-medium">Data e Horário</p>
                  <p className=" text-black font-semibold">{dataSelecionada} às {horarioSelecionado.slice(0, 5)}</p>
                </div>
              </div>
            </div>
          )}

          {/* Navegação entre passos */}
          <div className="mt-6 flex justify-between">
            {passo > 1 && (
              <button
                onClick={() => setPasso(passo - 1)}
                className="px-4 py-2 titulo-cor-padrao-medgo cursor-pointer font-medium rounded-md hover:bg-indigo-50 transition text-sm"
              >
                Voltar
              </button>
            )}

            {passo < 4 ? (
              <button
                onClick={proximoPasso}
                className="px-4 py-2 titulo-background-padrao-medgo text-white font-medium rounded-4xl cursor-pointer hover:bg-indigo-700 transition ml-auto text-sm"
              >
                Próximo
              </button>
            ) : (
              <button
                onClick={finalizarAgendamento}
                className="px-4 py-2 bg-green-800 text-white font-medium rounded-md cursor-pointer hover:bg-green-600 transition ml-auto text-sm"
              >
                Confirmar Agendamento
              </button>
            )}
          </div>
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